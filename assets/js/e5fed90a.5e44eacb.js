"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6362],{7424:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var i=s(4848),t=s(8453);const r={},a="Microservice Pattern with example in Java",c={id:"blog/25-01-07-microservice-pattern",title:"Microservice Pattern with example in Java",description:'This page talks about lessons learned from the book "Microservice Patterns with example in Java" by Chris Richardson, so sentences are my own thoughts, not from the book.',source:"@site/docs/blog/25-01-07-microservice-pattern.mdx",sourceDirName:"blog",slug:"/blog/25-01-07-microservice-pattern",permalink:"/docs/blog/25-01-07-microservice-pattern",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Problems at Redis in microservices",permalink:"/docs/blog/25-01-06-problems-at-redis"},next:{title:"Springboot",permalink:"/docs/category/springboot"}},o={},l=[{value:"Chapter 1: Escaping monolithic hell",id:"chapter-1-escaping-monolithic-hell",level:2},{value:"Pattern language",id:"pattern-language",level:3},{value:"Chapter 2: Decomposition strategies",id:"chapter-2-decomposition-strategies",level:2},{value:"Microservice architecture style",id:"microservice-architecture-style",level:3}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components},{Details:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"microservice-pattern-with-example-in-java",children:"Microservice Pattern with example in Java"})}),"\n",(0,i.jsxs)(n.p,{children:["This page talks about lessons learned from the book ",(0,i.jsx)("span",{className:"layered-style",children:'"Microservice Patterns with example in Java"'})," by Chris Richardson, so sentences are my own thoughts, not from the book."]}),"\n",(0,i.jsx)(n.h2,{id:"chapter-1-escaping-monolithic-hell",children:"Chapter 1: Escaping monolithic hell"}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"I see a nice picture about three-dimensional scalability."}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Try to think 30s, how many type of scalability did you know in system design ?"}),(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Scale Cube",src:s(3378).A+"",width:"750",height:"538"})}),(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"X-Scale by cloning services"}),"\n",(0,i.jsx)(n.li,{children:"Y-From monolithic to microservices"}),"\n",(0,i.jsx)(n.li,{children:"Z-Scale by partitioning database"}),"\n"]})]}),"\n",(0,i.jsxs)(n.p,{children:["We will focus on Y-axis scaling, we will decompose the complex application into a set of services (",(0,i.jsx)(n.em,{children:"module"}),")."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"In the pov of developers: they can work independently."}),"\n",(0,i.jsxs)(n.li,{children:["In the pov of services: each service should have its own database.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Because if you can use an old database. I don't think it's a good idea to split the service."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"pattern-language",children:"Pattern language"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A high-level view of the Microservice architecture pattern language\n",(0,i.jsx)(n.img,{alt:"img.png",src:s(3359).A+"",width:"926",height:"622"})]}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"PATTERNS FOR DECOMPOSING AN APPLICATION INTO SERVICES"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Decompose by business capability"}),":"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Decompose by subdomain"}),": organizes services around domain driven design (DDD) subdomains."]}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"COMMUNICATION PATTERNS"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Communication style\u2014What kind of IPC mechanism should you use?"}),"\n",(0,i.jsx)(n.li,{children:"Discovery\u2014How does a client of a service determine the IP address of a service\ninstance so that, for example, it makes an HTTP request?"}),"\n",(0,i.jsx)(n.li,{children:"Reliability\u2014How can you ensure that communication between services is reliable even though services can be unavailable?"}),"\n",(0,i.jsx)(n.li,{children:"Transactional messaging\u2014How should you integrate the sending of messages and\npublishing of events with database transactions that update business data?"}),"\n",(0,i.jsx)(n.li,{children:"External API\u2014How do clients of your application communicate with the services?"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img.png",src:s(7200).A+"",width:"840",height:"670"})}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"DATA CONSISTENCY PATTERNS FOR IMPLEMENTING TRANSACTION MANAGEMENT"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Distributed transactions (2PC) isn\u2019t a viable option for a modern application. Instead, an application needs to\nmaintain data consistency by using the Saga pattern. Figure 1.13 shows data-related"}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"PATTERNS FOR QUERYING DATA IN A MICROSERVICE ARCHITECTURE"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"CQRS (which maintains one or more easily queried\nreplicas of the data) or API Composition (which invokes the APIs of one or\nmore services and aggregates results)"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img.png",src:s(489).A+"",width:"849",height:"589"})}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"OBSERVABILITY PATTERNS PROVIDE INSIGHT INTO APPLICATION BEHAVIOR"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Health check API\u2014Expose an endpoint that returns the health of the service."}),"\n",(0,i.jsx)(n.li,{children:"Log aggregation\u2014Log service activity and write logs into a centralized logging\nserver, which provides searching and alerting."}),"\n",(0,i.jsx)(n.li,{children:"Distributed tracing\u2014Assign each external request a unique ID and trace requests\nas they flow between services."}),"\n",(0,i.jsx)(n.li,{children:"Exception tracking\u2014Report exceptions to an exception tracking service, which\ndeduplicates exceptions, alerts developers, and tracks the resolution of each\nexception."}),"\n",(0,i.jsx)(n.li,{children:"Application metrics\u2014Maintain metrics, such as counters and gauges, and expose\nthem to a metrics server."}),"\n",(0,i.jsx)(n.li,{children:"Audit logging\u2014Log user actions."}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"PATTERNS FOR THE AUTOMATED TESTING OF SERVICES"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Consumer-driven contract test\u2014Verify that a service meets the expectations of its\nclients."}),"\n",(0,i.jsx)(n.li,{children:"Consumer-side contract test\u2014Verify that the client of a service can communicate\nwith the service."}),"\n",(0,i.jsx)(n.li,{children:"Service component test\u2014Test a service in isolation"}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"PATTERNS FOR HANDLING CROSS-CUTTING CONCERNS"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Externalized Configuration pattern"}),"\n"]}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"SECURITY PATTERNS"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"In a microservice, user usually authenticated by API gateway. A common solution is to apply the Access token pattern, eg: JWT"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"chapter-2-decomposition-strategies",children:"Chapter 2: Decomposition strategies"}),"\n",(0,i.jsx)(n.p,{children:"We will focus on how to decompose application into services by 2 ways above:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Decompose by business"}),"\n",(0,i.jsx)(n.li,{children:"Decompose by subdomain"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"And apply concept bounded context from DDD."}),"\n",(0,i.jsx)(n.h3,{id:"microservice-architecture-style",children:"Microservice architecture style"}),"\n",(0,i.jsx)("span",{className:"layered-style",children:"THE LAYERED ARCHITECTURAL STYLE"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Explains:"})," Each layer has a set of responsibilities. Upper layer depend on lower layer"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Example:"})," The popular three-tier architecture:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Presentation layer: Contains code implement user interface and external API"}),"\n",(0,i.jsx)(n.li,{children:"Business layer: Contains biz logic"}),"\n",(0,i.jsx)(n.li,{children:"Persistence layer: Implement logic with database"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Drawbacks:"})," Rigid dependencies, biz depend on persistence\n",(0,i.jsx)(n.strong,{children:"Solutions:"})," Hexagonal architecture"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Drawbacks in java context:"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"// Presentation Layer (Spring REST Controller)\n@RestController\npublic class CustomerController {\n    @Autowired\n    private CustomerService customerService; // Business Logic dependency\n}\n\n// Business Logic Layer (Spring Service)\n@Service\npublic class CustomerService {\n    @Autowired\n    private CustomerRepository customerRepository; // Persistence dependency\n}\n\n// Persistence Layer (Spring Data JPA)\npublic interface CustomerRepository extends JpaRepository<Customer, Long> {}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Issue: CustomerService directly depends on CustomerRepository (JPA). Testing CustomerService requires a database or mocked DAO."}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"How hexagonal architecture solve problem:"}),' By using interface instead of putting "implement class" directly in code']}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img.png",src:s(4235).A+"",width:"768",height:"649"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},7200:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/communication-strategy-0a6af87a3823b78e44d23a154ea4ef7a.png"},489:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/db-pattern-44bff8694848f5f4a316d5257212908b.png"},4235:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/hexagonal-0a91224a1ab32252c170f179646a0261.png"},3359:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/pattern-language-86bbec39064bd515854f804388052616.png"},3378:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/scale-cube-dc65b0cf042b624ec606903197bfba5c.png"},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>c});var i=s(6540);const t={},r=i.createContext(t);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);