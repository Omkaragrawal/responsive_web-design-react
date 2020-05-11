let a = num => (17 / 8) + num
let b = num => (28 / 8) + num
let i = 0
for (i; i< 1e3; i += 0.1) {
    if(Number.isInteger(a(i)) && Number.isInteger(b(i))) {
        console.log(i)
        break
       } 
}
console.log(i)