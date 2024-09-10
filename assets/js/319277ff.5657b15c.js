"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9669],{5285:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>l,frontMatter:()=>a,metadata:()=>m,toc:()=>u});var r=e(5893),i=e(1151);const a={},s="Max Sum Distinct Sub Array",m={id:"ignore/msdsa",title:"Max Sum Distinct Sub Array",description:"Code in java",source:"@site/docs/ignore/msdsa.md",sourceDirName:"ignore",slug:"/ignore/msdsa",permalink:"/docs/ignore/msdsa",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Longest Substring Without Repeating Character",permalink:"/docs/ignore/lsswprc"},next:{title:"Word ladder",permalink:"/docs/ignore/wordLadder"}},o={},u=[{value:"Code in java",id:"code-in-java",level:2}];function c(n){const t={code:"code",h1:"h1",h2:"h2",pre:"pre",...(0,i.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"max-sum-distinct-sub-array",children:"Max Sum Distinct Sub Array"}),"\n",(0,r.jsx)(t.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-java",children:"public static void main(String[] args) {\n        System.out.println(maximumSubarraySum(new int[]{1, 5, 4, 2, 9, 9, 9}, 3) == 15);\n        System.out.println(maximumSubarraySum(new int[]{9, 9, 9, 2, 9, 9, 9}, 3) == 0);\n        System.out.println(maximumSubarraySum(new int[]{1, 2, 2}, 2) == 3);\n        System.out.println(maximumSubarraySum(new int[]{1, 1, 1, 7, 8, 9}, 3) == 24);\n        System.out.println(maximumSubarraySum(new int[]{1, 3, 3, 3, 3, 2, 1, 3, 1, 1, 2}, 3) == 6);\n\n    }\n\n    public static long maximumSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        long res = 0;\n        int left = 0;\n        long max = 0;\n\n        for (int right = 0; right < nums.length; right++) {\n            if (map.containsKey(nums[right])) {\n                if (left <= map.get(nums[right]) && map.get(nums[right]) < right) {\n                    int oldLeft = left;\n                    left = map.get(nums[right]) + 1;\n                    for (int i = oldLeft; i < left; i++) {\n                        res -= nums[i];\n                    }\n                }\n            }\n\n            if (right - left == k) {\n                res -= nums[left];\n                left++;\n            }\n            res += nums[right];\n            map.put(nums[right], right);\n            if (right - left + 1 == k) {\n                max = Math.max(max, res);\n            }\n        }\n\n        return max;\n    }\n"})})]})}function l(n={}){const{wrapper:t}={...(0,i.a)(),...n.components};return t?(0,r.jsx)(t,{...n,children:(0,r.jsx)(c,{...n})}):c(n)}},1151:(n,t,e)=>{e.d(t,{Z:()=>m,a:()=>s});var r=e(7294);const i={},a=r.createContext(i);function s(n){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function m(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),r.createElement(a.Provider,{value:t},n.children)}}}]);