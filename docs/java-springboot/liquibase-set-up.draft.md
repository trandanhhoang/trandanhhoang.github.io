---
sidebar_position: 4
---

# Ví dụ liquibase - database version control 

## Tóm tắt
- project springboot với database postgresql, sử dụng liquibase để quản lý version của database.

## Prerequisites
- https://docs.liquibase.com/home.html
- Docker, Docker compose
```mermaid
graph TD
%% Định nghĩa các lớp (Layers)
    subgraph JVM ["JVM (Java Virtual Machine)"]
        direction LR
        PT1[Platform Thread]
        PT2[Platform Thread]
        PT3[Platform Thread]
        PT4[Platform Thread]
    end

    subgraph OS ["Operating System"]
        direction LR
        OT1((OS Thread))
        OT2((OS Thread))
        OT3((OS Thread))
        OT4((OS Thread))
    end

    subgraph CPU ["CPU"]
        direction LR
        C1[Core 1]
        C2[Core 2]
        C3[Core 3]
        C4[Core 4]
    end

%% Các đường nối ép Layout nằm dọc (Vertical Constraint)
%% Sử dụng link từ các node trung tâm để giữ cân bằng
    PT1 -.-> OT1
    PT2 -.-> OT2
    PT3 -.-> OT3
    PT4 -.-> OT4

    OT1 --- C1
    OT2 --- C2
    OT3 --- C3
    OT4 --- C4

%% CSS Styling để phân biệt rõ các khối
    style JVM fill:#FFF9C4,stroke:#FBC02D,stroke-width:3px,color:#333,font-weight:bold
    style OS fill:#FFF9C4,stroke:#FBC02D,stroke-width:3px,color:#333,font-weight:bold
    style CPU fill:#FFF9C4,stroke:#FBC02D,stroke-width:3px,color:#333,font-weight:bold

    style PT1 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT2 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT3 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C
    style PT4 fill:#EF9A9A,stroke:#B71C1C,color:#B71C1C

    style OT1 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT2 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT3 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32
    style OT4 fill:#C8E6C9,stroke:#2E7D32,color:#2E7D32

    style C1 fill:#000,color:#fff
    style C2 fill:#000,color:#fff
    style C3 fill:#000,color:#fff
    style C4 fill:#000,color:#fff
```

## Code example
- file Dockercompose.yaml
```yaml
version: '3.8'
name: liquibase-self-learn
services:
  postgres:
    image: postgres:15.5-alpine
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - local-postgres-v15:/var/lib/postgresql/data
volumes:
  local-postgres-v15:
    external: true
```

- file build.gradle
```
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.liquibase:liquibase-core'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.postgresql:postgresql'

    compileOnly 'org.projectlombok:lombok'

    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
    annotationProcessor 'org.projectlombok:lombok'
}
```

- file application.yml
```yaml
spring:
  liquibase:
    url: jdbc:postgresql://localhost:5432/${DATABASE_NAME:hoang-test-liquibase}
    user: postgres
    password: postgres
    change-log: "classpath:db/changelog/changelog-master.xml"
  datasource:
    url: jdbc:postgresql://localhost:5432/${DATABASE_NAME:hoang-test-liquibase}
    username: postgres
    password: postgres
```

- file resouces/db/changelog/changelog-master.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog https://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.7.xsd"
>
    <changeSet author="hoang.tran" id="init_database">
        <sql>
            CREATE TABLE IF NOT EXISTS hoang_s_table
            (
                id                         BIGSERIAL PRIMARY KEY,
                transaction_id             VARCHAR(50) NOT NULL
                );
        </sql>
    </changeSet>

    <changeSet author="huy.loc" id="extend_card_number_length">
        <sql>
            ALTER TABLE hoang_s_table
            ADD name VARCHAR(20);
        </sql>
    </changeSet>
</databaseChangeLog>
```
## Giải thích chi tiết

### **Database Changelog and Database Changelog Lock**
- Khi bạn tạo thay đổi,Liquibase sẽ tạo 2 bảng Database Changelog, Database Changelog Lock
  - The DATABASECHANGELOG table tracks deployed changes so that you have a record. Liquibase compares the changesets in the changelog file with the DATABASECHANGELOG tracking table and deploys only new changesets.
  - DATABASECHANGELOGLOCK prevents multiple instances of Liquibase from updating the database at the same time. The table manages access to the DATABASECHANGELOG table during deployment and ensures only one instance of Liquibase is updating the database.

## Câu hỏi tự trả lời
1. Thêm 1 changSet mới và chạy thử.
2. Thay đổi changeSet cũ và chạy thử, có gì xảy ra ?
  
## References
- https://docs.liquibase.com/home.html