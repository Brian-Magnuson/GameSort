import MatchResult from "../interfaces/MatchResult";

function merge(arr: MatchResult[], left: number, mid: number, right: number) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  const arr1 = Array(n1);
  const arr2 = Array(n2);

  for (let i1 = 0; i1 < n1; i1++)
    arr1[i1] = arr[left + i1];
  for (let i2 = 0; i2 < n2; i2++)
    arr2[i2] = arr[mid + 1 + i2];

  let i1 = 0, i2 = 0, i = left;
  while (i1 < n1 && i2 < n2) {
    if (arr1[i1].matchRating > arr2[i2].matchRating) {
      arr[i] = arr1[i1];
      i1++;
    } else {
      arr[i] = arr2[i2];
      i2++;
    }
    i++;
  }
  while (i1 < n1) {
    arr[i] = arr1[i1];
    i1++;
    i++;
  }
  while (i2 < n2) {
    arr[i] = arr2[i2];
    i2++;
    i++;
  }
}

function mergeSortRecursive(arr: MatchResult[], left: number, right: number) {
  if (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    mergeSortRecursive(arr, left, mid);
    mergeSortRecursive(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

export function mergeSort(arr: MatchResult[]) {
  mergeSortRecursive(arr, 0, arr.length - 1)
}

function minHeapifyDown(arr: MatchResult[], n: number, index: number) {
  //insert the new element at the end of the array and set child = arr.size()-1
  let smallest = index;
  let smallestMatchRating = arr[index].matchRating;
  //set parent to (child -1)/2
  let l = 2 * index + 1;
  let r = 2 * index + 2;

  //if the left child is the smallest
  if (l < n && arr[l].matchRating < smallestMatchRating) {
    smallest = l;
    smallestMatchRating = arr[l].matchRating;
  }
  //if right child is the smallest
  if (r < n && arr[r].matchRating < smallestMatchRating) {
    smallest = r;
    smallestMatchRating = arr[r].matchRating;
  }
  //if smallest != root
  if (smallest != index) {
    let temp1 = arr[index];
    arr[index] = arr[smallest];
    arr[smallest] = temp1;

    minHeapifyDown(arr, n, smallest);
  }


}

export function heapSort(arr: MatchResult[]) {
  for (let i = (arr.length / 2 - 1); i >= 0; i--) {
    minHeapifyDown(arr, arr.length, i);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    //make the current root the end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    minHeapifyDown(arr, i, 0);
  }
}

function partition(arr: MatchResult[], low: number, high: number) {

  //select pivot element
  let pivot = arr[low].matchRating;
  let up = low, down = high;

  while (up < down) {
    for (let j = up; j < high; j++) {
      if (arr[up].matchRating < pivot)
        break;
      up++;
    }
    for (let j = high; j > low; j--) {
      if (arr[down].matchRating > pivot)
        break;
      down--;
    }
    let temp = arr[up];
    if (up < down) {
      temp = arr[up];
      arr[up] = arr[down];
      arr[down] = temp;
    }
  }
  let newTemp = arr[low];
  arr[low] = arr[down];
  arr[down] = newTemp;
  return down;
}

function quickSortRecursive(arr: MatchResult[], low: number, high: number) {

  if (low < high) {
    let pivot = partition(arr, low, high);
    quickSortRecursive(arr, low, pivot - 1);
    quickSortRecursive(arr, pivot + 1, high);
  }
}

export function quickSort(arr: MatchResult[]) {
  quickSortRecursive(arr, 0, arr.length - 1);
}

export function jsSort(arr: MatchResult[]) {
  arr.sort((a, b) => b.matchRating - a.matchRating);
}  
