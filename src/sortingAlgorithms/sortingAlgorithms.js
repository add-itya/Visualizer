export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
        animations.push(['compare', i, j]);  // Comparison animation
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push(['swap', k, auxiliaryArray[i]]);  // Swap animation
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push(['swap', k, auxiliaryArray[j]]);  // Swap animation
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push(['compare', i, i]);  // Comparison animation
        animations.push(['swap', k, auxiliaryArray[i]]);  // Swap animation
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push(['compare', j, j]);  // Comparison animation
        animations.push(['swap', k, auxiliaryArray[j]]);  // Swap animation
        mainArray[k++] = auxiliaryArray[j++];
    }
}


export function quickSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

const quickSortHelper = (mainArray, startIdx, endIdx, animations) => {
    if (startIdx < endIdx) {
        const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
        quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
        quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
    }
}

const partition = (mainArray, startIdx, endIdx, animations) => {
    const pivot = mainArray[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j <= endIdx - 1; j++) {
        animations.push(['compare', j, endIdx]);
        animations.push(['compare', j, endIdx]);
        if (mainArray[j] <= pivot) {
            i++;
            animations.push(['swap', i, mainArray[j]]);
            animations.push(['swap', j, mainArray[i]]);
            [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
        }
    }
    animations.push(['swap', i + 1, mainArray[endIdx]]);
    animations.push(['swap', endIdx, mainArray[i + 1]]);
    [mainArray[i + 1], mainArray[endIdx]] = [mainArray[endIdx], mainArray[i + 1]];
    return i + 1;
}

export function bubbleSort(array) {
    const animations = [];
    let n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            animations.push(['compare', i, i + 1]);
            animations.push(['compare', i, i + 1]);
            if (array[i] > array[i + 1]) {
                animations.push(['swap', i, array[i + 1]]);
                animations.push(['swap', i + 1, array[i]]);
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return animations;
}


export function heapSort(array) {
    const animations = [];
    const n = array.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i >= 0; i--) {
        // Move current root to end
        animations.push(['swap', 0, array[i]]);
        animations.push(['swap', i, array[0]]);
        [array[0], array[i]] = [array[i], array[0]];

        // Call max heapify on the reduced heap
        heapify(array, i, 0, animations);
    }

    return animations;
}

function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        animations.push(['swap', i, array[largest]]);
        animations.push(['swap', largest, array[i]]);
        [array[i], array[largest]] = [array[largest], array[i]];

        heapify(array, n, largest, animations);
    }
}
