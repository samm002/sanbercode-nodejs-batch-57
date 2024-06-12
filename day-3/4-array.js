// Soal 7: Buatlah array fruits dengan elemen "Pepaya", "Mangga", dan "Pisang". Tambahkan "Jambu" ke array tersebut.
fruits = ['Pepaya', 'Mangga', 'Pisang'];

console.log('Array fruits awal :');
console.log(fruits);

fruits.push('Jambu');

console.log('\nArray fruits setelah penambahan elemen :');
console.log(fruits);

// Soal 8: Gunakan metode map untuk membuat array baru dari array numbers yang berisi nilai numbers dikalikan 2.
numbers = [1, 2, 3, 4, 5];
console.log('\nArray numbers awal :');
console.log(numbers);

doubledNumbers = numbers.map(number => number * 2);

console.log('\nArray numbers setelah dikali 2 :');
console.log(doubledNumbers);