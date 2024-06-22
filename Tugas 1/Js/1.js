
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 6 === 0) return false;
    
    for (let i = 4; i * i <= num; i += 5) {
        if (num % i === 0 || num % (i + 1) === 0) return false;
    }
    
    return true;
}


function generatePrimes(count) {
    const primes = [];
    let num = 2; // Start checking from the first prime number
    
    while (primes.length < count) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    
    return primes;
}

// Function to generate the triangle
function generateTriangle() {
    const size = parseInt(document.getElementById('size').value);
    if (size <= 0 || size >= 10) {
        alert('Masukkan panjang alas dan tinggi segitiga yang valid (0 < Alas/Tinggi < 10).');
        return;
    }

    const totalPrimesNeeded = (size * (size + 1)) / 2; // Sum of first 'size' natural numbers
    const primes = generatePrimes(totalPrimesNeeded);

    let index = 0;
    let result = '';

    for (let i = size; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            result += primes[index++] + ' ';
        }
        result += '\n';
    }

    document.getElementById('triangleOutput').innerText = result;
}