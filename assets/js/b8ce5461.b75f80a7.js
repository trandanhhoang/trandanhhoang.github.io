"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3270],{3282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=n(5893),r=n(1151);const s={sidebar_position:3},a="Selection sort",o={id:"algorithm/selection-sort",title:"Selection sort",description:"- We will learn some keyword, notation, statement in english.",source:"@site/docs/algorithm/selection-sort.md",sourceDirName:"algorithm",slug:"/algorithm/selection-sort",permalink:"/docs/algorithm/selection-sort",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Binary tree level order traversal using queue",permalink:"/docs/algorithm/binary-tree-level-order-traversal-q"},next:{title:"Merge sort",permalink:"/docs/algorithm/merge-sort"}},l={},d=[{value:"Code in java",id:"code-in-java",level:2},{value:"Analysis the algorithm",id:"analysis-the-algorithm",level:2},{value:"Complexity and Analysis the time complexity of average case",id:"complexity-and-analysis-the-time-complexity-of-average-case",level:2}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"selection-sort",children:"Selection sort"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"We will learn some keyword, notation, statement in english."}),"\n",(0,i.jsxs)(t.li,{children:["Let say we have the following array ",(0,i.jsx)(t.code,{children:"[2,7,4,1,5,3,6]"}),", and we want it sorted in increasing order.","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"we divide array into sorted part in the left and unsorted part, in the right."}),"\n",(0,i.jsx)(t.li,{children:"During each iteration, we will find the smallest element in unsorted part and move it to the sorted part by keep track of the minimum item"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:"public static void main(String[] args) {\n        List<Integer> integers = Arrays.asList(2,7,4,1,5,3,6);\n\n        int size = integers.size();\n\n        System.out.println(integers);\n        for (int i = 0; i < size-1; i++) {\n            int minIndex = i;\n            for (int j = i+1; j < size; j++) {\n                if(integers.get(minIndex) > integers.get(j)){\n                    minIndex = j;\n                }\n            }\n            swap(integers,minIndex,i);\n            System.out.println(integers);\n        }\n    }\n    private static void swap(List<Integer> integers, int left, int right){\n        int temp = integers.get(left);\n        integers.set(left, integers.get(right));\n        integers.set(right,temp);\n    }\n"})}),"\n",(0,i.jsx)(t.h2,{id:"analysis-the-algorithm",children:"Analysis the algorithm"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The outer loop is start at the front of the array, run to the end of the array, we call this index is I."}),"\n",(0,i.jsx)(t.li,{children:"The inner loop is start at the index I plus one, run to the end of the array."}),"\n",(0,i.jsx)(t.li,{children:"The purpose is, we find the smallest of the element after each iteration, and put it into the last index of the left side of array, that is a sorted array."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"complexity-and-analysis-the-time-complexity-of-average-case",children:"Complexity and Analysis the time complexity of average case"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Quite same as the ",(0,i.jsx)(t.a,{href:"https://trandanhhoang.github.io/docs/algorithm/bubble-sort/",children:"bubble sort"})]}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var i=n(7294);const r={},s=i.createContext(r);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);