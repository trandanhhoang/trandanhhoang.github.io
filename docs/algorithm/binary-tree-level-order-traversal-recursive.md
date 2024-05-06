---
sidebar_position: 2
---

# Binary tree level order traversal using recursive
- We will learn some keyword, notation, statement in english to solve this problem.

## Link to problem
- https://leetcode.com/problems/binary-tree-level-order-traversal/description/

## Solve with recursive
- we will iterate the tree from root to leaf with counter variable, first start at 0.
  - when meet the children at left or right, we increase counter by 1.
  - each time meet a node, we add it into a map with key is the counter, value of the key is the list of result. 

## Code in java
```java
public List<List<Integer>> levelOrder(TreeNode root) {
    Map<Integer, List<Integer>> map = new HashMap<>();
    helper(root, 0, map);
    List<List<Integer>> result = new ArrayList<>();

    System.out.println();
    int counter = 0;
    while (map.containsKey(counter)){
        result.add(map.get(counter++));
    }
    return result;
}

public void helper(TreeNode root, int counter, Map<Integer, List<Integer>> map) {
    if (root == null) {
        return;
    }

    if (map.containsKey(counter)) {
        map.get(counter).add(root.val);
    } else {
        List<Integer> list = new ArrayList<>();
        list.add(root.val);
        map.put(counter, list);
    }
    helper(root.left, counter + 1, map);
    helper(root.right, counter + 1, map);
}
```
## Analysis complexity of the algorithm
- The time complexity is O(N) with N is the length of input array
- Space complexity is O(2N) because map cost O(N) and list result cost O(N).