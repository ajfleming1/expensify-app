const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: "Drew",
      age: 36
    });
    //reject("Something went wrong");
  }, 5000);
});

console.log("before");

promise
  .then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("This is my other promise");
      }, 5000);
    });
  }).then((str) => {
    console.log("Will this run?", str)
  })
  .catch((error) => {
    console.log("Error: ", error)
  });

console.log("after");