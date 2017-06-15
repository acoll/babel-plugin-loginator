function sayHi() {
  const x = "thing";
  console.log("hello", x);
  return x;
}

console.log("function inside console", sayHi, sayHi(), () => sayHi());
