---
sidebar_position: 1
---
# Virtual Thread



| Characteristic               | Platform Threads                                      | Virtual Threads (JEP 444)                                              |
|------------------------------|-------------------------------------------------------|------------------------------------------------------------------------|
| Managed by                    | Operating system                                      | Java Virtual Machine (JVM)                                             |
| Mapping Model               | 1:1 with OS Thread                                    | M:N (Millions of Virtual Threads multiplexed onto a few Carrier Threads) |
| Memory Overhead    | ~ 1 MB fixed allocation off-heap for the Native Stack | ~2 KB residing entirely on the Java Heap                               |
| Blocking Behavior | Locks the OS thread; forces the CPU into an expensive Kernel Context Switch| Releases the Carrier Thread on the Heap in User-mode|
| Scheduler |  OS Scheduler (Kernel space)|JVM Scheduler|

## Prerequisite

### OpenJDK Layered Architecture

```plaintext
+--------------------------------------------------------------------------+
|                         Java Application Code                            |
|                 (Your Spring Boot, Fintech Logic, etc.)                  |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                          JDK Base Libraries                              |
|   - java.base (String, Collections)       - java.concurrent (Locks, FJP) |
|   - java.net (Sockets, NIO)               - java.sql / java.logging      |
+--------------------------------------------------------------------------+
                   |                                   |
         (Safe Java Boundary)                (Modern Memory/Native Link)
                   |                                   |
                   v                                   v
+------------------------------------+   +---------------------------------+
|    Java Native Interface (JNI)     |   |   Project Panama (Java 22+)     |
|   - Legacy C/C++ Header Bridge     |   |   - Foreign Function & Memory API  |
|   - `native` keyword / `start0()`  |   |   - Downcall/Upcall Linkers     |
+------------------------------------+   +---------------------------------+
                   |                                   |
                   +-----------------+-----------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                             HotSpot JVM                                  |
|   +-------------------+  +---------------------+  +------------------+   |
|   |   Class Loader    |  |  Execution Engine   |  | Memory Manager   |   |
|   |   (Loading,       |  |  (Interpreter,      |  | (CollectedHeap,  |   |
|   |    Verification)  |  |   C1/C2 JIT, GC)    |  |  Metaspace, TLAB)|   |
|   +-------------------+  +---------------------+  +------------------+   |
+--------------------------------------------------------------------------+
                                     |
          System Calls (mmap, clone, pthread_create, futex, epoll)
                                     v
+--------------------------------------------------------------------------+
|                     Operating System Kernel (Linux)                      |
|         [Virtual Memory]       [Scheduler]       [I/O Driver]            |
+--------------------------------------------------------------------------+
```

### Component Diagram

```txt
[ .class files ]
              |
              v
+--------------------------------------------------------------------------+
|                        CLASS LOADER SUBSYSTEM                            |
|   1. Loading (Bootstrap -> Extension/Platform -> Application)            |
|   2. Linking (Verification -> Preparation [Static fields] -> Resolution) |
|   3. Initialization (Running <clinit> method)                            |
+--------------------------------------------------------------------------+
              |
              +-----------------------+
                                      |
                                      v
+--------------------------------------------------------------------------+
|                        RUNTIME DATA AREAS (MEMORY)                       |
|                                                                          |
|  [ Shared across Threads ]           [ Per-Thread Allocated (Private) ]  |
|  +-----------------------------+     +--------------------------------+  |
|  |       Java Heap Object      |     |  Java Thread Stack             |  |
|  |  (Young / Old Gen / Regions) |     |  - Stack Frames (Local Vars)   |  |
|  +-----------------------------+     +--------------------------------+  |
|  |          Metaspace          |     |  PC Registers (Instruction Ptr)|  |
|  |  (Klass metadata, C++ VTables)|     +--------------------------------+  |
|  +-----------------------------+     |  Native Method Stack (C/C++)   |  |
|  +-----------------------------+     +--------------------------------+  |
|  | Code Cache (JIT Compiled)   |                                         |
|  +-----------------------------+                                         |
+--------------------------------------------------------------------------+
              |                                       ^
              | (Read Bytecode / Write Objects)       | (Execute Instructions)
              v                                       |
+--------------------------------------------------------------------------+
|                         EXECUTION ENGINE                                 |
|                                                                          |
|  +---------------------------+       +--------------------------------+  |
|  |        Interpreter        | ----> |      JIT Compiler Pipeline     |  |
|  | (Template Interpreter,    |       |  - C1 Compiler (Client/Fast)   |  |
|  |  Looping Bytecode)        |       |  - C2 Compiler (Server/Opt)    |  |
|  +---------------------------+       +--------------------------------+  |
|                |                                    |                    |
|                v                                    v                    |
|         [ Native Code ]                      [ Optimized Code ]          |
|                |                                    |                    |
|                +-----------------+------------------+                    |
|                                  |                                       |
|                                  v                                       |
|  +--------------------------------------------------------------------+  |
|  |                   Garbage Collector (CollectedHeap)                |  |
|  |     - ZGC / G1GC / ParallelGC (Thread Allocation Buffers - TLAB)   |  |
|  +--------------------------------------------------------------------+  |
+--------------------------------------------------------------------------+
```

### Runtime Object Representation

```text
JAVA HEAP (Vùng nhớ đối tượng)           METASPACE (Vùng nhớ cấu trúc)
+-------------------------------------+  +----------------------------------+
| Java Instance Object (oopDesc)      |  | InstanceKlass (C++ Object)       |
|                                     |  |                                  |
| +---------------------------------+ |  | +------------------------------+ |
| | Mark Word (64-bit)              | |  | | _layout_helper (Size của Obj) | |
| | - Trạng thái Khóa (Biased/Light)| |  | +------------------------------+ |
| | - Thông tin GC Age (Tuổi đối tượng| |  | | _methods (Mảng con trỏ hàm)  | |
| +---------------------------------+ |  | +------------------------------+ |
| | Compressed Klass Word (32-bit)   |---->| | _constants (Constant Pool)   | |
| | - Con trỏ nén trỏ sang Metaspace | |  | +------------------------------+ |
| +---------------------------------+ |  | | _vtable (Bảng hàm ảo C++)    | |
| | Fields Data (Biến instance)     | |  | +------------------------------+ |
| | - int id = 42                   | |  +----------------------------------+
| | - long amount = 15000           | |
| +---------------------------------+ |
+-------------------------------------+
```

## What is platform thread ? 

Platform threads (a.k.a. OS/native threads) are heavyweight threads backed one-to-one by the operating system. Each Java platform thread maps to an OS thread and consumes a native stack and kernel resources.

Native Stack, size: 1MB .  
- TCB (Thread Control Block): Nằm tro  ng nhân Kernel. Chứa các thanh ghi (Registers) như PC (Program Counter), SP (Stack Pointer) của CPU.
- Stack frame
    - Local Variables: Các biến bạn khai báo trong hàm (int a = 5).
    - Return Address: Địa chỉ để CPU biết sau khi chạy xong hàm này thì quay về đâu.
    - Operand Stack: Nơi thực hiện các phép tính nhị phân.


- Ngoài ra còn rất nhiều attribute, resouce khác (dành cho các task khác), mà các object của java không dùng tới,
  nên chúng ta chuyển nó lên cho JVM quản lý

```mermaid
flowchart TD
    %% Định nghĩa các lớp (Layers)
    subgraph JVM ["JVM"]
        direction LR
        subgraph PT_Group [" "]
            direction LR
            PT1[Platform Thread] --- S1(Stack)
            PT2[Platform Thread] --- S2(Stack)
            PT3[Platform Thread] --- S3(Stack)
            PT4[Platform Thread] --- S4(Stack)
        end
    end

    subgraph OS ["Operating System"]
        direction LR
        OT1((OS Thread))
        OT2((OS Thread))
        OT3((OS Thread))
        OT4((OS Thread))
    end

    subgraph CPU ["CPU"]
        direction LR
        C1[Core 1]
        C2[Core 2]
        C3[Core 3]
        C4[Core 4]
    end

    %% Ép layout dọc bằng cách nối tuần tự các block
    JVM --> OS --> CPU

    %% Các đường nối thực tế giữa các node
    PT1 -.-> OT1
    PT2 -.-> OT2
    PT3 -.-> OT3
    PT4 -.-> OT4

    OT1 --- C1
    OT2 --- C2
    OT3 --- C3
    OT4 --- C4

    %% CSS Styling
    style JVM fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style OS fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style CPU fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style PT_Group fill:none,stroke:none

    style PT1 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT2 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT3 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT4 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    
    style S1 fill:#BBDEFB,stroke:#1976D2
    style S2 fill:#BBDEFB,stroke:#1976D2
    style S3 fill:#BBDEFB,stroke:#1976D2
    style S4 fill:#BBDEFB,stroke:#1976D2

    style OT1 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT2 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT3 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT4 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32

    style C1 fill:#000,color:#fff
    style C2 fill:#000,color:#fff
    style C3 fill:#000,color:#fff
    style C4 fill:#000,color:#fff
```

```mermaid
flowchart TD
%% USER SPACE
    subgraph UserSpace [User Space]
        direction TB

    %% Box Java
        subgraph JavaBox [Java]
            L1[Object: java.lang.Thread]
        end

    %% Box JVM & Libs
        subgraph JVMBox [JVM & Runtime]
            L2[JVM Layer\nObject C++: JavaThread]
            L3[Library Layer\nGlibc: pthread_create\nCấp 1MB Native Stack]
        end

        L1 -- "JNI Call (start0)" --> L2
        L2 -- "Gọi hàm C" --> L3
    end

%% KERNEL SPACE
    subgraph KernelSpace [Kernel Space]
        L5[Kernel Layer\nCấu trúc: task_struct\nBộ điều phối: Scheduler]
    end

%% Nối các khối lớn
%%    UserSpace ==> SysCall
%%    SysCall ==> KernelSpace
    UserSpace -- "System Call" ----> KernelSpace

%% Styling
    style UserSpace fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#000
    style KernelSpace fill:#FFF3E0,stroke:#E65100,stroke-width:2px,color:#000
    style JavaBox fill:#FFFFFF,stroke:#1976D2,stroke-dasharray: 5 5,color:#000
    style JVMBox fill:#FFFFFF,stroke:#7B1FA2,stroke-dasharray: 5 5,color:#000

    style L1 fill:#F1F8E9,stroke:#000,color:#000
    style L2 fill:#F1F8E9,stroke:#000,color:#000
    style L3 fill:#F1F8E9,stroke:#000,color:#000
    style L5 fill:#F1F8E9,stroke:#000,color:#000
```

### Analyze java.lang.Thread in Java
- java in Heap
```java
public class Thread implements Runnable {
  private volatile long eetop;
  // thread id
  private final long tid;
  // thread name
  private volatile String name;
  // interrupt status (read/written by VM)
  volatile boolean interrupted;
  // context ClassLoader
  private volatile ClassLoader contextClassLoader;
}
```

- Ở trên Heap, Platform Thread cực kỳ nhẹ, chỉ tốn vài trăm bytes
  - eetop: holds a native pointer/address that VM sets and reads it directly (native code)

### Analyze [JavaThread](https://github.com/openjdk/jdk21/blob/master/src/hotspot/share/runtime/thread.hpp) in HotSpot of OpenJDK

```cpp
class JavaThread: public Thread {
  friend class VMStructs;
 private:
  JavaThreadState _thread_state; // Trạng thái luồng (RUNNABLE, BLOCKED...)
  OSThread* _osthread;      // Con trỏ trỏ thẳng xuống OS Thread
  // ... hàng trăm thuộc tính khác để quản lý luồng
};
```


```text
sysctl kern.maxproc kern.maxprocperuid
kern.maxproc: 6000
kern.maxprocperuid: 4000
```

## [What is virtual thread](https://docs.oracle.com/en/java/javase/25/core/virtual-threads.html) ? 

Virtual threads (from Project Loom) are lightweight threads managed by the JVM (user-mode).
Virtual threads vẫn được chạy trên OS thread, nhưng khi gặp block IO operation, JVM sẽ cất VT đó và chỉ phục hồi lại khi cần thiết.

Virtual thread hoạt động gần giống với virtual mem. JVM map M:N VTs với OS threads.

VTs thì được sinh ra để hoạt động trên IO bound, không có ý định cho CPU bound. (Virtual threads are suitable for running tasks that spend most of the time blocked, often waiting for I/O operations to complete. However, they aren't intended for long-running CPU-intensive operations.)

Virtual Threads hoạt động dựa trên cơ chế Continuation và một bộ scheduler ForkJoinPool

### Tạo và chạy VTs

#### Creating a Virtual Thread with the Thread Class and the Thread.Builder Interface

```java
Thread.Builder builder = Thread.ofVirtual().name("worker-", 0);
Runnable task = () -> {
  System.out.println("Thread ID: " + Thread.currentThread().threadId());
};

// name "worker-0"
Thread t1 = builder.start(task);   
t1.join();
System.out.println(t1.getName() + " terminated");

// name "worker-1"
Thread t2 = builder.start(task);   
t2.join();  
System.out.println(t2.getName() + " terminated");
```
This example print output similar to the following:
```text
Thread ID: 21
worker-0 terminated
Thread ID: 24
worker-1 terminated
```

#### Creating and Running a Virtual Thread with the Executors.newVirtualThreadPerTaskExecutor() Method
```java
try (ExecutorService myExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<?> future = myExecutor.submit(() -> System.out.println("Running thread"));
    future.get();
    System.out.println("Task completed");
// ...
```


```mermaid
flowchart TD
    %% Định nghĩa các lớp (Layers)
    subgraph JVM ["JVM"]
        direction LR
        subgraph PT_Group [" "]
            direction LR
            PT1[Platform/Carrier Thread] --- S1(Stack)
            PT2[Platform/Carrier Thread] --- S2(Stack)
            PT3[Platform/Carrier Thread] --- S3(Stack)
            PT4[Platform/Carrier Thread] --- S4(Stack)
        end

        %% Heap space inside JVM containing virtual threads
        subgraph HeapSpace ["Heap Space"]
            direction LR
            V1[Virtual Thread 1]
            V2[Virtual Thread 2]
            V3[Virtual Thread 3]
            V4[Virtual Thread 4]
        end

        %% Mount relationships: three virtual threads mounted to platform threads
        V1 ==> |"mounted"| PT1
        V2 ==> |"mounted"| PT2
        V3 ==> |"mounted"| PT3
        %% V4 remains unmounted / idle inside HeapSpace
    end

    subgraph OS ["Operating System"]
        direction LR
        OT1((OS Thread))
        OT2((OS Thread))
        OT3((OS Thread))
        OT4((OS Thread))
    end

    subgraph CPU ["CPU"]
        direction LR
        C1[Core 1]
        C2[Core 2]
        C3[Core 3]
        C4[Core 4]
    end

    %% Ép layout dọc bằng cách nối tuần tự các block
    JVM --> OS --> CPU

    %% Các đường nối thực tế giữa các node
    PT1 -.-> OT1
    PT2 -.-> OT2
    PT3 -.-> OT3
    PT4 -.-> OT4

    OT1 --- C1
    OT2 --- C2
    OT3 --- C3
    OT4 --- C4

    %% CSS Styling
    style JVM fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style OS fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style CPU fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px,color:#333
    style PT_Group fill:none,stroke:none

    style PT1 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT2 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT3 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT4 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    
    style S1 fill:#BBDEFB,stroke:#1976D2
    style S2 fill:#BBDEFB,stroke:#1976D2
    style S3 fill:#BBDEFB,stroke:#1976D2
    style S4 fill:#BBDEFB,stroke:#1976D2

    style OT1 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT2 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT3 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT4 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32

    style C1 fill:#000,color:#fff
    style C2 fill:#000,color:#fff
    style C3 fill:#000,color:#fff
    style C4 fill:#000,color:#fff

    %% Styling for HeapSpace and virtual threads
    style HeapSpace fill:#FFFDE7,stroke:#FFB300,stroke-width:1px,color:#333
    style V1 fill:#E8F5E9,stroke:#2E7D32
    style V2 fill:#E8F5E9,stroke:#2E7D32
    style V3 fill:#E8F5E9,stroke:#2E7D32
    style V4 fill:#FFEBEE,stroke:#C62828
```

### Code before virtual thread and after virtual thread


### Detail Virtual Thread
```mermaid
sequenceDiagram
    participant FJP as ForkJoinPool (Scheduler)
    participant CT as Carrier Thread (Platform Thread)
    participant VT as VirtualThread.java
    participant CONT as Continuation.java
    participant JVM as continuation.cpp (Native)
    participant FT as continuationFreezeThaw.cpp (C++ Core)

    Note over FJP, CT: [CHẶNG 1: SCHEDULING]
    FJP->>CT: 1. Assign Task (runContinuation)
    CT->>VT: 2. call runContinuation()
    
    Note over VT, CT: [CHẶNG 2: IDENTITY SETUP]
    VT->>VT: 3. mount()
    VT->>CT: 4. startTransition(true) -> JVM Safety Check
    VT->>CT: 5. Thread.setCurrentThread(this) 
    Note right of CT: Carrier Thread bây giờ mang danh Virtual Thread

    Note over VT, CONT: [CHẶNG 3: STACK RESTORATION]
    VT->>CONT: 6. run()
    CONT->>CONT: 7. enterSpecial(native)
    
    Note over CONT, FT: [CHẶNG 4: NATIVE "MAGIC"]
    CONT->>JVM: 8. Continuation::run / prepare_thaw
    JVM->>FT: 9. thaw_internal()
    Note right of FT: Bắt đầu "bốc" Stack từ mảng byte đổ vào CPU
    FT-->>JVM: 10. Stack Restored (RIP/RSP patched)
    
    Note over JVM, VT: [CHẶNG 5: LOGIC EXECUTION]
    JVM-->>VT: 11. Quay lại đúng dòng code đang chạy dở
    VT->>VT: 12. Thực thi User Task (Fintech Business Logic)
    
    Note over VT, FT: [CHẶNG 6: BLOCKING / YIELD]
    VT->>CONT: 13. Gặp I/O -> yield()
    CONT->>FT: 14. freeze_internal()
    Note right of FT: Nhấc Stack ra, ném trả về Heap
```

```mermaid
sequenceDiagram
    participant VT as VirtualThread.java
    participant CONT as Continuation.java
    participant JVM as continuation.cpp (Native)
    participant FT as continuationFreezeThaw.cpp (C++ Core)
    participant CT as Carrier Thread (Platform Thread)

    Note over VT, CT: [CHẶNG 1: TRIGGER BLOCKING]
    VT->>VT: 1. yieldContinuation()
    VT->>VT: 2. startTransition(false)
    Note right of VT: Xin phép trạm gác (MountUnmountDisabler)

    Note over VT, CONT: [CHẶNG 2: GỌI XUỐNG HẦM]
    VT->>CONT: 3. yield(VTHREAD_SCOPE)
    CONT->>CONT: 4. yield0(scope, null)
    CONT->>CONT: 5. doYield() (native)

    Note over CONT, FT: [CHẶNG 3: NATIVE FREEZE]
    CONT->>JVM: 6. Continuation::yield
    JVM->>FT: 7. freeze_internal()
    Note right of FT: Bốc Stack từ CPU (L3) ném trả về Heap (Vali)
    FT-->>JVM: 8. Stack Saved & Frames Cleaned
    
    Note over JVM, VT: [CHẶNG 4: THOÁT XÁC]
    JVM-->>VT: 9. Trở lại code Java (Nhưng quay về runContinuation)
    Note left of VT: Lệnh cont.run() ở chiều Mount kết thúc tại đây!

    Note over VT, CT: [CHẶNG 5: IDENTITY CLEANUP]
    VT->>VT: 10. unmount()
    VT->>CT: 11. carrier.setCurrentThread(carrier)
    VT->>VT: 12. setCarrierThread(null)
    VT->>CT: 13. endTransition(false)
    
    Note over CT: Carrier Thread bây giờ đã "sạch", quay lại FJP tìm việc khác
```

```mermaid
flowchart TD
%% USER SPACE
    subgraph UserSpace [User Space - Không gian người dùng]
        direction TB

    %% Box Java: Nơi chứa hàng triệu luồng ảo
        subgraph JavaBox1 [Java - Managed Heap]
            L1_VT[Virtual Threads 1<br/>Object + Stack ảo trên Heap]
        end

        subgraph JavaBox2 [Java - Managed Heap]
            L2_VT[Virtual Threads 2<br/>Object + Stack ảo trên Heap]
        end

    %% Box JVM: Nơi thực hiện "Cú Hack" điều phối
        subgraph JVMBox [JVM & Runtime - The Magic]
            direction TB
            Scheduler[JVM Scheduler<br/>ForkJoinPool]

        %% TRÁI TIM CỦA PROJECT LOOM
            Core[C++ Core: continuationFreezeThaw.cpp<br/>Thực hiện Freeze/Thaw Stack]

            subgraph CarrierPool [Pool các Carrier Threads]
                L2[JVM Layer - JavaThread C++]
                L3[Library Layer - 1MB Native Stack]
            end
        end

    %% Luồng đi của dữ liệu
        L1_VT -- "1. Đăng ký chạy" --> Scheduler
        L2_VT -- "A. ???" --> Scheduler
        Scheduler -- "2. Yêu cầu Mount" --> Core
        Scheduler -- "B. Yêu cầu UnMount" --> Core

    %% Core thực hiện bốc vác dữ liệu
        Core -- "3. Thaw (Tan chảy): Copy từ Heap vào" --> L3
        L3 -- "C. Freeze (Đóng băng): Copy ra Heap" --> Core

        L2 -- "Thực thi mã máy" --> L3
    end

%% KERNEL SPACE
    subgraph KernelSpace [Kernel Space - Hệ điều hành]
        L5[Kernel Layer<br/>task_struct / Scheduler]
    end

%% Nối các khối: Chỉ Carrier mới đi qua System Call
    CarrierPool -- "System Call (clone)" ----> KernelSpace
    Core ------> CarrierPool

%% Styling
    style UserSpace fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#000
    style KernelSpace fill:#FFF3E0,stroke:#E65100,stroke-width:2px,color:#000
    style JavaBox1 fill:#FFFFFF,stroke:#1976D2,stroke-dasharray: 5 5,color:#000
    style JavaBox2 fill:#FFFFFF,stroke:#1976D2,stroke-dasharray: 5 5,color:#000
    style JVMBox fill:#FFFFFF,stroke:#7B1FA2,stroke-dasharray: 5 5,color:#000
    style CarrierPool fill:#FCE4EC,stroke:#880E4F,stroke-dasharray: 3 3,color:#000

    style L1_VT fill:#FFF9C4,stroke:#FBC02D,color:#000
    style L2_VT fill:#FFF9C4,stroke:#FBC02D,color:#000
    style Scheduler fill:#FFE0B2,stroke:#FB8C00,stroke-width:2px,color:#000

%% Highlight Core mới
    style Core fill:#E1F5FE,stroke:#01579B,stroke-width:3px,color:#000

    style L2 fill:#F1F8E9,stroke:#000,color:#000
    style L3 fill:#F1F8E9,stroke:#000,color:#000
    style L5 fill:#F1F8E9,stroke:#000,color:#000
```


## CPU bound vs IO Bound

## Code example

- Sequential (Đồng bộ - Một luồng gánh hết)

```java
Json userRequest = buildUserRequest(); // CPU bound - use 100% CPU core

public void handleRequest() {
    log.info("A: Bắt đầu xử lý");
    User user = serviceB.getUser(); // IO bound
    Balance bal = serviceB.getBalance(); // IO bound
    log.info("A: Hoàn thành cho {}", user.name());
}

// Log kết quả:
// [http-1] A: Bắt đầu xử lý
// [http-1] B: Đang lấy User... (Block 100ms)
// [http-1] B: Đang lấy Balance... (Block 100ms)
// [http-1] A: Hoàn thành.
```

- Platform Thread Pool - 3 platform thread

```java
public void handleRequest() throws Exception {
    log.info("A: Bắt đầu xử lý");
    Future<User> fUser = executor.submit(() -> serviceB.getUser());
    Future<Balance> fBal = executor.submit(() -> serviceB.getBalance());

    User u = fUser.get(); // Block http-thread tại đây
    Balance b = fBal.get();
    log.info("A: Hoàn thành");
}

// Log kết quả:
// [http-1] A: Bắt đầu xử lý
// [pool-1-thread-1] B: Đang lấy User...
// [pool-1-thread-2] B: Đang lấy Balance...
// [http-1] A: Hoàn thành (Sau 100ms)
```

- Giai đoạn 3: CompletableFuture (Async Non-blocking)

```java
// Class A (Controller) gọi xuống Class B (Service)
public void handleRequest() {
    log.info("A: Nhận request");

    // Giao việc cho ForkJoinPool (mặc định của CF)
    CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> serviceB.getUser());
    CompletableFuture<Balance> balFuture = CompletableFuture.supplyAsync(() -> serviceB.getBalance());

    // Kết hợp kết quả
    userFuture.thenAcceptBoth(balFuture, (user, bal) -> {
        log.info("A: Xử lý xong cho {}", user.name());
    });

    log.info("A: Luồng chính rảnh tay làm việc khác");
}

// LOG THỰC TẾ:
// [http-nio-1] A: Nhận request
// [ForkJoinPool.commonPool-worker-1] B: Đang lấy User...
// [ForkJoinPool.commonPool-worker-2] B: Đang lấy Balance...
// [http-nio-1] A: Luồng chính rảnh tay làm việc khác
// [ForkJoinPool.commonPool-worker-2] A: Xử lý xong (Thread nào xong sau cùng sẽ chạy callback)
```

- Spring WebFlux (Reactive - Non-blocking Event Loop)

```java
public Mono<String> handleRequest() {
    log.info("A: Bắt đầu");
    return Mono.zip(serviceB.getUserFlux(), serviceB.getBalanceFlux())
        .map(tuple -> {
            log.info("A: Xử lý kết quả");
            return "Done";
        });
}

// Log kết quả:
// [reactor-http-nio-1] A: Bắt đầu
// [reactor-http-nio-1] B: Gọi User API (Non-blocking)
// [reactor-http-nio-1] B: Gọi Balance API (Non-blocking)
// ... 100ms trôi qua, Thread nio-1 đi làm việc cho request khác ...
// [reactor-http-nio-2] A: Xử lý kết quả (Thread khác nhặt callback lên chạy)
```

WebFlux có **Backpressure,** tốt hơn CF

Việc dùng `ThreadLocal` (để lưu TraceID, TransactionID) trong WebFlux → sẽ gặp vấn đề.

- Virtual thread

```java
public void handleRequest() {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        log.info("A: Bắt đầu trên Virtual Thread");
        
        var uTask = scope.fork(() -> serviceB.getUser());
        var bTask = scope.fork(() -> serviceB.getBalance());

        scope.join(); 
        log.info("A: Hoàn thành cho {}", uTask.get().name());
    }
}

// Log kết quả (Lưu ý tên Thread):
// [VirtualThread-[#101]] A: Bắt đầu
// [VirtualThread-[#102]] B: Đang lấy User...
// [VirtualThread-[#103]] B: Đang lấy Balance...
// [VirtualThread-[#101]] A: Hoàn thành
```

Dù log ghi là `VirtualThread-[#101]`, nhưng thực tế bên dưới nó chỉ là một mảng byte trên Heap. Nó không chiếm dụng bất cứ Thread OS nào khi đang đợi I/O.

Vì dù nó bị unmount/remount bao nhiêu lần, cái định danh `VirtualThread-[#101]` vẫn giữ nguyên từ đầu đến cuối. Debug cực sướng!

### Analyze java.lang.VirtualThread in Java

```java
final class VirtualThread extends BaseVirtualThread {

  private final Executor scheduler;
  private final Continuation cont;
  private final Runnable runContinuation;
  // virtual thread state, accessed by VM
  private volatile int state;

  /*
   * Virtual thread state transitions:
   *
   *      NEW -> STARTED         // Thread.start, schedule to run
   *  STARTED -> TERMINATED      // failed to start
   *  STARTED -> RUNNING         // first run
   *  RUNNING -> TERMINATED      // done
   *
   *  RUNNING -> PARKING         // Thread parking with LockSupport.park
   *  PARKING -> PARKED          // cont.yield successful, parked indefinitely
   *   PARKED -> UNPARKED        // unparked, may be scheduled to continue
   * UNPARKED -> RUNNING         // continue execution after park
   *
   *  PARKING -> RUNNING         // cont.yield failed, need to park on carrier
   *  RUNNING -> PINNED          // park on carrier
   *   PINNED -> RUNNING         // unparked, continue execution on same carrier
   *
   *       RUNNING -> TIMED_PARKING   // Thread parking with LockSupport.parkNanos
   * TIMED_PARKING -> TIMED_PARKED    // cont.yield successful, timed-parked
   *  TIMED_PARKED -> UNPARKED        // unparked, may be scheduled to continue
   *
   * TIMED_PARKING -> RUNNING         // cont.yield failed, need to park on carrier
   *       RUNNING -> TIMED_PINNED    // park on carrier
   *  TIMED_PINNED -> RUNNING         // unparked, continue execution on same carrier
   *
   *   RUNNING -> BLOCKING       // blocking on monitor enter
   *  BLOCKING -> BLOCKED        // blocked on monitor enter
   *   BLOCKED -> UNBLOCKED      // unblocked, may be scheduled to continue
   * UNBLOCKED -> RUNNING        // continue execution after blocked on monitor enter
   *
   *   RUNNING -> WAITING        // transitional state during wait on monitor
   *   WAITING -> WAIT           // waiting on monitor
   *      WAIT -> BLOCKED        // notified, waiting to be unblocked by monitor owner
   *      WAIT -> UNBLOCKED      // interrupted
   *
   *       RUNNING -> TIMED_WAITING   // transition state during timed-waiting on monitor
   * TIMED_WAITING -> TIMED_WAIT      // timed-waiting on monitor
   *    TIMED_WAIT -> BLOCKED         // notified, waiting to be unblocked by monitor owner
   *    TIMED_WAIT -> UNBLOCKED       // timed-out/interrupted
   *
   *  RUNNING -> YIELDING        // Thread.yield
   * YIELDING -> YIELDED         // cont.yield successful, may be scheduled to continue
   * YIELDING -> RUNNING         // cont.yield failed
   *  YIELDED -> RUNNING         // continue execution after Thread.yield
   */
  private static final int NEW      = 0;
  private static final int STARTED  = 1;
  private static final int RUNNING  = 2;     // runnable-mounted

  // untimed and timed parking
  private static final int PARKING       = 3;
  private static final int PARKED        = 4;     // unmounted
  private static final int PINNED        = 5;     // mounted
  private static final int TIMED_PARKING = 6;
  private static final int TIMED_PARKED  = 7;     // unmounted
  private static final int TIMED_PINNED  = 8;     // mounted
  private static final int UNPARKED      = 9;     // unmounted but runnable

  // Thread.yield
  private static final int YIELDING = 10;
  private static final int YIELDED  = 11;         // unmounted but runnable

  // monitor enter
  private static final int BLOCKING  = 12;
  private static final int BLOCKED   = 13;        // unmounted
  private static final int UNBLOCKED = 14;        // unmounted but runnable

  // monitor wait/timed-wait
  private static final int WAITING       = 15;
  private static final int WAIT          = 16;    // waiting in Object.wait
  private static final int TIMED_WAITING = 17;
  private static final int TIMED_WAIT    = 18;    // waiting in timed-Object.wait

  private static final int TERMINATED = 99;  // final state
}
```

```java
@ChangesCurrentThread
@ReservedStackAccess
private void mount() {
    startTransition(/*is_mount*/true);
    // We assume following volatile accesses provide equivalent
    // of acquire ordering, otherwise we need U.loadFence() here.

    // sets the carrier thread
    Thread carrier = Thread.currentCarrierThread();
    setCarrierThread(carrier);

    // sync up carrier thread interrupted status if needed
    if (interrupted) {
        carrier.setInterrupt();
    } else if (carrier.isInterrupted()) {
        synchronized (interruptLock) {
            // need to recheck interrupted status
            if (!interrupted) {
                carrier.clearInterrupt();
            }
        }
    }

    // set Thread.currentThread() to return this virtual thread
    carrier.setCurrentThread(this);
}
```

[JNINativeMethod in VirtualThread.c](https://github.com/openjdk/jdk/blob/eb9a8ab5c541a1f1b27731e04044f707bca6bc9f/src/java.base/share/native/libjava/VirtualThread.c#L34)
```c
static JNINativeMethod methods[] = {
    { "endFirstTransition",       "()V",  (void *)&JVM_VirtualThreadEndFirstTransition },
    { "startFinalTransition",     "()V",  (void *)&JVM_VirtualThreadStartFinalTransition },
    { "startTransition",          "(Z)V", (void *)&JVM_VirtualThreadStartTransition },
    { "endTransition",            "(Z)V", (void *)&JVM_VirtualThreadEndTransition },
    { "notifyJvmtiDisableSuspend", "(Z)V", (void *)&JVM_VirtualThreadDisableSuspend },
    { "postPinnedEvent",           "(" STR ")V", (void *)&JVM_VirtualThreadPinnedEvent },
    { "takeVirtualThreadListToUnblock", "()" VIRTUAL_THREAD, (void *)&JVM_TakeVirtualThreadListToUnblock},
};
```

[jvm.ccp](https://github.com/openjdk/jdk/blob/eb9a8ab5c541a1f1b27731e04044f707bca6bc9f/src/hotspot/share/prims/jvm.cpp#L3670)
```
JVM_ENTRY(void, JVM_VirtualThreadStartTransition(JNIEnv* env, jobject vthread, jboolean is_mount))
  oop vt = JNIHandles::resolve_external_guard(vthread);
  MountUnmountDisabler::start_transition(thread, vt, is_mount, false /*is_thread_end*/);
JVM_END
```

- mountUnmountDisabler.cpp -> vthread.cpp -> 
```
```

### 

[continuationFreezeThaw](https://github.com/openjdk/jdk/blob/master/src/hotspot/share/runtime/continuationFreezeThaw.cpp)

```cpp
Thread-stack layout on freeze/thaw.
See corresponding stack-chunk layout in instanceStackChunkKlass.hpp

            +----------------------------+
            |      .                     |
            |      .                     |
            |      .                     |
            |   carrier frames           |
            |                            |
            |----------------------------|
            |                            |
            |    Continuation.run        |
            |                            |
            |============================|
            |    enterSpecial frame      |
            |  pc                        |
            |  rbp                       |
            |  -----                     |
        ^   |  int argsize               | = ContinuationEntry
        |   |  oopDesc* cont             |
        |   |  oopDesc* chunk            |
        |   |  ContinuationEntry* parent |
        |   |  ...                       |
        |   |============================| <------ JavaThread::_cont_entry = entry->sp()
        |   |  ? alignment word ?        |
        |   |----------------------------| <--\
        |   |                            |    |
        |   |  ? caller stack args ?     |    |   argsize (might not be 2-word aligned) words
Address |   |                            |    |   Caller is still in the chunk.
        |   |----------------------------|    |
        |   |  pc (? return barrier ?)   |    |  This pc contains the return barrier when the bottom-most frame
        |   |  rbp                       |    |  isn't the last one in the continuation.
        |   |                            |    |
        |   |    frame                   |    |
        |   |                            |    |
            +----------------------------|     \__ Continuation frames to be frozen/thawed
            |                            |     /
            |    frame                   |    |
            |                            |    |
            |----------------------------|    |
            |                            |    |
            |    frame                   |    |
            |                            |    |
            |----------------------------| <--/
            |                            |
            |    doYield/safepoint stub  | When preempting forcefully, we could have a safepoint stub
            |                            | instead of a doYield stub
            |============================| <- the sp passed to freeze
            |                            |
            |  Native freeze/thaw frames |
            |      .                     |
            |      .                     |
            |      .                     |
            +----------------------------+

************************************************/
```



Legend:
 - VThread / Virtual Thread: lightweight, JVM-scheduled logical thread
 - Carrier/Platform Thread: an OS-backed thread that runs virtual threads when they're active
 - Platform Thread: traditional OS-backed thread (one-to-one mapping)

Quick comparison:
 - Model: Platform = one-to-one, Virtual = many-to-few (multiplexed)
 - Memory: Platform = high per-thread stack, Virtual = small/growable
 - Blocking: Platform blocks the OS thread; Virtual parks and frees the carrier
 - Scalability: Virtual threads scale to many more concurrent tasks with simpler code (blocking-style API)

note: synchronized -> ReentrantLock.
