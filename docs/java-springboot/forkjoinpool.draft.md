---
sidebar_position: 1
---

- Executor (Interface): Tầng cao nhất, chỉ có phương thức execute().
- ExecutorService (Interface): Thêm các phương thức quản lý vòng đời (shutdown) và submit().
- AbstractExecutorService (Class): Cung cấp các cài đặt mặc định.
- public abstract class AbstractExecutorService
  - SchedulerThreadPoolExecutor
  - ThreadPoolExecutor (Fixed, Cached, Scheduled).
  - ForkJoinPool
    - ForkJoinTask: Đại diện cho một task (nhẹ hơn Thread rất nhiều).
    -RecursiveAction: Dùng cho task không trả về kết quả (void).
    -RecursiveTask: Dùng cho task có trả về kết quả.
    -WorkQueue: Hàng đợi nội bộ của mỗi Worker Thread.
