// Soal 9: Buatlah object person dengan properti name bernilai "John" dan age bernilai 30. Tambahkan properti occupationdengan nilai "Developer".
const person = {
  name: 'John',
  age: 30,
}

console.log('Object person awal :');
console.log(person);

person.occupation = 'Developer';

console.log('\nObject person setelah menambahkan key occupation :');
console.log(person);

// Soal 10: Buatlah array people yang berisi tiga object, masing-masing dengan properti name dan age. Gunakan metode filter untuk mendapatkan array baru yang hanya berisi orang dengan age di atas 25.
const people = [
  {
    name: 'sam',
    age: 22,
  },
  {
    name: 'budi',
    age: 30,
  },
  {
    name: 'agus',
    age: 27,
  },
];

console.log('\nArray Object people awal :');
console.log(people);

const seniorPeople = people.filter((person) => {
  return person.age > 25;
});

console.log('\nArray Object people dengan filter usia di atas 25 :');
console.log(seniorPeople);


