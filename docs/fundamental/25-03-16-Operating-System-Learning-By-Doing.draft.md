# Operating System Learning by doing part (part 1)
6.S081 MIT Operating System Engineering
ref: https://pdos.csail.mit.edu/6.828/2021/schedule.html
ref: https://pdos.csail.mit.edu/6.828/2021/xv6/book-riscv-rev2.pdf

## Concept
- qemu
  - QEMU (Quick Emulator) is a software emulator and virtualizer that lets 
you run an entire computer system (CPU, memory, devices) inside your own machine. Think of it as a "computer within a computer."

- Unix: is a OS
  - Key-concept: everything is a file
- xv6: an operating system like Unix, but simpler
- RISC-V: a processor, xv6 runs on the RISC-V instruction set, a simple, open-source CPU architecture.
  - eg: x86 (CISC-Complex Instruction Set Computer) for Intel/AMD CPUs, 
ARM (RISC-Reduced Instruction Set Computer)

Connecting the dot: xv6 runs on a RISC-V CPU simulated by QEMU

```text
+---------------------------------------------------+
|                Your Laptop (Real Hardware)         |
|  +---------------------------------------------+   |
|  | QEMU (Emulator)                            |   |
|  |  +--------------------------------------+  |   |
|  |  | Virtual Hardware                    |  |   |
|  |  |  +-------------------------------+  |  |   |
|  |  |  | Processor (RISC-V CPU)       |  |  |   |
|  |  |  |  +----------------------+    |  |  |   |
|  |  |  |  | Registers (x0-x31)  |    |  |  |   |
|  |  |  |  +----------------------+    |  |  |   |
|  |  |  |  | Instruction Set      |<--+ |  |   |
|  |  |  |  | (RISC-V: add, lw)    |    | |  |   |
|  |  |  |  +----------------------+    | |  |   |
|  |  |  +-------------------------------+ |  |   |
|  |  |    ^ Runs                          |  |   |
|  |  +----| xv6 (Unix-like OS) -----------+  |   |
|  |       | Kernel + User Programs        |  |   |
|  |       +-------------------------------+  |   |
|  +--------------------------------------+   |   |
|       ^ Designed by                         |   |
|       | UC Berkeley (RISC-V Origin)         |   |
|       +-------------------------------------+   |
+---------------------------------------------------+
```

=> So, RISC-V CPU can run by another OS, as long as it can adapt with instructions set

```text
[ Your Host Machine (e.g., Linux/Mac/Windows) ]
    |
    |--- [ Toolchain: gcc, linker, gdb ]
    |       |
    |       |--- Compiles xv6 and user programs into RISC-V binaries
    |
    |--- [ QEMU: Emulator ]
            |
            |--- Simulates [ RISC-V CPU ]
            |        |
            |        |--- Executes [ xv6: Operating System ]
            |        |         |
            |        |         |--- Manages [ Emulated Hardware: memory, disk, console ]
            |        |         |
            |        |         |--- Runs [ User Programs: shell, etc. ]
            |
            |--- Provides console/debug interface back to Host
```

Learning by Doing Context

In 6.S081, you’ll:

- Modify xv6 (e.g., add system calls, tweak scheduling).
- Use QEMU to test your changes on a virtual RISC-V machine.
- Debug with gdb to see how the CPU executes your code.
- Write user programs to test xv6’s functionality.



