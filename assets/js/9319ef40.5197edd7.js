"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[54],{7718:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var t=n(5893),l=n(1151);const i={sidebar_position:3},o="Binary tree level order traversal using recursive",s={id:"problem/binary-tree-level-order-traversal-recursive",title:"Binary tree level order traversal using recursive",description:"- We will learn some keyword, notation, statement in english to solve this problem.",source:"@site/docs/problem/binary-tree-level-order-traversal-recursive.md",sourceDirName:"problem",slug:"/problem/binary-tree-level-order-traversal-recursive",permalink:"/docs/problem/binary-tree-level-order-traversal-recursive",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Binary tree level order traversal using queue",permalink:"/docs/problem/binary-tree-level-order-traversal-queue"},next:{title:"Set up debezium with postgres",permalink:"/docs/debezium/setup-debezium-with-postgres"}},a={},u=[{value:"Link to problem",id:"link-to-problem",level:2},{value:"Solve with queue",id:"solve-with-queue",level:2},{value:"Code in java",id:"code-in-java",level:2},{value:"Analysis complexity of the algorithm",id:"analysis-complexity-of-the-algorithm",level:2}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"binary-tree-level-order-traversal-using-recursive",children:"Binary tree level order traversal using recursive"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"We will learn some keyword, notation, statement in english to solve this problem."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"link-to-problem",children:"Link to problem"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.a,{href:"https://leetcode.com/problems/binary-tree-level-order-traversal/description/",children:"https://leetcode.com/problems/binary-tree-level-order-traversal/description/"})}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"solve-with-queue",children:"Solve with queue"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["We will use queue to solve this problem","\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"first, we will validate the input (root), is null or not."}),"\n",(0,t.jsxs)(r.li,{children:["put root to the queue and loop until queue is empty.","\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"we create a list values that keep track all node of the current level."}),"\n",(0,t.jsx)(r.li,{children:"we will add all node in queue in to list values above, and children of each node we be put into queue for the next level."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"code-in-java",children:"Code in java"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-java",children:"public List<List<Integer>> levelOrder(TreeNode root) {\n    if (root == null) return new ArrayList<>();\n\n    List<List<Integer>> result = new ArrayList<>();\n\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n\n    while(!queue.isEmpty()){\n        List<Integer> values = new ArrayList<>();\n        int counter = queue.size();\n        for (int i = 0; i < counter; i++) {\n            TreeNode node = queue.poll();\n            values.add(node.val);\n\n            if( node.left != null) queue.offer(node.left);\n            if( node.right != null) queue.offer(node.right);\n        }\n        result.add(values);\n    }\n    return result;\n}\n"})}),"\n",(0,t.jsx)(r.h2,{id:"analysis-complexity-of-the-algorithm",children:"Analysis complexity of the algorithm"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"The time complexity is O(N) with N is the length of input array"}),"\n",(0,t.jsx)(r.li,{children:"Space complexity is O(2N) because queue cost O(N) and list result cost O(N)."}),"\n"]})]})}function c(e={}){const{wrapper:r}={...(0,l.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>s,a:()=>o});var t=n(7294);const l={},i=t.createContext(l);function o(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);