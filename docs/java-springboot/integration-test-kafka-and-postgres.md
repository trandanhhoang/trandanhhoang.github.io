# Integration Test với Kafka và Postgres bằng test-container

## 1. Introduction
- Bài này sẽ viết dùng test-container với kafka và database.

## Code
```java
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.testcontainers.containers.KafkaContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import reactor.kafka.receiver.ReceiverOptions;

@Testcontainers(disabledWithoutDocker = true)
public abstract class KafkaTemplateTest {

    @Container
    static final KafkaContainer kafka =
            new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:6.2.1"));

    protected static ReceiverOptions<Integer, String> receiverOptions;

    protected static KafkaTemplate<String, String> kafkaTemplate;

    protected static ReceiverOptions<Integer, String> configReceiverOptions() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers());
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "group1");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        return ReceiverOptions.create(props);
    }

    protected static KafkaTemplate<String, String> initKafkaTemplate() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(props));
    }

    @BeforeAll
    public static void setUpKafkaTemplate() {
        receiverOptions = configReceiverOptions();
        kafkaTemplate = initKafkaTemplate();
    }
}
```

```java
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers(disabledWithoutDocker = true)
@ContextConfiguration(classes = CpsPostingConsumerTest.class)
@ComponentScan(
        basePackages = {
            "com.finx.transaction.infra*",
            "com.finx.transaction.core*",
            "com.finx.transaction.common*",
        })
@EnableAutoConfiguration
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class CpsPostingConsumerTest extends KafkaTemplateTest {
    @Container
    public static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.r2dbc.url", () -> postgres.getJdbcUrl().replace("jdbc", "r2dbc"));
        registry.add("spring.r2dbc.username", postgres::getUsername);
        registry.add("spring.r2dbc.password", postgres::getPassword);
        registry.add("spring.liquibase.url", postgres::getJdbcUrl);
        registry.add("spring.liquibase.user", postgres::getUsername);
        registry.add("spring.liquibase.password", postgres::getPassword);
    }

    @Autowired CardTransactionPostingHandler cardTransactionPostingHandler;

    @Autowired AccountTransactionDao accountTransactionDao;

    @Test
    void testCancelledTransactions() {
      // call something that use kafka.
    }
}
```

```gradle
testImplementation "org.testcontainers:testcontainers:1.19.3"
testImplementation "org.testcontainers:junit-jupiter:1.19.3"
testImplementation "org.testcontainers:postgresql:1.19.3"
testImplementation "org.testcontainers:kafka:1.19.3"
```