# How thread pool work
- When tasks are submitted,
    - If the thread pool has not reached the core size, it creates new threads.
    - If the core size has been reached and there is no idle threads, it queues tasks.
    - If the core size has been reached, there is no idle threads, and the queue becomes full, it creates new threads
      (until it reaches the max size).
    - If the max size has been reached, there is no idle threads, and the queue becomes full, the rejection policy kicks in.

- Fixed Thread Pool:
    - request go to queue if all thread busy.
- Cached Thread Pool:
    - request be dropped if number of current thread = max pool size thread.

# Code config and purpose
```txt
    serverBuilder
        .executor(new ThreadPoolExecutor(0, 100,
            60, TimeUnit.SECONDS,
            new LinkedBlockingQueue<Runnable>()))
    ;
}
```
- This config is a mix of _cached_ and _fixed_ thread pool
    - this config set MaxPoolSize = 100
        - LinkedBlockingQueue will put all task in queue, so it will not reject any task.
    - After keep alive time (60 seconds), thread in pool will be terminated if handle no task.

```txt
// if server handler more than time config.
    ((NettyServerBuilder) serverBuilder)
        // maxConnectionAge: the maximum time a connection may exist before it will be closed
        .maxConnectionAge(5000, TimeUnit.MILLISECONDS)
        // maxConnectionAgeGrace: the grace period time  added to the maxConnectionAge
        .maxConnectionAgeGrace(500, TimeUnit.MILLISECONDS);
  }
```
- this config will close grpc connection after about 5500 milliseconds.

# yml config
```yml
grpc-server-builder-configuration:
  core-pool-size: 50 # bank-binding have 4 pods, throughput = 200 request per second.
  max-pool-size: 500 # just a number when peak request, can handle 2000 request at the same time (not per second)
  # base-unit: milliseconds
  keep-alive-time : 300000 # just keep 50 thread (core-pool-size), all new thread will be terminated after 300 seconds = 5 minutes.
  max-connection-age : 5000
  max-connection-age-grace : 500
```

# References
- https://itecnote.com/tecnote/java-impossible-to-make-a-cached-thread-pool-with-a-size-limit/