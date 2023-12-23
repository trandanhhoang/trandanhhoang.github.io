---
sidebar_position: 1
---

# DynamicProxy

## Tóm tắt
- Tạo 1 dynamic proxy cơ bản.
  - Mục đích: Thay đổi hành vi method của 1 object.
  - https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html 

## Code example
- Tạo interface Person
```java
public interface Person {
  int doingTest();
}
```
- Tạo class Man implement interface Person
```java
public class Man implements Person{
  @Override
  public int doingTest() {
    System.out.println("hoang is doing test");
    return 10;
  }
}
```
- Tạo class Proxy (bằng cách implements InvocationHandler), có thể làm gì đó trước hoặc sau khi chạy method của object, như code dưới là log sau khi chạy doingTest()
- Object proxy
- Method method, là các method của interface, sẽ được truyền vào ở constructor.
- Object[] args, là biến truyền vào của method khi gọi hàm thông qua object proxy.
```java
public class CustomInvocationHandler implements InvocationHandler{

  private final Person person;
  public CustomInvocationHandler(Person person) {
    this.person = person;
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
      // chạy method bất kì của interface input.
    Object obj = method.invoke(person, args); // xem thư viện reflect để hiểu hơn method này
    System.out.println("hoang proxy test");
    return obj;
  }
}
```
- Viết hàm main để test, dùng reflection để lấy classLoader và interface để tạo proxy, sau đó dùng object proxy để gọi method.
```java
public class DynamicProxyTest {

  public static void main(String[] args) throws IOException {
    // constructor object man
    Man man = new Man();
    // cách tạo proxy
    ClassLoader classLoader = man.getClass().getClassLoader();
    Class[] interfaces = man.getClass().getInterfaces();
    Person proxyMan = (Person) Proxy.newProxyInstance(classLoader, interfaces, new CustomInvocationHandler(man));
    // chạy foo()
    int mark = proxyMan.doingTest();
    System.out.println("hoang get " + mark + " mark");
  }
}
```
- Console output
```
hoang is doing test
hoang proxy test
hoang get 10 mark
```

## Ứng dụng.
- 

## References
- https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html
- https://viblo.asia/p/class-proxy-trong-java-va-cac-ung-dung-yMnKMYvgK7P
- https://codegym.cc/groups/posts/208-dynamic-proxies