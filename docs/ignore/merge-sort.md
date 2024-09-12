---
sidebar_position: 4
---

# Merge sort
- We will learn some keyword, notation, statement in english.
- Let say we have the following array `[2,7,4,1,5,3,6]`, and we want it sorted in increasing order.
  - we will code recursively, using divide and conquer algorithm, that break problem into smaller piece.
  - we will split the array in half until it just have only 1 element.
  - Then we will merge it and sort it at the same time. 

## Code in java
```java
public static void main(String[] args) {
  List<Integer> integers = Arrays.asList(2, 8, 5, 3, 9, 4, 1, 7, 13);
  int size = integers.size();
  // TODO
  int[] array = integers.stream().mapToInt(i -> i).toArray();

  mergeSort(array, 0, size - 1);
  System.out.println(Arrays.toString(array));
}

private static void mergeSort(int[] integers, int left, int right) {
  if (right - left <= 0) return;

  int middle = left + (right - left) / 2;

  mergeSort(integers, left, middle);
  mergeSort(integers, middle + 1, right);

  merge(integers, left, middle, right);
}

private static void merge(int[] array, int left, int middle, int right) {
  // left = 0, right = 1
  int sizeLeft = middle - left + 1;
  int sizeRight = right - middle;

  int[] L = new int[sizeLeft];
  int[] R = new int[sizeRight];

  for (int i = 0; i < sizeLeft; i++) {
    L[i] = array[left + i];
  }

  for (int j = 0; j < sizeRight; j++) {
    R[j] = array[middle + 1 + j];
  }

  int l = 0;
  int r = 0;
  int k = left;

  while (l < sizeLeft && r < sizeRight) {
    if (L[l] <= R[r]) {
      array[k] = L[l];
      l++;
    } else {
      array[k] = R[r];
      r++;
    }
    k++;
  }
  while (l < sizeLeft) {
    array[k] = L[l];
    l++;
    k++;
  }
  while (r < sizeRight) {
    array[k] = R[r];
    r++;
    k++;
  }

}
```

## Analysis the algorithm

## Complexity and Analysis the time complexity of average case
