function recursiveBubbleSort(arr, n) {
    if (n === 1) return arr;

    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }

    return recursiveBubbleSort(arr, n - 1);
}

function sortArray() {
    const inputArray = document.getElementById('inputArray').value.trim();
    const array = inputArray.split(',').map(num => parseInt(num.trim()));

    if (!Array.isArray(array) || array.length === 0) {
        document.getElementById('output').innerHTML = 'Masukkan array yang valid.';
        return;
    }

    const sortedArray = recursiveBubbleSort(array.slice(), array.length);
    const oddNumbers = sortedArray.filter(num => num % 2 !== 0);
    const evenNumbers = sortedArray.filter(num => num % 2 === 0);

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <p>Array: ${sortedArray.join(', ')}</p>
        <p>Ganjil: ${oddNumbers.join(', ')}</p>
        <p>Genap: ${evenNumbers.join(', ')}</p>
    `;
}