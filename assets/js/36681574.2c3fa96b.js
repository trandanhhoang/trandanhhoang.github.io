"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5941],{2172:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var i=t(4848),a=t(8453);const r={sidebar_position:1},o="T\u1ef1 vi\u1ebft 1 library v\u1edbi annotation, reflection, aop, springboot",l={id:"java-springboot/how-to-write-library-with-java-springboot",title:"T\u1ef1 vi\u1ebft 1 library v\u1edbi annotation, reflection, aop, springboot",description:"Prerequisites",source:"@site/docs/java-springboot/how-to-write-library-with-java-springboot.md",sourceDirName:"java-springboot",slug:"/java-springboot/how-to-write-library-with-java-springboot",permalink:"/docs/java-springboot/how-to-write-library-with-java-springboot",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Springboot",permalink:"/docs/category/springboot"},next:{title:"T\u1ed1i \u01b0u query jdbc khi migration database",permalink:"/docs/java-springboot/optimize-jdbc-query-when-migration-database"}},s={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Github",id:"github",level:2},{value:"T\xf3m t\u1eaft",id:"t\xf3m-t\u1eaft",level:2},{value:"Project structure",id:"project-structure",level:2},{value:"Hi\u1ec7n th\u1ef1c",id:"hi\u1ec7n-th\u1ef1c",level:2},{value:"T\u1ea1o spi",id:"t\u1ea1o-spi",level:3},{value:"T\u1ea1o c\xe1c interface t\u01b0\u01a1ng \u1ee9ng b\xean tr\xean",id:"t\u1ea1o-c\xe1c-interface-t\u01b0\u01a1ng-\u1ee9ng-b\xean-tr\xean",level:4},{value:"T\u1ea1o annotation",id:"t\u1ea1o-annotation",level:3},{value:"T\u1ea1o bean spring",id:"t\u1ea1o-bean-spring",level:3},{value:"c\xe1c implement default",id:"c\xe1c-implement-default",level:4},{value:"T\u1ea1o AOP",id:"t\u1ea1o-aop",level:3},{value:"build.gradle",id:"buildgradle",level:3},{value:"How to run",id:"how-to-run",level:2},{value:"Gi\u1ea3i th\xedch chi ti\u1ebft",id:"gi\u1ea3i-th\xedch-chi-ti\u1ebft",level:2},{value:"IdempotentEngineRegistry",id:"idempotentengineregistry",level:3},{value:"Demo",id:"demo",level:2},{value:"Improve th\u01b0 vi\u1ec7n tr\xean",id:"improve-th\u01b0-vi\u1ec7n-tr\xean",level:2}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"t\u1ef1-vi\u1ebft-1-library-v\u1edbi-annotation-reflection-aop-springboot",children:"T\u1ef1 vi\u1ebft 1 library v\u1edbi annotation, reflection, aop, springboot"})}),"\n",(0,i.jsx)(e.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Annotation"}),"\n",(0,i.jsx)(e.li,{children:"Reflection"}),"\n",(0,i.jsx)(e.li,{children:"Aop (Aspect Oriented Programming)"}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"github",children:"Github"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"https://github.com/trandanhhoang/check-duplicate",children:"https://github.com/trandanhhoang/check-duplicate"})}),"\n",(0,i.jsx)(e.h2,{id:"t\xf3m-t\u1eaft",children:"T\xf3m t\u1eaft"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"H\u01b0\u1edbng d\u1eabn vi\u1ebft 1 th\u01b0 vi\u1ec7n c\u01a1 b\u1ea3n d\xf9ng annotation, reflection, aop, springboot."}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"M\u1ee5c \u0111\xedch: check idempotent c\u1ee7a 1 api controller d\u1ef1a tr\xean request param (tr\xe1nh b\u1ecb duplicate request trong 1 kho\u1ea3ng th\u1eddi gian)"}),"\n",(0,i.jsx)(e.li,{children:"C\xe1ch ho\u1ea1t \u0111\u1ed9ng: Khi request t\u1edbi, t\u1eeb param ch\xfang ta s\u1ebd t\u1ea1o \u0111\u01b0\u1ee3c key \u0111\u1ec3 ki\u1ec1m tra li\u1ec7u c\xf3 b\u1ecb duplicate request kh\xf4ng, n\u1ebfu key \u0111\xe3 t\u1ed3n t\u1ea1i th\xec tr\u1ea3 v\u1ec1 l\u1ed7i, n\u1ebfu ch\u01b0a th\xec l\u01b0u key v\xe0 ti\u1ebfp t\u1ee5c x\u1eed l\xfd request."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Th\xe0nh ph\u1ea7n quan tr\u1ecdng:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Class IdempotantEngine:","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u0110\xe2y l\xe0 1 SPI (System Programming Interface) ch\u1ec9 ch\u1ee9a c\xe1c interface, ch\u1ee9a c\xe1c logic c\u01a1 b\u1ea3n \u0111\u1ec3 l\u01b0u key, check idempotent, tr\u1ea3 l\u1ed7i."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Annotation Idempotent:","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u0110\xe1nh d\u1ea5u tr\xean method c\u1ee7a Controller, ch\u1ee9a c\xe1c th\xf4ng tin c\u1ea7n thi\u1ebft \u0111\u1ec3 t\u1ea1o ra IdempotentEngine t\u01b0\u01a1ng \u1ee9ng."}),"\n",(0,i.jsx)(e.li,{children:"\u0110\u01b0\u1ee3c g\u1ecdi th\xf4ng qua AOP, m\u1ed7i khi method c\u1ee7a Controller \u0111\u01b0\u1ee3c g\u1ecdi, ch\xfang ta s\u1ebd ki\u1ebfm 1 IdempotentEngine \u0111\u1ec3 check idempotent."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"V\xed d\u1ee5 IdempotentEngine:"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Interface IdempotentEngine s\u1ebd c\xf3 method execute c\u1ea7n \u0111\u01b0\u1ee3c implement v\u1edbi c\xe1c interface kh\xe1c nh\u01b0 IdempotentKeyResolver, IdempotentPersistant, IdempotentHandler."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'public class SimpleIdempotentEngine implements IdempotentEngine {\n  private final IdempotentKeyResolver idempotentKeyResolver;\n  private final IdempotentPersistant idempotentPersistant;\n  private final IdempotentHandler idempotentHandler;\n\n  @Override\n  public Object execute(Object[] args) {\n    // get key \n    String key = idempotentKeyResolver.resolve(args);\n    boolean successfullyPersisted = idempotentPersistant.save(key);\n    // save key\n    if (successfullyPersisted) {\n      System.out.println("Successfully acquired idempotent key");\n      return null;\n    }\n    System.out.println("Idempotence detected");\n    // handle exception\n    return idempotentHandler.handle(args);\n  }\n}\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"V\xed d\u1ee5 c\xe1ch d\xf9ng Annotation"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'    @Idempotent(id = "id1",\n            expression = @Expression(\n                    index = 1,\n                    clazz = Request.class,\n                    field = "name"\n            ),\n            handle = @Handle(\n                    handler = CustomIdempotentHandler.class\n            )\n    )\n    public void idempotent(String params1, Request request) {\n    }\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\xdd ngh\u0129a c\u1ee7a Annotation tr\xean:","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["id: ch\xfang ta s\u1ebd t\u1ea1o ra 1 ",(0,i.jsx)(e.code,{children:"Map<String,IdempotantEngine>"}),"v\u1edbi key l\xe0 id \u0111\u1ec3 l\u1ea5y ra engine c\u1ea7n thi\u1ebft."]}),"\n",(0,i.jsxs)(e.li,{children:['expression: \u0111\u1ec3 x\xe1c \u0111\u1ecbnh key t\u1eeb request s\u1ebd l\u1ea5y t\u1eeb index = 1, clazz = Request.class, field = "name"',"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:'Trong request c\xf3 2 field, index = 1 ngh\u0129a l\xe0 l\u1ea5y field th\u1ee9 2, clazz = Request.class + field="name" \u0111\u1ec3 l\u1ea5y field b\u1eb1ng reflection.'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["handle: @Handle(handlerClass = CustomIdempotentHandler.class))","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"l\xe0 1 class implement interface IdempotentHandler, ch\xfang ta c\xf3 th\u1ec3 tu\u1ef3 bi\u1ebfn logic handle exception \u1edf \u0111\xe2y, c\xf3 th\u1ec3 throw, log, kh\xf4ng ph\u1ee5 thu\u1ed9c v\xe0o th\u01b0 vi\u1ec7n"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"C\xe1c class b\u1ed5 sung context b\xean tr\xean"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public class Request {\n    String name;\n    Integer age;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'public class CustomIdempotentHandler implements IdempotentHandler {\n    public CustomIdempotentHandler() {\n    }\n\n    public Object handle(Object[] args) {\n        System.out.println("do anything u want");\n        throw new RuntimeException("idempotent detected");\n    }\n}\n'})}),"\n",(0,i.jsx)(e.h2,{id:"project-structure",children:"Project structure"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{alt:"Project structure",src:t(3403).A+"",width:"558",height:"804"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["spi: logic ch\xednh c\u1ee7a th\u01b0 vi\u1ec7n","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"ch\u1ee9a class SimpleIdempotentEngine, implementation logic code c\u01a1 b\u1ea3n \u0111\u1ec3 l\u01b0u key, check idempotent, tr\u1ea3 l\u1ed7i."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["annotation: ch\u1ee9a class annotation Idempotent \u0111\u1ec3 \u0111\xe1nh d\u1ea5u tr\xean method c\u1ee7a controller, v\xe0 class annotation con (Handle, Expression) c\u1ee7a n\xf3.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["annotation con gi\xfap ch\xfang ta thay \u0111\u1ed5i c\u01a1 ch\u1ebf:","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"persistant key b\u1eb1ng redis ho\u1eb7c database."}),"\n",(0,i.jsx)(e.li,{children:"resolve key b\u1eb1ng reflection c\u01a1 b\u1ea3n ho\u1eb7c Spel n\xe2ng cao."}),"\n",(0,i.jsx)(e.li,{children:"handler s\u1ebd throw exception ho\u1eb7c ch\u1ec9 \u0111\u01a1n gi\u1ea3n l\xe0 log."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["spring: class IdempotentConstructor \u0111\u1ec3 t\u1ea1o c\xe1c bean c\u1ee7a spi.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u1ee8ng v\u1edbi m\u1ed7i method s\u1ebd c\xf3 1 bean ri\xeang bi\u1ec7t \u0111\u01b0\u1ee3c t\u1ea1o ra (V\xec c\xe1ch l\u1ea5y key, l\u01b0u key, handle exception l\xe0 kh\xe1c nhau gi\u1eefa c\xe1c method)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["aop: logic aop \u0111\u1ec3 g\u1ecdi ch\xednh x\xe1c spi d\u1ef1a tr\xean annotation","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"ch\u1ee9a class IdempotentAop \u0111\u1ec3 x\xe1c \u0111\u1ecbnh th\u1eddi \u0111i\u1ec3m check idempotent."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"hi\u1ec7n-th\u1ef1c",children:"Hi\u1ec7n th\u1ef1c"}),"\n",(0,i.jsx)(e.h3,{id:"t\u1ea1o-spi",children:"T\u1ea1o spi"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'public class SimpleIdempotentEngine implements IdempotentEngine {\n\n  private final IdempotentKeyResolver idempotentKeyResolver;\n  private final IdempotentPersistant idempotentPersistant;\n  private final IdempotentHandler idempotentHandler;\n\n  public SimpleIdempotentEngine(IdempotentKeyResolver idempotentKeyResolver, IdempotentPersistant idempotentPersistant, IdempotentHandler idempotentHandler) {\n    this.idempotentKeyResolver = idempotentKeyResolver;\n    this.idempotentPersistant = idempotentPersistant;\n    this.idempotentHandler = idempotentHandler;\n  }\n\n  @Override\n  public Object execute(Object[] args) {\n    String key = idempotentKeyResolver.resolve(args);\n    boolean successfullyPersisted = idempotentPersistant.save(key);\n    if (successfullyPersisted) {\n      System.out.println("Successfully acquired idempotent key");\n      return null;\n    }\n    System.out.println("Idempotence detected");\n    return idempotentHandler.handle(args);\n  }\n}\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Gi\u1ea3i th\xedch:","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["M\u1ee5c \u0111\xedch d\xf9ng interface \u0111\u1ec3 ch\xfang ta c\xf3 th\u1ec3 d\u1ec5 d\xe0ng thay \u0111\u1ed5i implement logic code b\xean trong.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"IdempotentKeyResolver \u0111\u1ec3 l\u1ea5y key t\u1eeb c\xe1c field c\u1ee7a request."}),"\n",(0,i.jsx)(e.li,{children:"idempotentKeyResolver \u0111\u1ec3 l\u1ea5y l\u01b0u key v\xe0o redis, ho\u1eb7c database."}),"\n",(0,i.jsx)(e.li,{children:"IdempotentHandler \u0111\u1ec3 throw exception ho\u1eb7c ch\u1ec9 \u0111\u01a1n gi\u1ea3n l\xe0 log."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h4,{id:"t\u1ea1o-c\xe1c-interface-t\u01b0\u01a1ng-\u1ee9ng-b\xean-tr\xean",children:"T\u1ea1o c\xe1c interface t\u01b0\u01a1ng \u1ee9ng b\xean tr\xean"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public interface IdempotentEngine {\n  void execute(Object[] args);\n}\npublic interface IdempotentKeyResolver {\n  String resolve(Object[] args);\n}\npublic interface IdempotentHandler {\n  Object handle(Object[] args);\n}\npublic interface idempotentPersistant {\n  boolean save(String key);\n}\n"})}),"\n",(0,i.jsx)(e.h3,{id:"t\u1ea1o-annotation",children:"T\u1ea1o annotation"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Annotation Idempotent: s\u1ebd l\xe0 annotation ch\xednh."}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"@Target(java.lang.annotation.ElementType.METHOD)\n@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)\npublic @interface Idempotent {\n  String id();\n  Expression expression();\n  Class<? extends IdempotentPersistant> persistent() default IdempotentPersistantImpl.class;\n  Handle handle() default @Handle;\n}\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"id: s\u1ebd \u0111\u01b0\u1ee3c d\xf9ng l\xe0m key \u0111\u1ec3 l\u1ea5y ra IdempotentEngine t\u01b0\u01a1ng \u1ee9ng t\u1eeb IdempotentEngineRegistry"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Expression(index, clazz, field): s\u1ebd \u0111\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 l\u1ea5y ra key t\u1eeb request"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"persistent: s\u1ebd \u0111\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 l\u01b0u key v\xe0o redis, ho\u1eb7c database, m\u1eb7c \u0111\u1ecbnh s\u1ebd l\xe0 IdempotentPersistantImpl (xem annotation b\xean d\u01b0\u1edbi)"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"handle: s\u1ebd \u0111\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 thay \u0111\u1ed5i logic handle exception, m\u1eb7c \u0111\u1ecbnh s\u1ebd l\xe0 IdempotentHandlerImpl (xem annotation b\xean d\u01b0\u1edbi)"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"C\xe1c annotation h\u1ed7 tr\u1ee3."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"@Target(ElementType.ANNOTATION_TYPE)\n@Retention(RetentionPolicy.RUNTIME)\npublic @interface Expression {\n  int index();\n  Class clazz();\n  String field();\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"@Target(ElementType.ANNOTATION_TYPE)\n@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)\npublic @interface Handle {\n\n  IdempotentStrategy strategy() default IdempotentStrategy.THROWING;\n  Class<? extends IdempotentHandler> handler() default IdempotentHandlerImpl.class;\n\n  enum IdempotentStrategy {\n    THROWING,\n    RETURNING,\n  }\n}\n\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"IdempotentHandlerImpl l\xe0 1 class implement IdempotentHandler, xem m\u1ee5c 'c\xe1c implement default'"}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"t\u1ea1o-bean-spring",children:"T\u1ea1o bean spring"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"class IdempotentConstructor s\u1ebd \u0111\u01b0\u1ee3c t\u1ea1o Bean b\u1eb1ng c\xe1ch d\xf9ng @Import trong project ch\xednh."}),"\n",(0,i.jsxs)(e.li,{children:["\u0110\xe2y s\u1ebd l\xe0 2 bean \u0111\u01b0\u1ee3c kh\u1edfi t\u1ea1o \u0111\u1ea7u ti\xean","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["idempotentEngineRegistry() s\u1ebd qu\xe9t c\xe1c bean trong project ch\xednh, t\u1ea1o ra 1 ",(0,i.jsx)(e.code,{children:"map<String, IdempotentEngine>"})," \u0111\u01b0\u1ee3c l\u01b0u trong IdempotentEngineRegistry."]}),"\n",(0,i.jsx)(e.li,{children:"createIdempotentAOP() s\u1ebd \u0111\u01b0\u1ee3c truy\u1ec1n v\xe0o IdempotentEngineRegistry, xem m\u1ee5c t\u1ea1o AOP b\xean d\u01b0\u1edbi \u0111\u1ec3 hi\u1ec3u r\xf5 h\u01a1n"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public class IdempotentConstructor {\n  @Bean\n  public IdempotentEngineRegistry idempotentEngineRegistry(BeanFactory beanFactory){\n    return new IdempotentEngineRegistry(beanFactory);\n  }\n\n  @Bean\n  public IdempotentAOP createIdempotentAOP(IdempotentEngineRegistry idempotentEngineRegistry) {\n    return new IdempotentAOP(idempotentEngineRegistry);\n  }\n}\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["class IdempotentEngineRegistry s\u1ebd l\xe0 n\u01a1i t\u1ea1o engine t\u1eeb c\xe1c th\xf4ng tin tr\xean annotation, sau \u0111\xf3 b\u1ecf v\xe0o ",(0,i.jsx)(e.code,{children:"Map<String, IdempotentEngine>"}),", IdempotentEngine s\u1ebd \u0111\u01b0\u1ee3c l\u1ea5y ra b\u1eb1ng AOP, m\u1ed7i khi method c\u1ee7a Controller \u0111\u01b0\u1ee3c g\u1ecdi."]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'import java.lang.annotation.Annotation;\nimport java.util.HashMap;\nimport java.util.Iterator;\nimport java.util.Map;\nimport java.util.Set;\nimport org.springframework.beans.factory.BeanFactory;\nimport org.springframework.beans.factory.annotation.AnnotatedBeanDefinition;\nimport org.springframework.beans.factory.config.AutowireCapableBeanFactory;\nimport org.springframework.beans.factory.config.BeanDefinition;\nimport org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;\nimport org.springframework.core.annotation.MergedAnnotation;\nimport org.springframework.core.type.AnnotationMetadata;\nimport org.springframework.core.type.MethodMetadata;\n\npublic class IdempotentEngineRegistry {\n  private final Map<String, IdempotentEngine> idempotentEngines = new HashMap<>();\n  private final AutowireCapableBeanFactory beanFactory;\n\n  public IdempotentEngineRegistry(BeanFactory beanFactory){\n    this.beanFactory = (AutowireCapableBeanFactory) beanFactory;\n    discoverEngines("com.example.idempotentlibrary.using");\n  }\n\n  private void discoverEngines(String packageToScan) {\n    final ClassPathScanningCandidateComponentProvider scanner =\n            new ClassPathScanningCandidateComponentProvider(true);\n\n    createEngineMap(packageToScan, scanner);\n  }\n\n  private void createEngineMap(\n          String packageToScan, ClassPathScanningCandidateComponentProvider scanner) {\n    Set<BeanDefinition> listBean = scanner.findCandidateComponents(packageToScan);\n\n    for (BeanDefinition beanDefinition : listBean) {\n      if (beanDefinition instanceof AnnotatedBeanDefinition) {\n        AnnotationMetadata annotationMetadata = ((AnnotatedBeanDefinition) beanDefinition).getMetadata();\n        Set<MethodMetadata> methodMetadatas = annotationMetadata.getAnnotatedMethods(Idempotent.class.getCanonicalName());\n        for (MethodMetadata methodMetadata : methodMetadatas) {\n          createEngineEntry(methodMetadata);\n        }\n      }\n    }\n  }\n\n  private void createEngineEntry(MethodMetadata methodMetadata) {\n    final MergedAnnotation<? extends Annotation> annotationMetadata =\n            methodMetadata.getAnnotations().get(Idempotent.class);\n    final IdempotentKeyResolver keyExtractor = resolveIdempotentKeyResolve(annotationMetadata);\n    final IdempotentPersistant idempotencePersistence = resolveIdempotentPersistant(annotationMetadata);\n    final IdempotentHandler idempotenceHandler = resolveIdempotentHandler(annotationMetadata.getAnnotation("handle", Handle.class));\n\n    idempotentEngines.put(annotationMetadata.getString("id"),new SimpleIdempotentEngine(keyExtractor\n            ,idempotencePersistence,idempotenceHandler));\n  }\n\n  private IdempotentKeyResolver resolveIdempotentKeyResolve(MergedAnnotation<? extends Annotation> idempotent){\n    MergedAnnotation mergedAnnotation = idempotent.getAnnotation("expression", Expression.class);\n    int index = mergedAnnotation.getInt("index");\n    Class clzz = mergedAnnotation.getClass("clazz");\n    String field = mergedAnnotation.getString("field");\n    return new IdempotentKeyResolverImpl(index, clzz, field);\n  }\n\n  private IdempotentPersistant resolveIdempotentPersistant(MergedAnnotation<? extends Annotation> idempotent){\n    return createBean(idempotent.getClass("persistent"));\n  }\n  private IdempotentHandler resolveIdempotentHandler(MergedAnnotation<? extends Annotation> handleAnnotation){\n\n    Handle.IdempotentStrategy strategy = handleAnnotation.getEnum("strategy", Handle.IdempotentStrategy.class);\n    if (THROWING.equals(strategy)){\n      return new IdempotentHandlerImpl();\n    }\n\n    return createBean(handleAnnotation.getClass("handler"));\n  }\n\n  @SuppressWarnings("unchecked")\n  private <T> T createBean(Class<?> clazz){\n    try{\n      return (T) beanFactory.getBean(clazz);\n    }catch(BeansException e){\n      return (T) beanFactory.createBean(clazz);\n    }\n  }\n\n  public IdempotentEngine get(String name) {\n    return idempotentEngines.get(name);\n  }\n\n}\n'})}),"\n",(0,i.jsx)(e.h4,{id:"c\xe1c-implement-default",children:"c\xe1c implement default"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public class IdempotentKeyResolverImpl implements IdempotentKeyResolver {\n    private int index;\n    private Class clzz;\n    private String field;\n\n    public IdempotentKeyResolverImpl(int index, Class clzz, String field) {\n        this.index = index;\n        this.field = field;\n        this.clzz = clzz;\n    }\n\n    public String resolve(Object[] args) {\n        try {\n            Field nameField = this.clzz.getDeclaredField(this.field);\n            nameField.setAccessible(true);\n            return (String)nameField.get(args[this.index]);\n        } catch (IllegalAccessException | NoSuchFieldException var3) {\n            throw new RuntimeException(var3);\n        }\n    }\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public class IdempotentPersistantImpl implements IdempotentPersistant {\n    private final RedisTemplate<String, String> redisTemplate;\n\n    public IdempotentPersistantImpl(\n            RedisTemplate<String, String> redisTemplate) {\n        this.redisTemplate = redisTemplate;\n    }\n    @Override\n    public boolean save(String key) {\n        final Boolean result = redisTemplate.opsForValue().setIfAbsent(key, key);\n\n        return Optional.ofNullable(result).orElse(false);\n    }\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'public class IdempotentHandlerImpl implements IdempotentHandler {\n\n    @Override\n    public Object handle(Object[] args) {\n        System.out.println("You can throw here an exception if you want to.");\n        return null;\n    }\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"t\u1ea1o-aop",children:"T\u1ea1o AOP"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"M\u1ee5c \u0111\xedch: ch\xfang ta s\u1ebd ch\u1ea1y method beforeIdempotentAnnotation m\u1ed7i khi method c\u1ee7a Controller \u0111\u01b0\u1ee3c g\u1ecdi (ch\u1ea1y tr\u01b0\u1edbc)."}),"\n",(0,i.jsxs)(e.li,{children:["IdempotentAop s\u1ebd ch\u1ee9a IdempotentEngineRegistry (ch\u1ee9a ",(0,i.jsx)(e.code,{children:"Map<String,IdempotentEngine>"}),"), \u0111\u1ec3 l\u1ea5y \u0111\xfang engine c\u1ea7n thi\u1ebft t\u1eeb id (l\u1ea5y t\u1eeb JoinPoint)"]}),"\n",(0,i.jsx)(e.li,{children:"JoinPoint l\xe0 1 kh\xe1i ni\u1ec7m c\u1ee7a AOP, c\xf3 th\u1ec3 l\u1ea5y ra c\xe1c data c\u1ea7n thi\u1ebft t\u1eeb method c\u1ee7a Controller."}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'@Aspect\npublic class IdempotentAOP {\n\n  private final IdempotentEngineRegistry idempotentEngineRegistry;\n  public IdempotentAOP(IdempotentEngineRegistry idempotentEngineRegistry){\n    this.idempotentEngineRegistry = idempotentEngineRegistry;\n  }\n\n  @Before("@annotation(com.example.idempotentlibrary.library.annotation.Idempotent)")\n  public Object before(JoinPoint joinPoint) {\n    MethodSignature signature = (MethodSignature)joinPoint.getSignature();\n    Idempotent annotation = signature.getMethod().getDeclaredAnnotation(Idempotent.class);\n    String key = annotation.id();\n    return idempotentEngineRegistry.get(key).execute(joinPoint.getArgs());\n  }\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"buildgradle",children:"build.gradle"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"dependencies {\n    implementation 'org.springframework.boot:spring-boot-starter'\n    implementation 'org.aspectj:aspectjweaver'\n    implementation 'org.aspectj:aspectjrt'\n    implementation 'org.springframework.boot:spring-boot-starter-data-redis'\n\n    compileOnly 'org.projectlombok:lombok'\n    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'\n    annotationProcessor 'org.projectlombok:lombok'\n}\n"})}),"\n",(0,i.jsx)(e.h2,{id:"how-to-run",children:"How to run"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'@Component\n@Import(IdempotentConfiguration.class)\npublic class IdemController {\n\n  @Idempotent(id = "id1",\n          expression = @Expression(\n                  index = 1,\n                  clazz = Request.class,\n                  field = "name"\n          ),\n          handle = @Handle(\n                  handler = CustomIdempotentHandler.class\n          )\n  )\n  public void idempotent(String params1, Request request) {\n  }\n}\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'@Component\npublic class Tester {\n  @Autowired\n  IdemController  idemController;\n  @PostConstruct\n  public void foo() throws InterruptedException {\n    idemController.idempotent("params1", new Request("hoang",23));\n  }\n}\n\n'})}),"\n",(0,i.jsx)(e.h2,{id:"gi\u1ea3i-th\xedch-chi-ti\u1ebft",children:"Gi\u1ea3i th\xedch chi ti\u1ebft"}),"\n",(0,i.jsx)(e.h3,{id:"idempotentengineregistry",children:"IdempotentEngineRegistry"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Ch\xfang ta d\xf9ng ClassPathScanningCandidateComponentProvider \u0111\u1ec3 scan c\xe1c bean c\xf3 trong package c\u1ee7a project ch\xednh.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:'\u1edf \u0111\xe2y \u0111ang hardcode d\xf9ng discoverEngines("com.example.idempotentlibrary.using");'}),"\n",(0,i.jsxs)(e.li,{children:["b\u1ea1n c\xf3 th\u1ec3 config trong file application.yml \u0111\u1ec3 tu\u1ef3 ch\u1ec9nh package c\u1ee7a c\xe1c b\u1ea1n, v\xed d\u1ee5","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:'@Value("${idempotence.spring.package-to-scan:com.example}") String packageToScan'}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["B\u1ea1n c\xf3 th\u1ec3 debug line by line \u0111\u1ec3 hi\u1ec3u r\xf5 h\u01a1n, trong method createEngineMap, ch\xfang ta s\u1ebd l\u1ea5y ra c\xe1c method c\xf3 annotation @Idempotent, sau \u0111\xf3 t\u1ea1o ra 1 IdempotentEngine t\u01b0\u01a1ng \u1ee9ng v\u1edbi m\u1ed7i method, v\xe0 b\u1ecf v\xe0o ",(0,i.jsx)(e.code,{children:"Map<String, IdempotentEngine>"}),".","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"H\u1ea7u h\u1ebft code ch\u1ec9 l\xe0 l\u1ea5y ra c\xe1c field t\u1eeb annotation, ch\u1ec9 c\xf3 1 \u0111i\u1ec3m \u0111\xe1ng ch\xfa \xfd l\xe0 d\xf9ng BeanFactory \u0111\u1ec3 getBean ho\u1eb7c createBean, \u0111\u1ec3 t\u1ea1o ra c\xe1c bean c\u1ea7n thi\u1ebft."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"demo",children:"Demo"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:['V\u1edbi l\u1ea7n ch\u1ea1y \u0111\u1ea7u ti\xean, b\u1ea1n s\u1ebd th\u1ea5y d\xf2ng log "Successfully acquired idempotent key"',"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:'check database, s\u1ebd c\xf3 1 key "hoang", value: "hoang"'}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"L\u1ea7n ch\u1ea1y th\u1ee9 2, b\u1ea1n s\u1ebd th\u1ea5y 2 d\xf2ng log"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Idempotence detected\nYou can throw here an exception if you want to.\n"})}),"\n",(0,i.jsx)(e.h2,{id:"improve-th\u01b0-vi\u1ec7n-tr\xean",children:"Improve th\u01b0 vi\u1ec7n tr\xean"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["IdempotentKeyResolver d\xf9ng SpEL \u0111\u1ec3 c\xf3 th\u1ec3 l\u1ea5y field t\u1eeb request params d\u1ec5 d\xe0ng h\u01a1n d\xf9ng reflection.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html",children:"https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html"})}),"\n"]}),"\n"]}),"\n"]})]})}function p(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},3403:(n,e,t)=>{t.d(e,{A:()=>i});const i=t.p+"assets/images/idempotent2-82cf38d88f0f233e03b548bd8250076b.png"},8453:(n,e,t)=>{t.d(e,{R:()=>o,x:()=>l});var i=t(6540);const a={},r=i.createContext(a);function o(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:o(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);