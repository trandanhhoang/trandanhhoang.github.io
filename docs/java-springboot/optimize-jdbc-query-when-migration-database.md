---
sidebar_position: 5
---

# Tối ưu query jdbc khi migration database

## Tóm tắt
- Chúng ta sẽ học cách thêm log vào jdbc (log chi tiết về query gọi sang database) 
- Tối ưu query jdbc, từ 10000 call thành 5001 call bằng batch insert
- ignore check key khi lưu data mới. từ 5001 call thành 2 call.

## Code example
### Thêm log vào jdbc dùng **proxy datasource**
- Thêm pom.
```xml
<dependency>
      <groupId>net.ttddyy</groupId>
      <artifactId>datasource-proxy</artifactId>
      <version>1.9</version>
</dependency>
```
- Thêm proxy datasource
```java
class dbConfig{
    @Bean
    public DataSource datasource(){
        HikariConfig hikariConfig=new HikariConfig();
        hikariConfig.setDriverClassName("org.mariadb.jdbc.Driver");
        hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3307/hoang_db?useSSL=false&useUnicode=yes&characterEncoding=UTF-8");
        hikariConfig.setUsername("admin");
        hikariConfig.setPassword("admin");
    
        SLF4JQueryLoggingListener loggingListener=new SLF4JQueryLoggingListener();
    
        return ProxyDataSourceBuilder
                .create(new HikariDataSource(hikariConfig))
                .name("hoangDbDatasource")
                .listener(loggingListener)
                .countQuery()
                .logQueryToSysOut()
                .build();
    }
}
```
- tạo test để check log
```java
class Test{
    @Bean
    public void test(){
        try {
            hoangInfoRepository.save(new hoangEntity("1"));
        } catch (Exception ex) {
            System.out.println("fail to save hoangEntity: {} with error" + ex);
        }
    }
}
```
- console
```
Name:hoangDatasource, Connection:3, Time:110, Success:True, Type:Prepared, Batch:False, QuerySize:1, BatchSize:0, Query:["select hoang0_.id as id1_0_0_ from hoang where hoang0_.id=?"], Params:[(1)]
Name:hoangDatasource, Connection:3, Time:9, Success:True, Type:Prepared, Batch:False, QuerySize:1, BatchSize:0, Query:["update hoang set x? where id=?"], Params:[1)]
```
- Giải thích: Dòng log trên có nghĩa là, trước khi lưu, jdbc sẽ check xem data có tồn tại hay không, Sau đó, nếu có thì update, không thì insert.
  - Chúng ta có thể tối ưu điều này khi migration-db (đảm bảo data mới không bị trùng với data cũ, không cần check data cũ, chỉ cần insert)
- Bạn hãy thử test với 5000 records, để ứng dụng vào các ví dụ tiếp theo.

### Apply Batch
- Từ cách thêm log trên, bạn có thể kiểm tra bao nhiêu request tới db khi lưu 5000 records, nếu không apply batch, sẽ là 10.000 request, 5000 cho check data cũ, 5000 cho insert.
- Để tối ưu, chúng ta sẽ apply batch insert, sẽ còn 5001 request, 5000 request cho check data cũ (việc check này không thể apply batch, vì check trên từng id), và 1 request cho insert (nếu data ko bị trùng)
```yaml
spring:
  jpa:
    properties:
      hibernate.jdbc.batch_size: 5000
```
- Springboot có hỗ trợ "**_jpa.show-sql: true_**" để show ra câu query (nhưng không đầy đủ như **proxy datasource**)
- Bạn hãy thử test với 5000 records, sẽ thấy chỉ còn 5001 request.

### Ignore check key khi lưu data mới
- implement Persistable and override isNew() method and getId() method```java
```java
public class HoangEntity implements Persistable<String> {
  @Id
  @Column(name = "id")
  private String id;

  @Override
  public boolean isNew() {
    return true;
  }

  @Override
  public String getId() {
    return id;
  }
}
```

- Bạn hãy thử insert trùng và xem log.

## References
- https://github.com/jdbc-observations/datasource-proxy
- https://vladmihalcea.com/the-best-way-to-log-jdbc-statements/