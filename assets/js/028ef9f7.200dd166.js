"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8532],{1837:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var i=e(5893),r=e(1151);const o={},c="Integration Test",a={id:"java-springboot/integration-test-v2",title:"Integration Test",description:"1. Introduction",source:"@site/docs/java-springboot/integration-test-v2.md",sourceDirName:"java-springboot",slug:"/java-springboot/integration-test-v2",permalink:"/docs/java-springboot/integration-test-v2",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"T\u1ed1i \u01b0u query jdbc khi migration database",permalink:"/docs/java-springboot/optimize-jdbc-query-when-migration-database"},next:{title:"Getting Started",permalink:"/docs/intro"}},s={},l=[{value:"1. Introduction",id:"1-introduction",level:2},{value:"2. C\u1ea5u tr\xfac project \u0111\u1ec3 tham chi\u1ebfu",id:"2-c\u1ea5u-tr\xfac-project-\u0111\u1ec3-tham-chi\u1ebfu",level:2},{value:"3. C\u1ea5u h\xecnh cho integration test",id:"3-c\u1ea5u-h\xecnh-cho-integration-test",level:2},{value:"V\xed d\u1ee5 integration test v\u1edbi DB d\xf9ng H2Configuration",id:"v\xed-d\u1ee5-integration-test-v\u1edbi-db-d\xf9ng-h2configuration",level:3},{value:"C\u1ea5u h\xecnh ContextConfiguration",id:"c\u1ea5u-h\xecnh-contextconfiguration",level:3},{value:"C\u1ea5u h\xecnh cho class test ch\xednh.",id:"c\u1ea5u-h\xecnh-cho-class-test-ch\xednh",level:3}];function d(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"integration-test",children:"Integration Test"}),"\n",(0,i.jsx)(t.h2,{id:"1-introduction",children:"1. Introduction"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["B\xe0i n\xe0y t\xf4i s\u1ebd vi\u1ebft integration test cho 1 controllerV3 c\u1ee7a t\xf4i","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Ngh\u0129a l\xe0 ban \u0111\u1ea7u c\xf3 2 controller kh\xe1c, d\xf9ng c\xe1c service c\u0169, c\xe1c jdbc c\u0169."}),"\n",(0,i.jsx)(t.li,{children:"T\xf4i ch\u1ec9 mu\u1ed1n mock cho controllerV3, v\u1edbi c\xe1c service m\u1edbi, jdbc m\u1edbi, ... nh\u1eefng th\u1ee9 m\xe0 t\xf4i c\u1ea7n."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\xdd t\u01b0\u1edfng:","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"C\u1ea5u h\xecnh chu\u1ea9n Context."}),"\n",(0,i.jsx)(t.li,{children:"C\xe1c v\u1ea5n \u0111\u1ec1 xu\u1ea5t hi\u1ec7n trong qu\xe1 tr\xecnh c\u1ea5u h\xecnh s\u1ebd \u0111\u01b0\u1ee3c t\xf4i n\xf3i chi ti\u1ebft \u1edf c\xe1c ph\u1ea7n."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"2-c\u1ea5u-tr\xfac-project-\u0111\u1ec3-tham-chi\u1ebfu",children:"2. C\u1ea5u tr\xfac project \u0111\u1ec3 tham chi\u1ebfu"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-text",children:"+--main\n|  +--java\n|  |  +--controller\n|  |  |  +--GrpcV3Controller.java\n\n|  |  +--config\n|  |  |  +-- RedisConfig\n\n|  |  +--service\n|  |  |  +--ServiceA.class <--- Inject ServiceB.class, JdbcImplement.class, SomeServiceYouWantIgnore.class\n|  |  +--jdbc\n|  |  |  +--JdbcImplement.class <---- inject NamedParameterJdbcTemplate (H2MasterConfiguration will be replace default)\n\n+--test\n|  +--java\n|  |  +--H2MasterConfiguration.java\n"})}),"\n",(0,i.jsx)(t.h2,{id:"3-c\u1ea5u-h\xecnh-cho-integration-test",children:"3. C\u1ea5u h\xecnh cho integration test"}),"\n",(0,i.jsx)(t.h3,{id:"v\xed-d\u1ee5-integration-test-v\u1edbi-db-d\xf9ng-h2configuration",children:"V\xed d\u1ee5 integration test v\u1edbi DB d\xf9ng H2Configuration"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"B\u1ea1n c\xf3 th\u1ec3 b\u1ecf qua n\u1ebfu th\u1ea5y ko c\u1ea7n thi\u1ebft."}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:'import javax.sql.DataSource;\nimport lombok.Data;\nimport org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.boot.jdbc.DataSourceBuilder;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;\nimport org.springframework.jdbc.datasource.SimpleDriverDataSource;\nimport org.springframework.transaction.annotation.EnableTransactionManagement;\n\n@Data\n@Configuration\n@EnableTransactionManagement\npublic class H2MasterConfiguration {\n\n  @Bean("datasource")\n  public DataSource getMasterDataSource() {\n    var dataSourceBuilder = DataSourceBuilder.create();\n    dataSourceBuilder.driverClassName("org.h2.Driver");\n    dataSourceBuilder.url("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1");\n    dataSourceBuilder.username("SA");\n    dataSourceBuilder.password("");\n    return dataSourceBuilder.type(SimpleDriverDataSource.class).build();\n  }\n\n  @Bean("jdbc")\n  public NamedParameterJdbcTemplate getMasterNamedJdbcTemplate(\n      @Qualifier("datasource") DataSource dataSource) {\n    return new NamedParameterJdbcTemplate(dataSource);\n  }\n}\n'})}),"\n",(0,i.jsx)(t.h3,{id:"c\u1ea5u-h\xecnh-contextconfiguration",children:"C\u1ea5u h\xecnh ContextConfiguration"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"B\u1ea1n c\u1ea7n ph\u1ea3i x\xe1c \u0111\u1ecbnh c\xe1c class c\u1ea7n inject v\xe0o context."}),"\n",(0,i.jsxs)(t.li,{children:["V\xed d\u1ee5 code tr\u1ef1c quan b\xean d\u01b0\u1edbi, b\u1ea1n c\xf3 th\u1ec3 th\u1ea5y,","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"@Import t\xf4i \u0111\u1ec3 GrpcV3Controller, inject ServiceA, n\xean t\xf4i khai b\xe1o serviceA."}),"\n",(0,i.jsx)(t.li,{children:"serviceA d\xf9ng JdbcImplement, Inject b\u1edfi H2MasterConfiguration.class c\u0169ng \u0111\u01b0\u1ee3c khai b\xe1o."}),"\n",(0,i.jsxs)(t.li,{children:["SpringBoot s\u1ebd c\u1ed1 g\u1eafng t\u1ea1o Bean cho c\xe1c class n\xe0y theo h\u01b0\u1edbng bottom-up, v\xed d\u1ee5:","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"file yaml \u0111\u1ec3 t\u1ea1o RedisConfig -> t\u1ea1o RedisTemplate.class -> t\u1ea1o Service."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["T\xf4i g\u1eb7p v\u1ea5n \u0111\u1ec1 \u1edf b\u01b0\u1edbc n\xe0y, khi l\u01b0\u1eddi, t\xf4i \u0111\xe3 s\u1eed d\u1ee5ng @ComponentScan \u0111\u1ec3 qu\xe9t to\xe0n b\u1ed9 package v3,","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"n\u1ebfu b\u1ea1n nh\u1edb ng\u1eef c\u1ea3nh ban \u0111\u1ea7u c\u1ee7a t\xf4i l\xe0 vi\u1ebft cho service v3, th\xec th\u1ef1c ra khi vi\u1ebft service hay jdbc, t\xf4i c\xf3 b\u1ecf ch\xfang v\xe0o folder v3."}),"\n",(0,i.jsx)(t.li,{children:"Nh\u01b0ng khi t\xf4i d\xf9ng @ComponentScan \u0111\u1ec3 qu\xe9t, thay v\xec @Import t\u1eebng c\xe1i m\xecnh c\u1ea7n, v\xe0 @MockBean nh\u1eefng th\u1ee9 m\xecnh ko c\u1ea7n, th\xec v\u1ea5n \u0111\u1ec1 \u0111\xe3 x\u1ea3y ra."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"V\u1ea5n \u0111\u1ec1"}),":","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:'nh\u01b0 v\xed d\u1ee5 tr\xean: flow t\xf4i c\xf3 l\xe0 "file yaml \u0111\u1ec3 t\u1ea1o RedisConfig -> t\u1ea1o RedisTemplate.class -> t\u1ea1o ServiceA.class"'}),"\n",(0,i.jsx)(t.li,{children:"Nh\u01b0ng khi ch\u1ea1y, RedisConfig \u0111\u01b0\u1ee3c kh\u1edfi t\u1ea1o \u0111\u1ea7u ti\xean, nh\u01b0ng ngay l\u1eadp t\u1ee9c ServiceA.class \u0111\u01b0\u1ee3c t\u1ea1o v\xe0 n\xf3 t\u1ef1 inject RedisTemplate.class l\xe0 1 MockitoMock, ch\u1ee9 n\xf3 ko \u0111\u1ee3i t\u1ea1o xong m\u1edbi inject v\xe0o sau."}),"\n",(0,i.jsx)(t.li,{children:"T\xf4i ngh\u0129 c\xf3 th\u1ec3 v\xec c\xe1ch m\xe0 t\xf4i inject v\xe0o service \u0111ang kh\xf4ng \u0111\u01b0\u1ee3c t\u1ed1t, qu\xe1 nhi\u1ec1u, c\xf3 kh\xe1 nhi\u1ec1u th\u1ee9 t\xf4i MockBean, v\xe0 nh\u1eefng th\u1ee9 \u0111\xf3 d\u1eabn t\u1edbi l\u1ed7i n\xe0y."}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"N\xean t\xf4i th\u1ea5y b\u1ea1n n\xean c\u1ea9n th\u1eadn khi s\u1eed d\u1ee5ng @ComponentScan, n\u1ebfu c\xf3 th\u1ec3, h\xe3y s\u1eed d\u1ee5ng @Import, @MockBean \u0111\u1ec3 qu\u1ea3n l\xfd t\u1ed1t h\u01a1n."})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:'@Import({RedisConfig.class, H2MasterConfiguration.class,\n     GrpcV3Controller.class, ServiceA.class})\n@ComponentScan(basePackages = {\n    "zalopay.pe.authentication.payment.config",\n    "zalopay.pe.authentication.payment.domain",\n})\n@TestConfiguration\npublic class TestConfig {\n\n  @MockBean\n  private SomeServiceYouWantIgnore someServiceYouWantIgnore;\n\n}\n'})}),"\n",(0,i.jsx)(t.h3,{id:"c\u1ea5u-h\xecnh-cho-class-test-ch\xednh",children:"C\u1ea5u h\xecnh cho class test ch\xednh."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Annotation @RunWith(SpringRunner.class) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng n\u1ebfu b\u1ea1n d\xf9ng Junit4"}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Annotation ExtendWith(SpringExtension.class) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng n\u1ebfu b\u1ea1n d\xf9ng Junit5"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"T\xf4i \u0111\u1ecdc tr\xean m\u1ea1ng th\u1ea5y th\u1ebf, n\xean n\u1ebfu b\u1ea1n d\xf9ng JUnit5 th\xec h\xe3y th\u1eed."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Annotation @SqlGroup, v\xe0 @SQl d\xf9ng cho H2MasterConfiguration.class. B\u1ea1n c\xf3 th\u1ec3 b\u1ecf qua."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"@EnableAutoConfiguration \u0111\u1ec3 \u0111\u1ecdc c\u1ea5u h\xecnh t\u1eeb application.properties, application.yml, ..."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Note"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Annotation @SpringBootTest t\u1ea1o to\xe0n b\u1ed9 ng\u1eef c\u1ea3nh -> ko x\u1eed d\u1ee5ng trong tr\u01b0\u1eddng h\u1ee3p n\xe0y."}),"\n",(0,i.jsx)(t.li,{children:"@Testcontainers(disabledWithoutDocker = true) n\xe0y d\xf9ng v\u1edbi Testcontainers, b\u1ea1n th\u1ea5y c\u1ea7n thi\u1ebft th\xec l\xean m\u1ea1ng \u0111\u1ecdc."}),"\n",(0,i.jsx)(t.li,{children:"h\xe0m redisProperties() d\xf9ng \u0111\u1ec3 c\u1ea5u h\xecnh l\u1ea1i bi\u1ebfn m\xf4i tr\u01b0\u1eddng cho redis, v\xe0 \u0111\u1ea3m b\u1ea3o redis (d\xf9ng testcontainer) \u0111\u01b0\u1ee3c start tr\u01b0\u1edbc khi test ch\u1ea1y."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:'import static org.junit.Assert.assertEquals;\nimport static org.junit.Assert.assertFalse;\nimport static org.junit.Assert.assertNotNull;\nimport static org.mockito.ArgumentMatchers.any;\nimport static org.mockito.Mockito.verify;\nimport static org.powermock.api.mockito.PowerMockito.when;\nimport static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;\nimport static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;\n\nimport java.util.List;\nimport org.junit.Test;\nimport org.junit.runner.RunWith;\nimport org.mockito.ArgumentCaptor;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.autoconfigure.EnableAutoConfiguration;\nimport org.springframework.boot.test.mock.mockito.MockBean;\nimport org.springframework.test.context.ContextConfiguration;\nimport org.springframework.test.context.DynamicPropertyRegistry;\nimport org.springframework.test.context.DynamicPropertySource;\nimport org.springframework.test.context.jdbc.Sql;\nimport org.springframework.test.context.jdbc.SqlGroup;\nimport org.springframework.test.context.junit4.SpringRunner;\nimport org.testcontainers.containers.GenericContainer;\nimport org.testcontainers.junit.jupiter.Container;\nimport org.testcontainers.junit.jupiter.Testcontainers;\nimport org.testcontainers.utility.DockerImageName;\n\n@SqlGroup({\n@Sql(value = "classpath:db/schema.sql", executionPhase = BEFORE_TEST_METHOD),\n@Sql(value = "classpath:db/reset.sql", executionPhase = AFTER_TEST_METHOD),\n})\n@ContextConfiguration(classes = {TestConfig.class})\n@RunWith(SpringRunner.class)\n@Testcontainers(disabledWithoutDocker = true)\n@EnableAutoConfiguration\npublic class FullFlowTest {\n\n  @Autowired\n  private GrpcV3Controller grpcV3Controller;\n\n  @Container\n  static final GenericContainer REDIS =\n      new GenericContainer(DockerImageName.parse("redis:7.2.4-alpine")).withExposedPorts(6379);\n\n  @DynamicPropertySource\n  static final void redisProperties(DynamicPropertyRegistry env) {\n    REDIS.start();\n    env.add("redis.redisNodes",\n        () -> List.of("redis://" + REDIS.getHost() + ":" + REDIS.getFirstMappedPort()));\n  }\n\n  @MockBean\n  private ApiMock apiMock;\n  \n  // s\u1eed d\u1ee5ng grpcV3Controller \u0111\u1ec3 test full flow.\n  private void runPreparePaymentAuth() {\n    // given\n    var request = new Request();\n    // when\n    when(apiMock.foo(any())).thenReturn(bar);\n\n    // trigger\n    var res = grpcV3Controller.fooo(request);\n    //then\n    assertNotNull(res); \n  }\n}\n'})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-pom",children:"<dependency>\n  <groupId>com.h2database</groupId>\n  <artifactId>h2</artifactId>\n  <scope>test</scope>\n</dependency>\n\n<dependency>\n  <groupId>org.testcontainers</groupId>\n  <artifactId>testcontainers</artifactId>\n  <version>1.20.1</version>\n  <scope>test</scope>\n</dependency>\n\n<dependency>\n  <groupId>org.testcontainers</groupId>\n  <artifactId>junit-jupiter</artifactId>\n  <version>1.20.1</version>\n  <scope>test</scope>\n</dependency>\n"})})]})}function h(n={}){const{wrapper:t}={...(0,r.a)(),...n.components};return t?(0,i.jsx)(t,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},1151:(n,t,e)=>{e.d(t,{Z:()=>a,a:()=>c});var i=e(7294);const r={},o=i.createContext(r);function c(n){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function a(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),i.createElement(o.Provider,{value:t},n.children)}}}]);