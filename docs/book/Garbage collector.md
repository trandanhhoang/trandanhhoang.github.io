
# Garbage collector
1. Object Creation:

- When you create an object using the new keyword, memory is allocated on the heap to store the object's data and fields.
The constructor is then called to initialize the object.
2. Reference Tracking:

- Objects are accessible through references. References are variables or fields that store the memory address of an object.
- As long as there are references pointing to an object, it is considered reachable and won't be collected by the garbage collector.
3. Reachability Analysis:

- Periodically, the garbage collector performs a reachability analysis to identify which objects are still reachable from the root of the object graph. The root can be:
  - Local variables in currently executing methods.
  - Active threads.
  - Static variables.
  - JNI (Java Native Interface) references.
- The garbage collector starts from the root set, which includes local variables, active threads, static variables, and JNI references.
- It follows references from the root set to other objects, marking each encountered object as reachable.
- Objects that are not marked as reachable during this traversal are considered unreachable.
4. Mark Phase:

- The garbage collector marks objects that are reachable, starting from the roots and following references.
Unreachable objects are marked as candidates for removal.
5. Sweep Phase:

- In this phase, the garbage collector sweeps through the heap and removes the objects that were marked as unreachable.
The memory occupied by these unreachable objects is then freed up.
6. Compact Phase (Optional):

- In some garbage collection algorithms, there might be a compaction phase where the remaining live objects are moved to a contiguous block of memory to reduce fragmentation.
7. Finalization (Optional):

- If an object has a finalize method, it might go through a finalization process before being reclaimed. However, relying on finalize is discouraged as it can lead to unpredictable behavior.
8. Memory Reclaimed:

- After the sweep phase, the memory occupied by the unreachable objects is reclaimed and made available for new allocations.