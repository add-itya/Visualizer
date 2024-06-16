import React from 'react';
import './SortingVizualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';

export default class SortingVizualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sortingInProgress: false,
            errorMessage: '',
        };
        this.sortingTimeouts = [];
    }

    componentDidMount() {
        const containerHeight = document.getElementsByClassName('array-container')[0].clientHeight;
        this.setState({ containerHeight }, () => {
            this.resetArray();
        });
    }

    resetArray() {
        this.stopSorting();

        const { containerHeight } = this.state;
        const containerWidth = document.getElementsByClassName('array-container')[0].clientWidth;
        const numberOfBars = Math.floor((containerWidth - 20) / 5);

        const marginFromTop = 50;
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, containerHeight - marginFromTop));
        }

        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor = '#4CAF50';
        }

        this.setState({ array, errorMessage: '' });
    }

    mergeSort() {
        if (this.state.sortingInProgress) {
            this.setState({ errorMessage: 'Sorting in progress. Please wait...' });
            return;
        }
        this.setState({ sortingInProgress: true });
        const animations = sortingAlgorithms.mergeSort(this.state.array.slice());
        this.animateSorting(animations, 3);
    }

    quickSort() {
        if (this.state.sortingInProgress) {
            this.setState({ errorMessage: 'Sorting in progress. Please wait...' });
            return;
        }
        this.setState({ sortingInProgress: true });
        const animations = sortingAlgorithms.quickSort(this.state.array.slice());
        this.animateSorting(animations, 3);
    }

    bubbleSort() {
        if (this.state.sortingInProgress) {
            this.setState({ errorMessage: 'Sorting in progress. Please wait...' });
            return;
        }
        this.setState({ sortingInProgress: true });
        const animations = sortingAlgorithms.bubbleSort(this.state.array.slice());
        this.animateSorting(animations, 3);
    }

    heapSort() {
        if (this.state.sortingInProgress) {
            this.setState({ errorMessage: 'Sorting in progress. Please wait...' });
            return;
        }
        this.setState({ sortingInProgress: true });
        const animations = sortingAlgorithms.heapSort(this.state.array.slice());
        this.animateSorting(animations, 3);
    }

    animateSorting(animations, timeoutMultiplier) {
        const arrayBars = document.getElementsByClassName('array-bar');
    
        // Clear existing timeouts
        this.sortingTimeouts.forEach(timeout => clearTimeout(timeout));
        this.sortingTimeouts = [];
    
        // Reset bar colors
        for (let i = 0; i < arrayBars.length; i++) {
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor = '#4CAF50';
        }
    
        // Process animations
        for (let i = 0; i < animations.length; i++) {
            const [action, barOneIdx, barTwoIdx] = animations[i];
    
            if (action === 'compare') {
                this.sortingTimeouts.push(setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = '#f44336';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * timeoutMultiplier));
    
                this.sortingTimeouts.push(setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = '#4CAF50';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, (i + 1) * timeoutMultiplier));
            } else if (action === 'swap') {
                this.sortingTimeouts.push(setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * timeoutMultiplier));
            }
        }
    
        // Set state after animations complete
        this.sortingTimeouts.push(setTimeout(() => {
            this.setState({ sortingInProgress: false, errorMessage: '' });
        }, 100)); // Adjust timing for final state reset
    }
    

    stopSorting() {
        this.sortingTimeouts.forEach(timeout => clearTimeout(timeout));
        this.sortingTimeouts = [];
        this.setState({ sortingInProgress: false, errorMessage: '' });
    }
    

    render() {
        const { array, sortingInProgress, errorMessage } = this.state;
    
        return (
            <>
                <div className='header'>
                    <button
                        onClick={() => this.resetArray()}
                        disabled={sortingInProgress}
                        title="Generate a new random array"
                    >
                        Generate New Array
                    </button>
                    <button
                        onClick={() => this.mergeSort()}
                        disabled={sortingInProgress}
                        title="Merge Sort: Divides the array into halves until single-element subarrays, then merges them back in sorted order."
                    >
                        Merge Sort
                    </button>
                    <button
                        onClick={() => this.quickSort()}
                        disabled={sortingInProgress}
                        title="Quick Sort: Selects a pivot and partitions the array into two subarrays, then recursively sorts each subarray."
                    >
                        Quick Sort
                    </button>
                    <button
                        onClick={() => this.bubbleSort()}
                        disabled={sortingInProgress}
                        title="Bubble Sort: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order."
                    >
                        Bubble Sort
                    </button>
                    <button
                        onClick={() => this.heapSort()}
                        disabled={sortingInProgress}
                        title="Heap Sort: Builds a heap from the array and repeatedly removes the largest element to add it to the sorted array."
                    >
                        Heap Sort
                    </button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}
                        ></div>
                    ))}
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
        );
    }
    
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
