/**
 * 说明：
 */
function test(str:string) {
  console.log(str);
}
test('hello world');
interface Person {
  name:string,
  age:number
}
function showP(p:Person) {
  console.log(p.name, p.name);
  console.log(p.age, p.age);
}
showP({name: 'wang', age: 18});