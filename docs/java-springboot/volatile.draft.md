---
sidebar_position: 1
---

Short: volatile guarantees (1) visibility: a write by one actor (Java thread or native VM) becomes visible to readers on other threads without extra synchronization, and (2) ordering: volatile reads/writes establish happens-before relationships so the compiler/JIT/CPU won’t reorder accesses across them.

“Between VM and Java”: the JVM runtime (native code) also mutates/reads some Thread fields (e.g., it writes eetop, may set interrupted, may update parkBlocker, or read name for diagnostics). If the Java side or other Java threads read those fields, volatile prevents stale cached values or reordering that would hide updates done by native VM code. Without volatile, a Java thread might never see the native-side change or see it late.

// Example: without volatile the worker may never see the update.
// With volatile it reliably exits.
class VisibilityExample {
// try toggling the 'volatile' keyword to see the difference
private static volatile boolean started = false; // volatile ensures visibility

    public static void main(String[] args) throws Exception {
        Thread worker = new Thread(() -> {
            while (!started) {
                // busy-wait: without volatile JIT/cpu may cache 'started' and loop forever
            }
            System.out.println("Worker observed started = true");
        });
        worker.start();

        Thread.sleep(100); // simulate setup
        started = true;    // write by main thread; volatile guarantees worker sees it
        worker.join();
    }
}
