# Integration Test

## 1. Introduction
- Bài này mình sẽ viết integration test cho 1 controllerV3 của mình
  - Nghĩa là ban đầu có 2 controller khác, dùng các service cũ, các jdbc cũ.
  - Yêu cầu: Chỉ muốn mock cho controllerV3, với các service mới, jdbc mới, ... những thứ mà mình cần.
- Ý tưởng:
  - Cấu hình chuẩn Context.
  - Các vấn đề xuất hiện trong quá trình cấu hình sẽ được nói chi tiết ở các phần sau

## 2. Cấu trúc project để tham chiếu

```text
+--main
|  +--java
|  |  +--controller
|  |  |  +--GrpcV3Controller.java

|  |  +--config
|  |  |  +-- RedisConfig.class --> inject vào RedisTemplate.class

|  |  +--service
|  |  |  +--ServiceA.class <--- Inject ServiceB.class, JdbcImplement.class, SomeServiceYouWantIgnore.class
|  |  +--jdbc
|  |  |  +--JdbcImplement.class <---- inject NamedParameterJdbcTemplate (H2MasterConfiguration will be replace default)

+--test
|  +--java
|  |  +--H2MasterConfiguration.java
```

## 3. Cấu hình cho integration test

### Ví dụ integration test với DB dùng H2Configuration
- Bạn có thể bỏ qua nếu thấy ko cần thiết.

```java
import javax.sql.DataSource;
import lombok.Data;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Data
@Configuration
@EnableTransactionManagement
public class H2MasterConfiguration {

  @Bean("datasource")
  public DataSource getMasterDataSource() {
    var dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.driverClassName("org.h2.Driver");
    dataSourceBuilder.url("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1");
    dataSourceBuilder.username("SA");
    dataSourceBuilder.password("");
    return dataSourceBuilder.type(SimpleDriverDataSource.class).build();
  }

  @Bean("jdbc")
  public NamedParameterJdbcTemplate getMasterNamedJdbcTemplate(
      @Qualifier("datasource") DataSource dataSource) {
    return new NamedParameterJdbcTemplate(dataSource);
  }
}
```

### Cấu hình ContextConfiguration
- Bạn cần phải xác định các class cần inject vào context.
- Ví dụ code trực quan bên dưới, bạn có thể thấy,
  - @Import mình để GrpcV3Controller, inject ServiceA, nên mình khai báo serviceA.
  - ServiceA dùng JdbcImplement, Inject bởi H2MasterConfiguration.class cũng được khai báo.
  - SpringBoot sẽ cố gắng tạo Bean cho các class này theo hướng bottom-up, ví dụ:
    - File yaml để tạo RedisConfig -> tạo RedisTemplate.class -> tạo Service.
- Mình gặp vấn đề ở bước này, khi lười, mình đã sử dụng @ComponentScan để quét toàn bộ package v3,
  - nếu bạn nhớ ngữ cảnh ban đầu của mình là viết cho service v3, thì thực ra khi viết service hay jdbc, mình có bỏ chúng vào folder v3.
  - Nhưng khi mình dùng @ComponentScan để quét, thay vì @Import từng cái mình cần, và @MockBean những thứ mình ko cần, thì vấn đề đã xảy ra.
  
- `Vấn đề`:
  - Như ví dụ trên: flow mình có là "file yaml để tạo RedisConfig -> tạo RedisTemplate.class -> tạo ServiceA.class"
  - Nhưng khi chạy, RedisConfig được khởi tạo đầu tiên, nhưng ngay lập tức ServiceA.class được tạo và nó tự inject RedisTemplate.class là 1 MockitoMock, chứ nó ko đợi tạo xong mới inject vào sau.
  - Mình nghĩ có thể vì cách mà mình inject vào service đang không được tốt, quá nhiều, có khá nhiều thứ mình MockBean, và những thứ đó dẫn tới lỗi này.
  - `Nên mình thấy bạn nên cẩn thận khi sử dụng @ComponentScan, nếu có thể, hãy sử dụng @Import, @MockBean để quản lý tốt hơn.`

```java
@Import({RedisConfig.class, H2MasterConfiguration.class,
     GrpcV3Controller.class, ServiceA.class})
@ComponentScan(basePackages = {
    "zalopay.pe.authentication.payment.config",
    "zalopay.pe.authentication.payment.domain",
})
@TestConfiguration
public class TestConfig {

  @MockBean
  private SomeServiceYouWantIgnore someServiceYouWantIgnore;

}
```

### Cấu hình cho class test chính.
- Annotation @RunWith(SpringRunner.class) được sử dụng nếu bạn dùng Junit4

- Annotation ExtendWith(SpringExtension.class) được sử dụng nếu bạn dùng Junit5
  - Mình đọc trên mạng thấy thế, nên nếu bạn dùng JUnit5 thì hãy thử.

- Annotation @SqlGroup, và @SQl dùng cho H2MasterConfiguration.class. Bạn có thể bỏ qua.
- @EnableAutoConfiguration để đọc cấu hình từ application.properties, application.yml, ...

- Note
  - Annotation @SpringBootTest tạo toàn bộ ngữ cảnh -> ko sử dụng trong trường hợp này.
  - @Testcontainers(disabledWithoutDocker = true) này dùng với Testcontainers, bạn thấy cần thiết thì lên mạng đọc.
  - hàm redisProperties() dùng để cấu hình lại biến môi trường cho redis, và đảm bảo redis (dùng testcontainer) được start trước khi test chạy. 

```java
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@SqlGroup({
@Sql(value = "classpath:db/schema.sql", executionPhase = BEFORE_TEST_METHOD),
@Sql(value = "classpath:db/reset.sql", executionPhase = AFTER_TEST_METHOD),
})
@ContextConfiguration(classes = {TestConfig.class})
@RunWith(SpringRunner.class)
@Testcontainers(disabledWithoutDocker = true)
@EnableAutoConfiguration
public class FullFlowTest {

  @Autowired
  private GrpcV3Controller grpcV3Controller;

  @Container
  static final GenericContainer REDIS =
      new GenericContainer(DockerImageName.parse("redis:7.2.4-alpine")).withExposedPorts(6379);

  @DynamicPropertySource
  static final void redisProperties(DynamicPropertyRegistry env) {
    REDIS.start();
    env.add("redis.redisNodes",
        () -> List.of("redis://" + REDIS.getHost() + ":" + REDIS.getFirstMappedPort()));
  }

  @MockBean
  private ApiMock apiMock;
  
  // sử dụng grpcV3Controller để test full flow.
  private void runPreparePaymentAuth() {
    // given
    var request = new Request();
    // when
    when(apiMock.foo(any())).thenReturn(bar);

    // trigger
    var res = grpcV3Controller.fooo(request);
    //then
    assertNotNull(res); 
  }
}
```

```pom
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.testcontainers</groupId>
  <artifactId>testcontainers</artifactId>
  <version>1.20.1</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.testcontainers</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>1.20.1</version>
  <scope>test</scope>
</dependency>
```