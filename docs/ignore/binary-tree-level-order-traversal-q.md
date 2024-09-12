---
sidebar_position: 3
---

# Binary tree level order traversal using queue
- We will learn some keyword, notation, statement in english to solve this problem.

## Link to problem
- https://leetcode.com/problems/binary-tree-level-order-traversal/description/

## Solve with queue
- We will use queue to solve this problem
  - first, we will validate the input (root), is null or not.
  - put root to the queue and loop until queue is empty.
    - we create a list values that keep track all node of the current level.
    - we will add all node in queue in to list values above, and children of each node we be put into queue for the next level. 
 

## Code in java
```java
public List<List<Integer>> levelOrder(TreeNode root) {
    if (root == null) return new ArrayList<>();

    List<List<Integer>> result = new ArrayList<>();

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while(!queue.isEmpty()){
        List<Integer> values = new ArrayList<>();
        int counter = queue.size();
        for (int i = 0; i < counter; i++) {
            TreeNode node = queue.poll();
            values.add(node.val);

            if( node.left != null) queue.offer(node.left);
            if( node.right != null) queue.offer(node.right);
        }
        result.add(values);
    }
    return result;
}
```

## Analysis complexity of the algorithm
- The time complexity is O(N) with N is the length of input array
- Space complexity is O(2N) because queue cost O(N) and list result cost O(N).