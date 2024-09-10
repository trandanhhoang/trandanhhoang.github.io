"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1361],{2052:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>c,metadata:()=>r,toc:()=>a});var o=t(5893),s=t(1151);const c={},i="Longest common subsequence",r={id:"ignore/lcs",title:"Longest common subsequence",description:"- https://leetcode.com/problems/longest-common-subsequence/description/",source:"@site/docs/ignore/lcs.md",sourceDirName:"ignore",slug:"/ignore/lcs",permalink:"/docs/ignore/lcs",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Java in action",permalink:"/docs/ignore/java-in-action"},next:{title:"Longest Increasing Subsequence.",permalink:"/docs/ignore/lis"}},l={},a=[{value:"Code in java",id:"code-in-java",level:2},{value:"Analysis the complexity of problem",id:"analysis-the-complexity-of-problem",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"longest-common-subsequence",children:"Longest common subsequence"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://leetcode.com/problems/longest-common-subsequence/description/",children:"https://leetcode.com/problems/longest-common-subsequence/description/"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:"public static int longestCommonSubsequence(String text1, String text2) {\n    int row = text1.length();\n    int col = text2.length();\n    int[][] dp = new int[row+1][col+1];\n    for (int r = 1; r <= row; r++) {\n        for (int c = 1; c <= col; c++) {\n            if (text1.charAt(r-1) == text2.charAt(c-1)) {\n                dp[r][c] = dp[r-1][c-1]+1;\n            } else {\n                dp[r][c] = Math.max(dp[r-1][c],dp[r][c-1]);\n            }\n        }\n    }\n    return dp[row][col];\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"analysis-the-complexity-of-problem",children:"Analysis the complexity of problem"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Time complexity is"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var o=t(7294);const s={},c=o.createContext(s);function i(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);