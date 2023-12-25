---
sidebar_position: 2
---

# Side effect thú vị của invokeAll trong ExecutorService (Interrupted exception)

## Tóm tắt
- Chúng ta sẽ tạo task để chạy trong executor service, mặc dù task bị cancelled vì executor bị shutdown, nhưng task vẫn chạy tiếp mặc dù đã bị interrupt.

## Code example
```java
public class ExecutorServiceTest {
   public static void main(String[] args) throws InterruptedException, ExecutionException, TimeoutException {
//Create an ExecutorService for 2 threads
       java.util.concurrent.ExecutorService executorService = new ThreadPoolExecutor(2, 2, 60, TimeUnit.SECONDS, new ArrayBlockingQueue<>(10));
// Create 5 tasks
       MyRunnable task1 = new MyRunnable();
       MyRunnable task2 = new MyRunnable();
       MyRunnable task3 = new MyRunnable();
       MyRunnable task4 = new MyRunnable();
       MyRunnable task5 = new MyRunnable();

       final List<MyRunnable> tasks = List.of(task1, task2, task3, task4, task5);
// Pass a list that contains the 5 tasks we created
       final List<Future<Void>> futures = executorService.invokeAll(tasks, 6, TimeUnit.SECONDS);
       System.out.println("Futures received");

// Stop the ExecutorService
       executorService.shutdown();

       try {
           TimeUnit.SECONDS.sleep(3);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }

       System.out.println(executorService.isShutdown());
       System.out.println(executorService.isTerminated());
   }

   public static class MyRunnable implements Callable<Void> {

       @Override
       public void call() {
// Add 2 delays. When the ExecutorService is stopped, we will see which delay is in progress when the attempt is made to stop execution of the task
           try {
               TimeUnit.SECONDS.sleep(3);
           } catch (InterruptedException e) {
               System.out.println("sleep 1: " + e.getMessage());
           }
           try {
               TimeUnit.SECONDS.sleep(2);
           } catch (InterruptedException e) {
               System.out.println("sleep 2: " + e.getMessage());
           }
           System.out.println("done");
           return null;
       }
   }
}
```
- Console-output
```
done
done
Futures received
sleep 1: sleep interrupted
sleep 1: sleep interrupted
done
done
true
true
```
## Giải thích
- Executor nhận vào tối đa 2 task 1 lúc.
- Mỗi task của chúng sẽ bị delay 2 lần, delay đầu trong 3s, delay hai trong 2s.
- Executor sẽ terminate trong 6s.
- Nên từ log, chúng ta sẽ thấy 2 task đầu chạy bình thường
- 2 task tiếp theo sẽ bị interrupt do executor terminate, nhưng viết tiếp tục hoàn thành công việc.
- task cuối cùng bị cancelled hoàn toàn.
## Ứng dụng.
- 

## References
- https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html
- https://viblo.asia/p/class-proxy-trong-java-va-cac-ung-dung-yMnKMYvgK7P
- https://codegym.cc/groups/posts/208-dynamic-proxies