# Thiết kế class

## Giới thiệu bài hôm nay
- Thời gian đọc: ... phút đọc.
- Khi thiết kế class, hẳn bạn sẽ băn khoăn, nó nên có thuộc tính (property), hay phương thức (method) gì, các vấn đề nên chú ý khi thiết kế class.
  - Bài hôm nay sẽ giúp bạn 1 phần để thiết kế nó tốt hơn.

### Property, Method là gì ?
- Là 1 thông tin của Object, mà chúng ta lấy được bằng cách gọi query method (get method)
  - Ví dụ: `customer.getName()`, `customer.getAge()`.
- Kiểu dữ liệu của nó không hẳn phải là primitive type, mà còn có thể là 1 Object khác.
- Bạn có thể set nó lúc khởi tạo, hoặc cũng có thể set nó sau đó trong quá trình chạy.

- Martin Fowler nói:
    - _This is a regular habit of mine in design: for me the essence of object-orientation is that you separate interface from implementation, and make interface more important._

#### The common case of Property
- Fixed Properties.
```java
class Customer {

  private String name;
  private int age;
}
```
- Bình thường bạn sẽ cung cấp get method cho các thuộc tính name, age ở trên.
  - getName(), getAge().
- Việc set, thì tuỳ thuộc vào việc bạn có muốn thay đổi nó hay không.
  - setName(). `private final int age`.
  - Và khi set, kiểu trả về cũng tuỳ thuộc vào bạn
    - return thuộc tính được thay đổi
    - return object đó.
    - return void.

- Cách này có những lợi hại gì
  - pros: đơn giản, dễ hiểu.
  - cons: chỉ có thể thêm thuộc tính ở design time. ??? design time là gì ?, các cách khác là gì


#### Dynamic Properties.
- Khi nào thì bạn cần thuộc tính động, chẳng hạn như bạn cần tên bố mẹ của customer, địa chỉ của họ. Không thể nào cứ với mỗi yên cầu, bạn lại phải thêm 1 thuộc tính.
  - Lúc này bạn sẽ dùng `Map<String,String>` extraData; quá quen thuộc phải không nào.
  

### Mối quan hệ giữa các class.
#### Composition và Aggregaion - Inheritance và Composition
- Engine `không thể` tồn tại nếu thiếu class Car.
- Student `vẫn` tồn tại nếu thiếu class School.

### SOLID principle
- Single Responsibility Principle (SRP)
  - class nên có 1 trách nhiệm cụ thể. Ví dụ class Employee thì có method doTask(), method calculateSalary() thì nên tạo class EmployeeSalary và kế thừa Employee.
- Open/Closed Principle (OCP)
  - class nên mở rộng, nhưng không nên sửa đổi.
- Liskov Substitution Principle (LSP)
  - class con thay thế được class cha mà không làm sai logic.
- Interface Segregation Principle (ISP)
  - class nên implement nhiều interface nhỏ, không nên implement 1 interface lớn.
- Dependency Inversion Principle (DIP)
  - high-level module không nên phụ thuộc vào low-level module. Cả 2 nên phụ thuộc vào abstraction.
### Immutable Class

```java
public List<Object> getAuthPlan() {
    return Collections.unmodifiableList(someList);
}
```

### Abstract Classes vs. Interfaces
- Abstract Classes
  - shared behavior between classes (through concrete methods)

### Thread-Safe Class Design
Immutability: Immutable objects are inherently thread-safe since their state cannot be changed once they are created.
Synchronization: Use synchronized blocks or methods to control access to shared resources, ensuring that only one thread can access the critical section at a time.
Concurrency Utilities: Use classes from the java.util.concurrent package, such as ConcurrentHashMap, CopyOnWriteArrayList, and AtomicInteger, which are designed for safe use in concurrent environments.
Volatile Keyword: The volatile keyword ensures visibility of changes to variables across threads.
Locks: Explicit locks (e.g., ReentrantLock) provide more control over synchronization compared to synchronized blocks.
### Data Validation and Constraints
- annotation

### Inner and Nested Classes
- Non-static Nested Class (Inner Class)
  - Instance (Object) của class bên trong thuộc về instance của class bên ngoài.
- Static Nested Class
  - Instance của class bên trong thuộc về **class** bên ngoài.

### Dependency Injection and Inversion of Control
- IOC nghĩa là thay vì application code tạo và quản lý dependencies, thì framework, hoặc IoC container làm.
- SpringFramwork apply Dependency injection bằng các cách
  - @Autowrite -> inject by field
  - Constructor inject.
  - Setter inject.