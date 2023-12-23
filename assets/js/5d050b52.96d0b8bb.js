"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5195],{4365:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>i,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var a=s(5893),c=s(1151);const t={sidebar_position:1},r="DynamicProxy",o={id:"java-basic/DynamicProxy",title:"DynamicProxy",description:"T\xf3m t\u1eaft",source:"@site/docs/java-basic/DynamicProxy.md",sourceDirName:"java-basic",slug:"/java-basic/DynamicProxy",permalink:"/docs/java-basic/DynamicProxy",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Java-core-basic",permalink:"/docs/category/java-core-basic"},next:{title:"Side effect th\xfa v\u1ecb c\u1ee7a invokeAll trong ExecutorService (Interrupted exception)",permalink:"/docs/java-basic/side-effect-of-invokeAll-executor"}},i={},l=[{value:"T\xf3m t\u1eaft",id:"t\xf3m-t\u1eaft",level:2},{value:"Code example",id:"code-example",level:2},{value:"\u1ee8ng d\u1ee5ng.",id:"\u1ee9ng-d\u1ee5ng",level:2},{value:"References",id:"references",level:2}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h1,{id:"dynamicproxy",children:"DynamicProxy"}),"\n",(0,a.jsx)(e.h2,{id:"t\xf3m-t\u1eaft",children:"T\xf3m t\u1eaft"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["T\u1ea1o 1 dynamic proxy c\u01a1 b\u1ea3n.","\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"M\u1ee5c \u0111\xedch: Thay \u0111\u1ed5i h\xe0nh vi method c\u1ee7a 1 object."}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html",children:"https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.h2,{id:"code-example",children:"Code example"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"T\u1ea1o interface Person"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:"public interface Person {\n  int doingTest();\n}\n"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"T\u1ea1o class Man implement interface Person"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:'public class Man implements Person{\n  @Override\n  public int doingTest() {\n    System.out.println("hoang is doing test");\n    return 10;\n  }\n}\n'})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"T\u1ea1o class Proxy (b\u1eb1ng c\xe1ch implements InvocationHandler), c\xf3 th\u1ec3 l\xe0m g\xec \u0111\xf3 tr\u01b0\u1edbc ho\u1eb7c sau khi ch\u1ea1y method c\u1ee7a object, nh\u01b0 code d\u01b0\u1edbi l\xe0 log sau khi ch\u1ea1y doingTest()"}),"\n",(0,a.jsx)(e.li,{children:"Object proxy"}),"\n",(0,a.jsx)(e.li,{children:"Method method, l\xe0 c\xe1c method c\u1ee7a interface, s\u1ebd \u0111\u01b0\u1ee3c truy\u1ec1n v\xe0o \u1edf constructor."}),"\n",(0,a.jsx)(e.li,{children:"Object[] args, l\xe0 bi\u1ebfn truy\u1ec1n v\xe0o c\u1ee7a method khi g\u1ecdi h\xe0m th\xf4ng qua object proxy."}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:'public class CustomInvocationHandler implements InvocationHandler{\n\n  private final Person person;\n  public CustomInvocationHandler(Person person) {\n    this.person = person;\n  }\n\n  @Override\n  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {\n      // ch\u1ea1y method b\u1ea5t k\xec c\u1ee7a interface input.\n    Object obj = method.invoke(person, args); // xem th\u01b0 vi\u1ec7n reflect \u0111\u1ec3 hi\u1ec3u h\u01a1n method n\xe0y\n    System.out.println("hoang proxy test");\n    return obj;\n  }\n}\n'})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"Vi\u1ebft h\xe0m main \u0111\u1ec3 test, d\xf9ng reflection \u0111\u1ec3 l\u1ea5y classLoader v\xe0 interface \u0111\u1ec3 t\u1ea1o proxy, sau \u0111\xf3 d\xf9ng object proxy \u0111\u1ec3 g\u1ecdi method."}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:'public class DynamicProxyTest {\n\n  public static void main(String[] args) throws IOException {\n    // constructor object man\n    Man man = new Man();\n    // c\xe1ch t\u1ea1o proxy\n    ClassLoader classLoader = man.getClass().getClassLoader();\n    Class[] interfaces = man.getClass().getInterfaces();\n    Person proxyMan = (Person) Proxy.newProxyInstance(classLoader, interfaces, new CustomInvocationHandler(man));\n    // ch\u1ea1y foo()\n    int mark = proxyMan.doingTest();\n    System.out.println("hoang get " + mark + " mark");\n  }\n}\n'})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"Console output"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{children:"hoang is doing test\nhoang proxy test\nhoang get 10 mark\n"})}),"\n",(0,a.jsx)(e.h2,{id:"\u1ee9ng-d\u1ee5ng",children:"\u1ee8ng d\u1ee5ng."}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{}),"\n"]}),"\n",(0,a.jsx)(e.h2,{id:"references",children:"References"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html",children:"https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://viblo.asia/p/class-proxy-trong-java-va-cac-ung-dung-yMnKMYvgK7P",children:"https://viblo.asia/p/class-proxy-trong-java-va-cac-ung-dung-yMnKMYvgK7P"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://codegym.cc/groups/posts/208-dynamic-proxies",children:"https://codegym.cc/groups/posts/208-dynamic-proxies"})}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,c.a)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(d,{...n})}):d(n)}},1151:(n,e,s)=>{s.d(e,{Z:()=>o,a:()=>r});var a=s(7294);const c={},t=a.createContext(c);function r(n){const e=a.useContext(t);return a.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),a.createElement(t.Provider,{value:e},n.children)}}}]);