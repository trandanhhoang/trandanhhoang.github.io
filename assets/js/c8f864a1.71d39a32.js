"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3694],{1268:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var a=t(5893),s=t(1151);const r={},i="\u0110\u1ecdc file csv",c={id:"java-basic/csv",title:"\u0110\u1ecdc file csv",description:"T\xf3m t\u1eaft:",source:"@site/docs/java-basic/csv.md",sourceDirName:"java-basic",slug:"/java-basic/csv",permalink:"/docs/java-basic/csv",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"OOP",permalink:"/docs/java-basic/OOP"},next:{title:"Apply generic in java",permalink:"/docs/java-basic/generic-apply"}},o={},l=[{value:"T\xf3m t\u1eaft:",id:"t\xf3m-t\u1eaft",level:2},{value:"Code example",id:"code-example",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"\u0111\u1ecdc-file-csv",children:"\u0110\u1ecdc file csv"}),"\n",(0,a.jsx)(n.h2,{id:"t\xf3m-t\u1eaft",children:"T\xf3m t\u1eaft:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Nh\u1eadn data t\u1eeb file csv, call th\xf4ng qua postman"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"code-example",children:"Code example"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"blocking world"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'    @PostMapping("/upload")\n    public void uploadFromCsv(@RequestParam("file") MultipartFile file) {\n        getDataFromCsv(file.getInputStream());\n    }\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Reactor project"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'    @PostMapping("/upload")\n    public Mono<ResponseApi<String>> uploadFromCsv(FilePart file) {\n        return file.content()\n                .map(\n                        dataBuffer -> {\n                            getDataFromCsv(dataBuffer.asInputStream());\n                            return "Success";\n                        })\n                .then(Mono.just(ResponseApi.success(new ResponseStatus(STATUS_SUCCESS, ""), "Success")))\n                .onErrorResume(\n                        e -> Mono.just(ResponseApi.error("ERROR WHEN UPLOAD CSV FILE", e.getMessage())));\n    }\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'public void getDataFromCsv(InputStream is) {\n        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));\n                CSVParser csvParser =\n                        new CSVParser(\n                                fileReader,\n                                CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim()); ) {\n\n            List<Application> applications = new ArrayList<>();\n            List<OriginationInfo> originationInfos = new ArrayList<>();\n\n            Iterable<CSVRecord> csvRecords = csvParser.getRecords();\n\n            for (CSVRecord csvRecord : csvRecords) {\n                String data = csvRecord.get("data");\n            }\n            \n        } catch (IOException e) {\n            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());\n        }\n    }\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>i});var a=t(7294);const s={},r=a.createContext(s);function i(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);