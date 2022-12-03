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