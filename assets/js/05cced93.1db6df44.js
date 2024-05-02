"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6890],{4322:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>g});var i=n(5893),s=n(1151);const r={},a="Heap sort",o={id:"algorithm/heap-sort",title:"Heap sort",description:"- We will learn some keyword, notation, statement in english.",source:"@site/docs/algorithm/heap-sort.md",sourceDirName:"algorithm",slug:"/algorithm/heap-sort",permalink:"/docs/algorithm/heap-sort",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Quick sort",permalink:"/docs/algorithm/quick-sort"},next:{title:"Longest common subsequence",permalink:"/docs/algorithm/lcs"}},l={},g=[{value:"Code in java",id:"code-in-java",level:2}];function h(e){const t={code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"heap-sort",children:"Heap sort"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"We will learn some keyword, notation, statement in english."}),"\n",(0,i.jsxs)(t.li,{children:["Let say we have the following array ",(0,i.jsx)(t.code,{children:"[2, 4, 3, 5, 1,6,7,8]"}),", and we want it sorted in increasing order."]}),"\n",(0,i.jsxs)(t.li,{children:["First we need to build a max heap, then we swap the root with the last index of list, we decrease the size of the rest list by one, then we heap down the rest of the tree.","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Loop process above again, swap the root with the last index of list, ... until the array just exist 1 element."}),"\n",(0,i.jsx)(t.li,{children:"We will have the list is sorted"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:"public static void main(String[] args) {\n        List<Integer> integers = Arrays.asList(2, 4, 3, 5, 1,6,7,8);\n\n        buildHeap(integers);\n        heapSort(integers);\n\n        System.out.println(integers);\n    }\n\n    private static void heapSort(List<Integer> integers) {\n        for (int i = integers.size() - 1; i >=1; i--) {\n            swap(integers, 0, i);\n            heapDown(integers,i,0);\n        }\n    }\n\n    private static void buildHeap(List<Integer> integers) {\n        for (int i = integers.size() / 2 - 1; i >= 0; i--) {\n            heapDown(integers,integers.size(), i);\n        }\n    }\n\n    private static int getLeft(int i) {\n        return i * 2 + 1;\n    }\n\n    private static int getRight(int i) {\n        return i * 2 + 2;\n    }\n\n    private static void heapDown(List<Integer> integers,int size, int i) {\n        int largest = i;\n        int left = getLeft(i);\n        int right = getRight(i);\n        if (left < size && integers.get(left) > integers.get(largest)) {\n            largest = left;\n        }\n        if (right < size && integers.get(right) > integers.get(largest)) {\n            largest = right;\n        }\n        if (largest != i) {\n            swap(integers, largest, i);\n            heapDown(integers,size, largest);\n        }\n    }\n\n    private static void swap(List<Integer> integers, int left, int right) {\n        int temp = integers.get(left);\n        integers.set(left, integers.get(right));\n        integers.set(right, temp);\n    }\n"})})]})}function c(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var i=n(7294);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);