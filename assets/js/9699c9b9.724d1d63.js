"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6722],{7041:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>a});var i=s(5893),t=s(1151);const c={sidebar_position:1},o="Set up debezium with postgres",r={id:"debezium/setup-debezium-with-postgres",title:"Set up debezium with postgres",description:"T\xf3m t\u1eaft",source:"@site/docs/debezium/setup-debezium-with-postgres.md",sourceDirName:"debezium",slug:"/debezium/setup-debezium-with-postgres",permalink:"/docs/debezium/setup-debezium-with-postgres",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Debezium",permalink:"/docs/category/debezium"},next:{title:"Book",permalink:"/docs/category/book"}},l={},a=[{value:"T\xf3m t\u1eaft",id:"t\xf3m-t\u1eaft",level:2},{value:"What you got",id:"what-you-got",level:2},{value:"Hi\u1ec7n th\u1ef1c",id:"hi\u1ec7n-th\u1ef1c",level:2},{value:"DEMO",id:"demo",level:2},{value:"References",id:"references",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"set-up-debezium-with-postgres",children:"Set up debezium with postgres"}),"\n",(0,i.jsx)(n.h2,{id:"t\xf3m-t\u1eaft",children:"T\xf3m t\u1eaft"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["N\u1ebfu b\u1ea1n giao ti\u1ebfp gi\u1eefa c\xe1c service ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.em,{children:"\u0111\u1ec3 th\xf4ng b\xe1o c\xf3 s\u1ef1 thay \u0111\u1ed5i c\u1ee7a database"})}),", d\xf9 cho b\u1ea1n d\xf9ng REST, kafka, rabbit-mq, message c\xf3 th\u1ec3 drop v\xec nhi\u1ec1u l\xed do, v\xed d\u1ee5:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["N\u1ebfu giao ti\u1ebfp REST (Service A-> Service B)","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Service B b\u1ecb down, message m\u1ea5t"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Kafka ho\u1eb7c Rabbitmq:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Producer g\u1eedi message kh\xf4ng th\xe0nh c\xf4ng, l\u1ed7i network, ho\u1eb7c l\u1ed7i b\u1ea5t k\xec"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["L\u1ed7i ngay t\u1eeb service A:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"B\u1ea1n code sai khi\u1ebfn ch\u01b0a t\u1edbi b\u01b0\u1edbc send message th\xec \u0111\xe3 b\u1ecb l\u1ed7i."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Debezium \u0111\u1ecdc data t\u1eeb bin-log, n\xean ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.em,{children:"message th\xf4ng b\xe1o s\u1ef1 thay \u0111\u1ed5i c\u1ee7a db"})})," s\u1ebd kh\xf4ng bao gi\u1edd b\u1ecb thi\u1ebfu."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"what-you-got",children:"What you got"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Khi update database, debezium s\u1ebd b\u1eafn message l\xean topic kafka, b\u1ea1n c\xf3 th\u1ec3 \u0111\u1ecdc message t\u1eeb \u0111\xe2y \u0111\u1ec3 l\xe0m g\xec tu\u1ef3 th\xedch."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"hi\u1ec7n-th\u1ef1c",children:"Hi\u1ec7n th\u1ef1c"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["B\u01b0\u1edbc 1: Set up docker-compose (m\xecnh s\u1ebd d\xf9ng l\u1ea1i \u1ea3nh docker-compose c\u1ee7a b\xe0i kafka c\u0169)",(0,i.jsx)(n.a,{href:"https://trandanhhoang.github.io/docs/java-springboot/kafka-with-java-springboot-example",children:"kafka-springboot"}),"\nv\xe0 th\xeam v\xe0o \u1ea3nh c\u1ee7a debezium"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"version: '3.8'\nname: spring-self-learn\nservices:\n  zookeeper:\n    container_name: local-zookeeper\n    image: 'zookeeper:latest'\n    ports:\n      - '2181:2181'\n    environment:\n      - ZOOKEEPER_CLIENT_PORT=2181\n      - ALLOW_ANONYMOUS_LOGIN=yes\n  kafka:\n    image: 'bitnami/kafka:latest'\n    ports:\n      - '29092:29092'\n      - '9092:9092'\n    environment:\n      - KAFKA_BROKER_ID=0\n      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181\n      - ALLOW_PLAINTEXT_LISTENER=yes\n      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=INTERNAL\n      - KAFKA_CFG_LISTENERS=PLAINTEXT_DEBEZIUM://:29092,PLAINTEXT_UI://:9091,PLAINTEXT://:9092,INTERNAL://kafka:9093\n      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT_DEBEZIUM://kafka:29092,PLAINTEXT_UI://kafka:9091,PLAINTEXT://localhost:9092,INTERNAL://kafka:9093\n      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT_DEBEZIUM:PLAINTEXT,INTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_UI:PLAINTEXT\n    depends_on:\n      - zookeeper\n  postgres:\n    image: postgres:15.5-alpine\n    restart: always\n    ports:\n      - \"5432:5432\"\n    environment:\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: postgres\n      POSTGRES_DB: local-transaction\n    command: ['postgres', '-c', 'wal_level=logical']\n    volumes:\n      - local-postgres-v15:/var/lib/postgresql/data\n  debezium:\n    image: quay.io/debezium/connect:2.4\n    ports:\n      - \"8083:8083\"\n    environment:\n      - BOOTSTRAP_SERVERS=kafka:29092\n      - GROUP_ID=1\n      - CONFIG_STORAGE_TOPIC=my_connect_configs\n      - OFFSET_STORAGE_TOPIC=my_connect_offsets\n      - STATUS_STORAGE_TOPIC=my_connect_statuses\n      - KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter\n      - VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter\n      - ENABLE_DEBEZIUM_SCRIPTING='true'\n    links:\n      - kafka\n      - postgres\n    depends_on:\n      - kafka\n    volumes:\n      - ./debezium-connector-postgres:/kafka/connect/debezium-connector-postgres\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["B\u01b0\u1edbc 2: b\u1ea1n s\u1ebd th\u1ea5y \u1edf tr\xean debezium d\xf9m 1 th\u01b0 m\u1ee5c, t\u1ea3i \u1edf trang c\u1ee7a debezium v\u1ec1, \u0111\u1eb7t v\xe0o th\u01b0 m\u1ee5c \u0111\xf3.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://debezium.io/documentation/reference/0.9/connectors/postgresql.html#connector-properties",children:"https://debezium.io/documentation/reference/0.9/connectors/postgresql.html#connector-properties"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["t\u1ea1i d\xf2ng ",(0,i.jsxs)(n.strong,{children:["Simply download the ",(0,i.jsx)(n.em,{children:"connector\u2019s plugin archive"})]}),", b\u1ea5m \u0111\u1ec3 t\u1ea3i"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Deploying a Connector\nIf you\u2019ve already installed Zookeeper, Kafka, and Kafka Connect, then using Debezium\u2019s PostgreSQL connector is easy. Simply download the connector\u2019s plugin archive, extract the JARs into your Kafka Connect environment, and add the directory with the JARs to Kafka Connect\u2019s classpath. Restart your Kafka Connect process to pick up the new JARs.\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Gi\u1ea3i n\xe9n v\xe0 b\u1ecf v\xe0o th\u01b0 m\u1ee5c c\xf9ng c\u1ea5p v\u1edbi docker-compose.yaml"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"B\u01b0\u1edbc 3: ch\u1ea1y docker-compose up -d"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Sau khi ch\u1ea1y xong th\xec c\xf3 th\u1ec3 b\u1ea1n s\u1ebd g\u1eb7p l\u1ed7i, check log c\u1ee7a debezium v\xe0 fix tu\u1ef3 v\xe0o l\u1ed7i c\u1ee7a b\u1ea1n (trong qu\xe1 tr\xecnh l\xe0m th\xec m\xecnh c\u0169ng g\u1eb7p nhi\u1ec1u l\u1ed7i n\xean kh\xf4ng th\u1ec3 cover h\u1ebft \u0111\u01b0\u01a1c)","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Ch\u1eb3ng h\u1ea1n m\xecnh g\u1eb7p l\u1ed7i \"Error while validating connector config: Postgres server wal_level property must be 'logical' but is: 'replica\"","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:['v\xe0 fix n\xf3 b\u1eb1ng config "command: ',(0,i.jsx)(n.code,{children:"['postgres', '-c', 'wal_level=logical']"}),'", b\u1ea1n s\u1ebd th\u1ea5y trong b\xe0i kafka c\u0169, postgres c\u1ee7a m\xecnh kh\xf4ng c\xf3 config n\xe0y.']}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"B\u01b0\u1edbc 4: ki\u1ec3m tra debezium \u0111\xe3 ch\u1ea1y oke ch\u01b0a ?"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:['curl -H "Accept',":application",'/json" localhost:8083',"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:'return: {"version":"3.5.1","commit":"2c6fb6c54472e90a","kafka_cluster_id":"O2A4SDzGSBm2imCPXv7rNA"}%'})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:['curl -H "Accept',":application",'/json" localhost:8083/connectors/',"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["return: ",(0,i.jsx)(n.code,{children:"[]%"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"B\u01b0\u1edbc 5: c\u1ea5u h\xecnh connector, c\xe1i n\xe0y b\u1ea1n h\xe3y t\u1ef1 t\u1ea1o database v\xe0 table, config l\u1ea1i n\u1ebfu c\u1ea7n."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "name": "fulfillment-connector",\n  "config": {\n    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",\n    "tasks.max": "1",\n    "database.hostname": "postgres",\n    "database.port": "5432",\n    "database.user": "postgres",\n    "database.password": "postgres",\n    "topic.prefix": "fulfillment",\n    "database.dbname" : "kafka-binlog",  -> database\n    "table.include.list": "public.kafka_binlog", -> table\n    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",\n    "schema.history.internal.kafka.topic": "schema-changes.inventory"\n  }\n}\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["B\u01b0\u1edbc 6: ki\u1ec3m tra debezium l\u1ea7n n\u1eefa","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:['curl -H "Accept',":application",'/json" localhost:8083/connectors/']}),"\n",(0,i.jsxs)(n.li,{children:["return: ",(0,i.jsx)(n.code,{children:'["fulfillment-connector"]'}),"%"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["B\u01b0\u1edbc 7: \u0110\u1ecdc log c\u1ee7a debezium","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:['L\xfac n\xe0y b\u1ea1n c\xf3 th\u1ec3 g\u1eb7p l\u1ed7i "debezium could not access file "decoderbufs" using postgres 11 with default plug"',"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'fix b\u1eb1ng c\xe1ch th\xeam config "plugin.name=pgoutput" v\xe0o connector'}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://stackoverflow.com/questions/59978213/debezium-could-not-access-file-decoderbufs-using-postgres-11-with-default-plug",children:"https://stackoverflow.com/questions/59978213/debezium-could-not-access-file-decoderbufs-using-postgres-11-with-default-plug"})}),"\n",(0,i.jsx)(n.li,{children:"L\u1ed7i cho vui ch\u1ee9 ch\u1ea1y \u0111\xfang mi\u1ebft ch\xe1n."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"N\u1ebfu ch\u1ea1y oke, c\xe1c b\u1ea1n c\xf3 th\u1ec3 th\u1ea5y nh\u1eefng d\xf2ng log n\xe0y"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"2023-12-27 09:36:20,830 INFO   Postgres|fulfillment|streaming  Connection gracefully closed   [io.debezium.jdbc.JdbcConnection]\n2023-12-27 09:36:20,847 INFO   Postgres|fulfillment|streaming  Requested thread factory for connector PostgresConnector, id = fulfillment named = keep-alive   [io.debezium.util.Threads]\n2023-12-27 09:36:20,848 INFO   Postgres|fulfillment|streaming  Creating thread debezium-postgresconnector-fulfillment-keep-alive   [io.debezium.util.Threads]\n2023-12-27 09:36:20,853 INFO   Postgres|fulfillment|streaming  REPLICA IDENTITY for 'public.kafka_binlog' is 'DEFAULT'; UPDATE and DELETE events will contain previous values only for PK columns   [io.debezium.connector.postgresql.PostgresSchema]\n2023-12-27 09:36:20,853 INFO   Postgres|fulfillment|streaming  Searching for WAL resume position   [io.debezium.connector.postgresql.PostgresStreamingChangeEventSource]\n2023-12-27 09:36:21,334 WARN   ||  [Producer clientId=connector-producer-fulfillment-connector-0] Error while fetching metadata with correlation id 3 : {fulfillment.public.kafka_binlog=LEADER_NOT_AVAILABLE}   [org.apache.kafka.clients.NetworkClient]\n2023-12-27 09:36:21,502 WARN   ||  [Producer clientId=connector-producer-fulfillment-connector-0] Error while fetching metadata with correlation id 4 : {fulfillment.public.kafka_binlog=LEADER_NOT_AVAILABLE}   [org.apache.kafka.clients.NetworkClient]\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"B\u01b0\u1edbc 8: l\xean kafka-ui, n\u1ebfu b\u1ea1n gi\u1eef nguy\xean config th\xec n\xf3 \u1edf localhost:9090, b\u1ea1n s\u1ebd th\u1ea5y topic fulfillment.public.kafka_binlog"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"H\xe3y th\u1eed th\xeam 1 record v\xe0o database, b\u1ea1n s\u1ebd th\u1ea5y message \u0111\u01b0\u1ee3c b\u1eafn l\xean kafka."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"V\u1eady l\xe0 \u0111\xe3 xong."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"demo",children:"DEMO"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Database c\xf3 10 record insert\n",(0,i.jsx)(n.img,{alt:"Database c\xf3 10 record insert",src:s(3597).Z+"",width:"974",height:"714"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Kafka c\xf3 10 message t\u01b0\u01a1ng \u1ee9ng\n",(0,i.jsx)(n.img,{alt:"Kafka c\xf3 10 message",src:s(3252).Z+"",width:"2972",height:"1440"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Xo\xe1 1 record trong database\n",(0,i.jsx)(n.img,{alt:"Xo\xe1 1 records",src:s(8714).Z+"",width:"1032",height:"690"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Kafka UI live c\xf3 th\xeam 2 message m\u1edbi\n",(0,i.jsx)(n.img,{alt:"Kafka nh\u1eadn 2 message m\u1edbi",src:s(7075).Z+"",width:"2610",height:"886"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["So s\xe1nh th\u1eed message insert v\xe0 message delete\n",(0,i.jsx)(n.img,{alt:"so snh message",src:s(4985).Z+"",width:"2962",height:"1534"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Ch\xfang ta c\xf3 th\u1ec3 th\u1ea5y \u1edf tr\xean, d\xf9 c\xf3 2 message nh\u01b0ng ch\u1ec9 c\xf3 1 message c\xf3 gi\xe1 tr\u1ecb, message c\xf2n l\u1ea1i l\xe0 empty."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"V\u1eady n\xean khi b\u1ea1n \u0111\u1ecdc message t\u1eeb kafka, d\xf9ng value b\xean trong message \u0111\u1ec3 detect s\u1ef1 thay \u0111\u1ed5i c\u1ee7a DB"}),"\n",(0,i.jsx)(n.li,{children:"Nh\u01b0 tr\xean h\xecnh, ch\xfang ta s\u1ebd nh\xecn v\xe0o before v\xe0 after \u0111\u1ec3 bi\u1ebft data thay \u0111\u1ed5i nh\u01b0 th\u1ebf n\xe0o."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://debezium.io/documentation/reference/0.9/tutorial.html",children:"https://debezium.io/documentation/reference/0.9/tutorial.html"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/debezium/debezium-examples/blob/main/tutorial/docker-compose-postgres.yaml",children:"https://github.com/debezium/debezium-examples/blob/main/tutorial/docker-compose-postgres.yaml"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.iamninad.com/posts/docker-compose-for-your-next-debezium-and-postgres-project/",children:"https://www.iamninad.com/posts/docker-compose-for-your-next-debezium-and-postgres-project/"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://stackoverflow.com/questions/59978213/debezium-could-not-access-file-decoderbufs-using-postgres-11-with-default-plug",children:"https://stackoverflow.com/questions/59978213/debezium-could-not-access-file-decoderbufs-using-postgres-11-with-default-plug"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.infoq.com/presentations/data-streaming-kafka-debezium/",children:"https://www.infoq.com/presentations/data-streaming-kafka-debezium/"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8714:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/dbrm-e235f6add984bce21b76b21bda6df537.png"},3252:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/dbzm-5c2cab374b59b0bf7dc0e5a0f37df95e.png"},3597:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/dbzm2-ce821928f982610f6f83d0090f329fe5.png"},4985:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/dbzujson-98aa3d6869b22b362114bec7e10457e6.png"},7075:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/kafkalive-b3d58df4ad9d0ca3207bb9268f322b17.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>o});var i=s(7294);const t={},c=i.createContext(t);function o(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);