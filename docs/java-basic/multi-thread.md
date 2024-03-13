# Multi-thread

## Tóm tắt
- 

## Code example 1

```java
package com.example.multithreadjob;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.Semaphore;

public class MultiThreadJob3 {
    private static final int NUM_THREADS = 3;
    private static final int BATCH_SIZE = 100;
    private static final int DATA_SIZE = 1000;
    private static final Semaphore semaphore = new Semaphore(NUM_THREADS);

    private static ThreadPoolExecutor executorService = new ThreadPoolExecutor(NUM_THREADS, NUM_THREADS, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());

    private static void task(List<Integer> sublist) {

    }

    private static List<Integer> createList() {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i <= DATA_SIZE; ++i) {
            list.add(i);
        }
        return list;
    }

    public static void main(String[] args) throws InterruptedException {
        List<Integer> list = createList();
        int i = 0;
        while (i < list.size()) {
            semaphore.acquire();
            System.out.println("READ");
            // read data
            List<Integer> sublist = new ArrayList<>();

            int j = Math.min(i + BATCH_SIZE, list.size());
            while (i < j) {
                sublist.add(list.get(i));
                ++i;
            }
            // do job
            executorService.submit(() -> {
                try {
                    System.out.printf("TASK %d START\n", sublist.get(0));
                    Thread.sleep(new Random().nextInt(5000) + 3000);
                } catch (InterruptedException e) {
                    System.err.println(e);
                }
                semaphore.release();
                System.out.printf("TASK %d FINISH\n", sublist.get(0));
            });
        }
        executorService.shutdown();
    }
}
    
```