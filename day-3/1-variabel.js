// Soal 1 : Deklarasikan variabel x dengan nilai 10 dan variabel y dengan nilai 20. Kemudian, deklarasikan variabel sum yang menyimpan hasil penjumlahan x dan y.
const x = 10;
const y = 20;
const sum = x + y;

console.log('x :', x);
console.log('y :', y);
console.log('sum :', sum);


/* 
Soal 2 : Soal 2: Apa perbedaan antara var, let, dan const dalam JavaScript?
  a) var : Cara untuk mendeklarasikan variabel yang memiliki scope global atau function, apabila dideklarasikan diluar fungsi maka scopenya global, apabila di dalam fungsi maka scopenya function. Nilai dari var dapat diubah-ubah setelah diinisialisasi dan dapat dideklarasi ulang. Memiliki sifat hoisting, yaitu deklarasi variabel global dengan var akan dipindahkan di urutan atas sebelum dieksekusi. Sebaiknya penggunaannya dihindari karena memiliki sifat yang tidak terduga dan rawan menimbulkan bug atau error (contoh : penimpaan value variabel dalam blok kode if)
  b) let : Cara untuk mendeklarasikan variabel yang memiliki block scope (scope diantara simbol "{ }"), variabel tidak dapat diakses sebelum dideklarasikan dan tidak dapat dideklarasi ulang. Nilai variabel let dapat diubah setelah diinisialisasi
  c) const : Cara untuk mendeklarasikan variabel yang memiliki block scope (scope diantara simbol "{ }"), variabel tidak dapat diakses sebelum dideklarasikan, nilai dari variabel yang diinsialisasi dengan const tidak dapat diperbarui dan variabel tidak dapat dideklarasikan ulang. Meskipun nilai variable tidak dapat diubah, tetapi properti pada variabel const dapat diubah nilainya
*/