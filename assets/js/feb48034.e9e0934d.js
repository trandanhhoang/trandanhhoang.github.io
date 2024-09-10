"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6982],{6523:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var t=i(5893),l=i(1151);const s={sidebar_position:1},o="Two sum",r={id:"ignore/two-sum",title:"Two sum",description:"- We will learn some keyword, notation, statement in english to solve this problem.",source:"@site/docs/ignore/two-sum.md",sourceDirName:"ignore",slug:"/ignore/two-sum",permalink:"/docs/ignore/two-sum",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Number of islands.",permalink:"/docs/ignore/number-of-island"},next:{title:"Binary tree level order traversal using recursive",permalink:"/docs/ignore/binary-tree-level-order-traversal-recursive"}},a={},c=[{value:"Link to problem",id:"link-to-problem",level:2},{value:"Solve with english",id:"solve-with-english",level:2},{value:"Code in java",id:"code-in-java",level:2},{value:"Analysis complexity of the algorithm",id:"analysis-complexity-of-the-algorithm",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"two-sum",children:"Two sum"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"We will learn some keyword, notation, statement in english to solve this problem."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"link-to-problem",children:"Link to problem"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://leetcode.com/problems/two-sum/",children:"https://leetcode.com/problems/two-sum/"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"solve-with-english",children:"Solve with english"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["First, we can solve it use brutal force approach.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["we perform a for loop, with each element x","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"we perform another for loop to find y, where x plus y equal TARGET."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"this approach will cost O(N^2) time complexity. (where N is the length of the input array)"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["We will optimize it by using HashMap","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"we create a hashmap, key is the value at index (we call it element now), and value is the index of it in list."}),"\n",(0,t.jsxs)(n.li,{children:["we perform a for loop, with each element x = nums[i], we find in map that key is 'target minus x'","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"if it have, we return the result is 2 indices"}),"\n",(0,t.jsx)(n.li,{children:"if not, we save it in map and continue the for loop until we find out."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Now, time complexity is O(N)."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"public static int[] twoSum(int[] nums, int target){\n  Map<Integer, Integer> map = new HashMap<>();\n\n  for (int i = 0; i < nums.length;i++){\n    if (map.containsKey(target - nums[i])) {\n      return new int[]{i, map.get(target - nums[i])};\n    }\n    map.put(nums[i],i);\n  }\n  return new int[]{};\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"analysis-complexity-of-the-algorithm",children:"Analysis complexity of the algorithm"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Time complexity is O(N) when we iterate the list N elements"}),"\n",(0,t.jsx)(n.li,{children:"Space complexity is O(N) because we create a map with N key-value."}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>o});var t=i(7294);const l={},s=t.createContext(l);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);