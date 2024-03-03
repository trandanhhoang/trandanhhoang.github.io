---
sidebar_position: 2
---

# Insertion sort
- We will learn some keyword, notation, statement in english.
- - Let say we have the following array `[2,7,4,1,5,3,6]`, and we want it sorted in increasing order.
- we divide array into sorted part in the left and unsorted part, in the right.
- During each iteration, we will move the chosen element into sorted part that in the left.

## Code in java
``` java
public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(2,7,4,1,5,3,6);

        int size = integers.size();

        System.out.println(integers);
        for (int i = 1; i < size; i++) {
            for (int j = i; j > 0; j--) {
                if(integers.get(j) < integers.get(j-1)){
                    swap(integers,j,j-1);
                }else{
                    break;
                }
            }
            System.out.println(integers);
        }
    }
    private static void swap(List<Integer> integers, int left, int right){
        int temp = integers.get(left);
        integers.set(left, integers.get(right));
        integers.set(right,temp);
    }
```
## Analysis the algorithm
- The outer loop is start at the index I = 1 of the array, run to the end of the array.
- The inner loop is start at the index I, run down to the start of the array.
- The purpose is, we divide array into left and right side at I index, and we will move the element at index I into the left array that make the left array become sorted array after each inner loop.

## Complexity and Analysis the time complexity of average case
- Quite same as the [bubble sort](https://trandanhhoang.github.io/docs/algorithm/bubble-sort/)
