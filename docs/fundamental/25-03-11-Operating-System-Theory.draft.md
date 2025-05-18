# Operating System Theory part (part 1)

### Some things you’ll do in 6.S081
- You will build a driver for a network stack that
sends packets over the real Internet
- You will redesign a memory allocator so that it
   can scale across multiple cores
- You will implement fork and make it efficient
   through an optimization called copy-on-write

### Why OSes are interesting
- Unforgiving to build: Debugging is hard, a single
bug can take down the entire machine
- Design tensions:
  - Efficiency vs. abstract/Portability/Generality
  - Powerful vs. Simple interfaces
  - Flexible vs. Secure
- Challenge: good orthogonality, feature interactions
  - Why we call that good orthogonality ?
    - That mean each feature is independent of each other, so that we can change one feature without affecting the other. Eg: 
      - system calls: using system call independently of each other without bug.
      - memory allocation: support many applications without affecting manage process.
      - IPC: message passing or shared memory.
  - Why it's a challenge
    - difficulty: because OS has many components (kernal, drivers, memory management, file system, network stack, etc).
    - performance: abstraction layer make overhead
    - backward compatibility: maintain adapt to new hardware
    - flexible: hard to use api.
- Varied uses from smartbulbs to supercomputers
- Evolving HW: NVRAM, Multicore, 200Gbit networks

### Back to system calls
Introduction to UNIX system calls
- Applications see the O/S via system calls; that interface will be a big focus.
  let's start by looking at how programs use system calls.
  you'll use these system calls in the first lab.
  and extend and improve them in subsequent labs.

- I’ll show examples of using system calls, Will use xv6, the same OS you’ll build labs on
- Why? xv6 is similar to UNIX or Linux, but way simpler So you can understand the entire thing.
- Why UNIX?
  - Clean design, widely used: Linux, OSx, Windows (mostly)
- xv6 runs on Risc-V
  - You will use Qemu machine emulator to run xv6 (emulation)

### System call

| System Call                      | Description |
|----------------------------------|-------------|
| `int fork()`                     | Create a process, return child’s PID. |
| `int exit(int status)`           | Terminate the current process; status reported to `wait()`. No return. |
| `int wait(int *status)`          | Wait for a child to exit; exit status in `*status`; returns child PID. |
| `int kill(int pid)`              | Terminate process `PID`. Returns 0, or -1 for error. |
| `int getpid()`                   | Return the current process’s PID. |
| `int sleep(int n)`               | Pause for `n` clock ticks. |
| `int exec(char *file, char *argv[])` | Load a file and execute it with arguments; only returns if error. |
| `char *sbrk(int n)`              | Grow process’s memory by `n` bytes. Returns start of new memory. |
| `int open(char *file, int flags)` | Open a file; flags indicate read/write; returns an fd (file descriptor). |
| `int write(int fd, char *buf, int n)` | Write `n` bytes from `buf` to file descriptor `fd`; returns `n`. |
| `int read(int fd, char *buf, int n)` | Read `n` bytes into `buf`; returns number read; or `0` if end of file. |
| `int close(int fd)`              | Release open `fd`. |
| `int dup(int fd)`                | Return a new file descriptor referring to the same file as `fd`. |
| `int pipe(int p[])`              | Create a pipe, put read/write file descriptors in `p[0]` and `p[1]`. |
| `int chdir(char *dir)`           | Change the current directory. |
| `int mkdir(char *dir)`           | Create a new directory. |
| `int mknod(char *file, int, int)` | Create a device file. |
| `int fstat(int fd, struct stat *st)` | Place info about an open file into `*st`|
| `int stat(char *file, struct stat *st)` | Place info about a named file into `*st`|
| `int link(char *file1, char *file2)` | Create another name (`file2`) for the file `file1`|
| `int unlink(char *file)`         | Remove a file. |

## Introduction to UNIX system calls
- Applications see the O/S via system calls; that interface will be a big focus.
  - eg: fd = open("foo", 1);
  - the interfaces are simple, is just pass integer like fd and process ids back and forth across as arguments to the system call interface.
  - the functionality interfaces are sophisticate.

## fork()
- fork() create a child process, both processes continue executing after fork()
  - **it will copy all memory from parent process**
- So the problem come, all things before fork() will be copy to new process, which is not good for performance.
  - Solution: copy-on-write
- Only the shell know about io redirection.

## In child, close(1) and open("bar")
- It mean, the default fd 1 (stdout) will be close and open new file "bar" with fd 1 (os will return the lowest fd available)
- Note: the kernel have the `process’s file table (an array of file pointers)`, it will mark descriptor 1 as available.
  - Each process has its own file table
  - File descriptors 0, 1, and 2 are pre-assigned to the console (stdin, stdout, stderr) when a process starts.

