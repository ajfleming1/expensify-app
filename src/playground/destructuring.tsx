export default {};

// Object Destructuring 
// type PersonType = {
//     name?: string,
//     age: number,
//     location:
//     {
//         city: string,
//         temp: number
//     }
// };

// const person: PersonType = {
//     //name: "Drew",
//     age: 36,
//     location: {
//         city: 'Bristol',
//         temp: 60
//     }
// };

// const { name: firstName = "Unknown", age } = person;
// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`);
// }

// type BookType = {
//     title: string,
//     author: string,
//     publisher: {
//         name?: string
//     }
// }

// const book:BookType = {
//     title: "Ego is the Enemy",
//     author: "Ryan Holiday",
//     publisher: {
//         name: "Penguin"
//     }
// }

// const {name: publisherName = "Self Published" } = book.publisher
// console.log(publisherName);

// Array Destructuring 
// const address = ['123 Fake St', 'Salem', 'Virginia', '24201'];
// const [, city, state = "New York"] = address;
// console.log(`You are in ${city}, ${state}.`);

const item = ["Coffee (iced)", "$3.00", "$3.50", "$3.75"];
const [itemName, ,mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);