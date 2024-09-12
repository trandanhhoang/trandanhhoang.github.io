# Java in action

## Chapter 2
### Parameterized type
- chọn list từ list ban đầu thoả điều kiện.
- Old code: cách này không tốt vì nếu muốn thêm điều kiện mới thì phải sửa method.
```java
public static List<Apple> filterApples(List<Apple> inventory,
                                               int weight, int color) {
    List<Apple> result = new ArrayList<>();
    For(Apple apple:inventory){
        if (apple.getWeight() > weight & "green".equals(apple.getColor())) {
            result.add(apple);
        }
    }
}
```
- New code, dùng interface.
```java
public interface ApplePredicate{
    boolean accept (Apple apple);
}

public class AppleRedAndHeavyPredicate implements ApplePredicate{
    public boolean test(Apple apple){
        return "red".equals(apple.getColor())
                && apple.getWeight() > 150;
    }
}

public static List<Apple> filterApples(List<Apple> inventory,
                                               ApplePredicate applePredicate) {
    List<Apple> result = new ArrayList<>();
    For(Apple apple:inventory){
        if (applePredicate.accept(apple)) {
            result.add(apple);
        }
    }
}
// main will call method above.
List<Apple> result = filterApples(inventory, new AppleRedAndHeavyPredicate());
```
- The better using lambda.
```java
List<Apple> result =
filterApples(inventory, (Apple apple) -> "red".equals(apple.getColor()));
```
- Using generic
```java
public interface Predicate<T>{
    boolean test(T t);
}
public static <T> List<T> filter(List<T> list, Predicate<T> p){
    List<T> result = new ArrayList<>();
    for(T e: list){
        if(p.test(e)){
            result.add(e);
        }
    }
    return result;
}
```

## Tail-recursive factorial
- Old way
```java
long factorialTailRecursive(int n) {
    return n == 1 ? 1 : n * factorialTailRecursive(n - 1);
}
```
-new way
```java
long factorialTailRecursive(int n) {
    return helper(1, n);
}
long helper(int a, int n) {
    return n == 1 ? a: helper(a * n, n - 1);
}
```