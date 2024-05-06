---
sidebar_position: 5
---

# Tối ưu query jdbc khi migration database

## Tóm tắt
- Chúng ta sẽ học cách thêm log vào datasource (log chi tiết về query gọi sang database) 
- Tối ưu query jdbc, từ 10000 call (5000 call check id + 5000 call insert) thành 5001 call bằng batch insert.
- Ignore check key khi lưu data mới. từ 5001 call thành 1 call.

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
- Hoặc gradle
```
// https://mvnrepository.com/artifact/net.ttddyy/datasource-proxy
implementation 'net.ttddyy:datasource-proxy:1.4.1'
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

### Proxy Bean
- Nếu database config ở yaml.
```java
import net.ttddyy.dsproxy.listener.logging.SLF4JLogLevel;
import net.ttddyy.dsproxy.support.ProxyDataSource;
import net.ttddyy.dsproxy.support.ProxyDataSourceBuilder;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import javax.sql.DataSource;
import java.lang.reflect.Method;

@Component
public class DatasourceProxyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (bean instanceof DataSource source && !(bean instanceof ProxyDataSource)) {
            // Instead of directly returning a less specific datasource bean
            // (e.g.: HikariDataSource -> DataSource), return a proxy object.
            // See following links for why:
            //   https://stackoverflow.com/questions/44237787/how-to-use-user-defined-database-proxy-in-datajpatest
            //   https://gitter.im/spring-projects/spring-boot?at=5983602d2723db8d5e70a904
            //   https://arnoldgalovics.com/configuring-a-datasource-proxy-in-spring-boot/
            final ProxyFactory factory = new ProxyFactory(bean);
            factory.setProxyTargetClass(true);
            factory.addAdvice(new ProxyDataSourceInterceptor(source));
            return factory.getProxy();
        }
        return bean;
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        return bean;
    }

    private static class ProxyDataSourceInterceptor implements MethodInterceptor {
        private final DataSource dataSource;

        public ProxyDataSourceInterceptor(final DataSource dataSource) {
            this.dataSource = ProxyDataSourceBuilder.create(dataSource)
                    .name("hoangDS")
                    .multiline()
                    .logQueryBySlf4j(SLF4JLogLevel.INFO)
                    .build();
        }

        @Override
        public Object invoke(final MethodInvocation invocation) throws Throwable {
            final Method proxyMethod = ReflectionUtils.findMethod(this.dataSource.getClass(),
                    invocation.getMethod().getName());
            if (proxyMethod != null) {
                return proxyMethod.invoke(this.dataSource, invocation.getArguments());
            }
            return invocation.proceed();
        }
    }

}
```

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
- Lúc này sẽ chỉ còn duy nhất 1 request insert batch. 
- Bạn hãy thử insert trùng và xem log.

## References
- https://github.com/jdbc-observations/datasource-proxy
- https://vladmihalcea.com/the-best-way-to-log-jdbc-statements/