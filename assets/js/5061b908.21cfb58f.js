"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7528],{8062:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>g});var i=n(5893),s=n(1151);const r={sidebar_position:1},a="Heap",o={id:"algorithm/heap",title:"Heap",description:"-",source:"@site/docs/algorithm/heap.md",sourceDirName:"algorithm",slug:"/algorithm/heap",permalink:"/docs/algorithm/heap",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Bubble sort",permalink:"/docs/algorithm/bubble-sort"},next:{title:"Number of islands.",permalink:"/docs/algorithm/number-of-island"}},l={},g=[{value:"Code in java",id:"code-in-java",level:2},{value:"Complexity and Analysis the time complexity of average case",id:"complexity-and-analysis-the-time-complexity-of-average-case",level:2}];function c(e){const t={code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"heap",children:"Heap"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:"    public static void main(String[] args) {\n        List<Integer> integers = Arrays.asList(2, 4, 3, 5, 1);\n\n        buildHeap(integers);\n    }\n\n    private static void buildHeap(List<Integer> integers) {\n        for (int i = integers.size() / 2-1; i >= 0; i--) {\n            heapDown(integers, i);\n        }\n        System.out.println(integers);\n    }\n\n    private static int getLeft(int i) {\n        return i * 2 + 1;\n    }\n\n    private static int getRight(int i) {\n        return i * 2 + 2;\n    }\n\n    private static void heapDown(List<Integer> integers, int i) {\n        int size = integers.size();\n        int largest = i;\n        int left = getLeft(i);\n        int right = getRight(i);\n        if (left < size && integers.get(left) > integers.get(largest)) {\n            largest = left;\n        }\n        if (right < size && integers.get(right) > integers.get(largest)) {\n            largest = right;\n        }\n        if (largest != i) {\n            swap(integers, largest, i);\n            heapDown(integers, largest);\n        }\n    }\n\n    private static void swap(List<Integer> integers, int left, int right) {\n        int temp = integers.get(left);\n        integers.set(left, integers.get(right));\n        integers.set(right, temp);\n    }\n"})}),"\n",(0,i.jsx)(t.h2,{id:"complexity-and-analysis-the-time-complexity-of-average-case",children:"Complexity and Analysis the time complexity of average case"})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var i=n(7294);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);