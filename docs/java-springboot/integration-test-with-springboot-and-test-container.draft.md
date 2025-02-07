---
sidebar_position: 2
---

# Integration test với springboot và test-container

## Tóm tắt
- Chúng ta sẽ viết integration test cho bài viết cũ ([library với annotation, reflection, aop, springboot](https://trandanhhoang.github.io/docs/java/how-to-write-library-with-java-springboot))
  - Chúng ta cần test được thư viện trong 1 project gồm database, kafka, .... Bài viết này sẽ hướng dẫn bạn cách tạo những bean cần thiết cho quá trình integration test, thay vì mock cả project.

## Vấn đề
- Annotation @Idempotent cần SpringContext để hoạt động (vì chúng ta cần quét bean, khởi tạo bean), nhưng nếu chỉ sử dụng @SpringBootTest, nó sẽ load tất cả bean trong project, dính tới database hay kafka.
- Chúng ta có thể chỉ định Bean muốn khởi tạo bằng cách trên class TestCheckIdempotent, đánh annotation @SpringBootTest và @ContextConfiguration(classes = TestApplication.class)
  - với class TestApplication sẽ khởi tạo bean chúng ta cần, đó là IdemController(Bean chúng ta muốn test) và  IdempotentConfiguration(Bean quét project và tạo map IdempotentEngine)

## Prerequisites
- Chạy redis-server bằng docker hoặc server.

## Code example
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;
@Import({IdempotentConfiguration.class, IdemController.class})
@EnableAutoConfiguration
public class TestApplication {
    public static void main(String[] args) {
        SpringApplication.run(com.TestApplication.class, args);
    }
}
```

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
@ActiveProfiles("test")
@ContextConfiguration(classes = TestApplication.class)
@Testcontainers(disabledWithoutDocker = true)
@ExtendWith(MockitoExtension.class)
public class TestCheckIdempotent {

    @Autowired private IdemController idemController;

    // @MockBean private: nếu IdemController cần argument, đánh dấu @MockBean 

    @Container
    static final GenericContainer redis =
            new GenericContainer(DockerImageName.parse("redis:5.0.3-alpine")).withExposedPorts(6379);

    @DynamicPropertySource
    static void overrideProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.redis.port", redis::getFirstMappedPort);
    }

    @Test
    public void testIdempotent() {
        // given
        Request request = new Request("hoang",23);
        // verify
        idemController.idempotent("something",request);
        Assertions.assertThrows(
                RuntimeException.class, () -> idemController.idempotent("the right request is same with above",request));
    }
    
}
```
- file application.yml
```yaml
spring:
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      password: ${REDIS_PASSWORD:}
      timeout: 10000
      ssl:
        enabled: ${REDIS_SSL:false}
```
- file build.gradle
```
implementation 'org.springframework.boot:spring-boot-starter'
testImplementation "org.testcontainers:testcontainers:1.19.3"
testImplementation "org.testcontainers:junit-jupiter:1.19.3"
testImplementation 'org.springframework.boot:spring-boot-starter-test'
```
## References
- test-container: https://www.testcontainers.org/