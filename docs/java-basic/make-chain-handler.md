---
sidebar_position: 2
---

# Tạo 1 chain handler có thứ tự trong java

## Tóm tắt
- Tạo 1 chain handler có thứ tự trong java.
  - Kết hợp 2 hay nhiều producer lại với nhau
    - mỗi producer sẽ thực hiện 1 công việc nào đó, và được làm theo thứ tự.

## Code example 
- Viết code để thêm prefix và suffix vào 1 string.
```java
public interface CompositeProducerI {
    String apply(String s);
    CompositeProducerI and(CompositeProducerI compositeProducer);
}
```

```java
public abstract class CompositeProducer implements CompositeProducerI {
    public CompositeProducerI and(CompositeProducerI compositeProducer) {
        return new CompositeProducerImpl(this, compositeProducer);
    }

    public static class CompositeProducerImpl extends CompositeProducer{
        private final CompositeProducerI left;
        private final CompositeProducerI right;

        public CompositeProducerImpl(CompositeProducerI left, CompositeProducerI right) {
            this.left = left;
            this.right = right;
        }


        @Override
        public String apply(String s) {
            return left.apply(right.apply(s));
        }
    }
}
```

```java
public class LeftProducer extends CompositeProducer implements CompositeProducerI{
    @Override
    public String apply(String s) {
        return "prefix" + s;
    }
}
```

```java
public class RightProducer extends CompositeProducer implements CompositeProducerI {
    @Override
    public String apply(String s) {
        return s+"suffix";
    }
}
```
```java
public class Main {
    public static void main(String[] args) {
        CompositeProducerI left = new LeftProducer();
        CompositeProducerI right = new RightProducer();
        CompositeProducerI compositeProducer = left.and(right);
        System.out.println(compositeProducer.apply("test"));
    }
}
```