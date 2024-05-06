---
sidebar_position: 1
---
# Apply generic in java

## Tóm tắt
- Apply generic để tái sử dụng class trong tương lai.
- Chúng ta sẽ viết 1 handler
  - Có thể nhận vào nhiều loại data khác nhau.
  - Nhưng cùng thực hiện 1 flow công việc.

## Code example 1
- Dùng interface và abstract class để tái sử dụng code.
```java
public class SinhVien{
	private String name;
    private int age;
}
```
- `interface GenericSinhVienProvider<T> có 2 method`
  - getData(T data): trả về đối tượng SinhVien từ 1 nguồn data nào đó. (T)
  - apply(Sinhvien info): thực hiện việc gì đó với đối tượng SinhVien, ví dụ như lưu vào database, ...
```java
public interface GenericSinhVienProvider<T>{
	SinhVien getData(T data);
	void apply(Sinhvien info);
}
```

- BaseSinhVienRegister sẽ hoạt động dựa vào 2 method trên.
```java
public abstract class BaseSinhVienRegister<T> implements GenericSinhVienProvider<T>{
		public void doApply(T data){
            SinhVien sinhVien = getData(data);
			apply(sinhVien);
		}
}
```

```java
public class SinhVienFromInputStream extends BaseSinhVienRegister<InputStream>{
		@Override
    public SinhVien getData(InputStream data) {
			// Read data from input stream, file, ...
    }

    @Override
    @Transactional
    public void apply(LosRegisterInfo losRegisterInfo) {
			// do Something, save database.
    }
}
```

## Code example 2
- Chỉ dùng interface
```java
public interface SinhVienProvider <T> {
    SinhVien getData(T data);
    void apply(SinhVien info);

    default void doApply(T data){
        SinhVien sinhVien = getData(data);
        apply(sinhVien);
    }
}
```