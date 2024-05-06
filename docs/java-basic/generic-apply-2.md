---
sidebar_position: 1
---
# Apply generic in java 2

## Tóm tắt
- Apply generic để tái sử dụng class trong tương lai.
## Code example 1
- Dùng abstract class để tái sử dụng code.
```java
public class SinhVien{
	private String name;
    private int age;
}
```

- BaseSinhVienRegister sẽ hoạt động dựa vào 2 method trên.
```java
public abstract class BaseSinhVienRegister<T> {
    public void doApply(T data) {
        // do job 1
        doSomething();
        // do job 2
    }

    protected void doSomething() {
        // do nothing
    }
}
```

```java
public class SinhVienFromInputStream extends BaseSinhVienRegister<InputStream>{
    @Override
    @Transactional
    public void apply(LosRegisterInfo losRegisterInfo) {
			// do Something, save database.
    }
    
    @Override
    public SinhVien doSomething() {
        // call service, save database, ...
    }
}
```