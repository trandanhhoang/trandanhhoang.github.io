---
sidebar_position: 3
---

# Ví dụ kafka + java springboot

## Tóm tắt 
- project kafka producer, consumer cơ bản để hiểu rõ hơn về partition, ack trong consumer.

## Prequisites
- visualization kafka để hiểu rõ hơn:
  - https://softwaremill.com/kafka-visualisation/
- Docker, Docker compose

## Set up
- file docker-compose.yaml
```yaml
version: '3.8'
name: kafka-self-learn
services:
  zookeeper:
    container_name: local-zookeeper
    image: 'zookeeper:latest'
    ports:
      - '2181:2181'
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    container_name: local-kafka
    image: 'bitnami/kafka:latest'
    ports:
      - '9092:9092'
    environment:
      - KAFKA_BROKER_ID=0
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=INTERNAL
      - KAFKA_CFG_LISTENERS=PLAINTEXT_UI://:9091,PLAINTEXT://:9092,INTERNAL://kafka:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT_UI://kafka:9091,PLAINTEXT://localhost:9092,INTERNAL://kafka:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_UI:PLAINTEXT
    depends_on:
      - zookeeper
      
  kafka-ui:
    container_name: local-kafka-ui
    image: 'provectuslabs/kafka-ui:latest'
    ports:
      - '9090:8080'
    environment:
      - DYNAMIC_CONFIG_ENABLED=true
      - KAFKA_CLUSTERS_0_NAME=local
      - KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka:9091
      - KAFKA_CLUSTERS_0_ZOOKEEPER=zookeeper:2181
    depends_on:
      - kafka
```
- Bạn có thể dùng file docker-compose trên, dùng kafka-ui tại localhost:9090 để check status của kafka-broker.

## Example code

### Producer project
```java
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class ProducerReactor {
    @Bean
    public NewTopic topic() {
        return TopicBuilder.name("topic-reactor")
                .partitions(10)
                .replicas(1)
                .build();
    }

    @Bean
    public ApplicationRunner runnerPartition1(KafkaTemplate<String, String> templateDefault) {
        return args -> {
            // send 10 message
            for (int messageNumber = 0; messageNumber < 10; messageNumber++) {
                // send 10 partition
                for (int partition = 0; partition < 10; partition++) {
                    templateDefault.send("topic-reactor", partition, "hoang", "message number " + messageNumber);
                }
                Thread.sleep(1000);
            }
        };
    }
}
```

### Consumer project
```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Consumer {

    @KafkaListener(id = "myId", topics = "topic1", concurrency = "2")
    public void listen(String in) throws InterruptedException {
        Thread.sleep(2000);
        log.info("received message='{}'", in);
    }
}

```
### build.gradle
```
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
    annotationProcessor 'org.projectlombok:lombok'
    implementation 'org.springframework.kafka:spring-kafka'
}
```

## Run and learn
### Consumer + partition hoạt động với nhau như thế nào ?
- Chúng ta đã tạo được topic với 10 partition
  - Với Consumer có concurrency = 2, nghĩa là sẽ có 2 consumer được tạo ra để consume message từ topic1
    - Check log chúng ta sẽ thấy consume 1 sẽ consume partition từ 0 -> 4, consume 2 sẽ consume partition từ 5 -> 9
```
o.s.k.l.KafkaMessageListenerContainer    : myId: partitions assigned: [topic1-5, topic1-6, topic1-7, topic1-8, topic1-9]
o.s.k.l.KafkaMessageListenerContainer    : myId: partitions assigned: [topic1-0, topic1-1, topic1-2, topic1-3, topic1-4]
```
- Với Consumer có concurrency = 1, nghĩa là chỉ có 1 consumer duy nhất consume message từ topic1, trên cả 10 partition
  - Có thể kiểm tra trên kafka-ui.

### Consumer, ack trên từng partition hoạt động như thế nào ?
- Config producer bắn 10 messages trên 1 partition
- Config consumer có concurrency = 1
- Chúng ta sẽ thấy consumer sẽ không consume message tiếp theo cho đến khi message trước đó được ack
  - Có thể tự config mode manual ack, và không ack message, bạn sẽ thấy message đó được consume mãi mãi.
  - Với auto ack, message sẽ được ack dù có xảy ra exception trong method listen (sau 10 lần retry mà vẫn thất bại).

- Mục đích: 
  - đảm bảo tính thứ tự trên từng partition (producer có thể truyền thêm key để đảm bảo với cùng 1 key, data sẽ vào cùng 1 partition)
  - Nếu không có key, data vào partition nào sẽ do broker quyết định.

## Câu hỏi tự trả lời
- 1 partition có 2 consumer(set concurrency = 2) có được ko ?
- config: auto.offset.reset = latest, earliest để làm gì ?
- config: group-id để làm gì -> thay đổi giá trị này khi config
- Không dùng @KafkaListener, tự config từng prop để hiểu rõ hơn về consumer, ví dụ
```
Map<String, Object> props = new HashMap<>();
props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ConsumerConfig.GROUP_ID_CONFIG, "group-id");
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
```

## References
- https://docs.spring.io/spring-kafka/reference/quick-tour.html

