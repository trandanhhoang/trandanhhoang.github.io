---
sidebar_position: 3
---

# Selection sort
- We will learn some keyword, notation, statement in english.
- Let say we have the following array `[2,7,4,1,5,3,6]`, and we want it sorted in increasing order.
  - we divide array into sorted part in the left and unsorted part, in the right.
  - During each iteration, we will find the smallest element in unsorted part and move it to the sorted part by keep track of the minimum item

## Code in java
```java
public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(2,7,4,1,5,3,6);

        int size = integers.size();

        System.out.println(integers);
        for (int i = 0; i < size-1; i++) {
            int minIndex = i;
            for (int j = i+1; j < size; j++) {
                if(integers.get(minIndex) > integers.get(j)){
                    minIndex = j;
                }
            }
            swap(integers,minIndex,i);
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
- The outer loop is start at the front of the array, run to the end of the array, we call this index is I.
- The inner loop is start at the index I plus one, run to the end of the array.
- The purpose is, we find the smallest of the element after each iteration, and put it into the last index of the left side of array, that is a sorted array.

## Complexity and Analysis the time complexity of average case
- Quite same as the [bubble sort](https://trandanhhoang.github.io/docs/algorithm/bubble-sort/)