const books = [
  {
    id: 1,
    name: "The Standard of Programming",
    author: "Bob",
  },
  {
    id: 2,
    name: "Essence of .NET",
    author: "Tom",
  },
  {
    id: 6,
    name: "The best practice of SQL",
    author: "Jimmy",
  },
];

// TODO: UserCase Quickly find the specific book whatever the books how to update

// condition: id = 2
let target = {};

books.forEach((book) => {
  if (book.id === 2) target = book;
});

console.log(target);

// How to dynamically find the book without the influence of modification of books
// Custom a proxy from Array to figure out it.

const IndexProxy = new Proxy(Array, {
  // construct function
  construct: (target, originalArr) => {
    const index = {};
    originalArr.forEach((x) => (index[x.id] = x));
    const newArray = new target(...originalArr);
    return new Proxy(newArray, {
      get: (target, property) => {
        // refactor push function
        if (property === "push")
          return (item) => {
            index[item.id] = item;
            return target[property].call(target, item);
          };
        else if (property === "findBookById") {
          return (id) => (id in index ? index[id] : "Do not have this book");
        }
        return target[property];
      },
    });
  },
});

const indexBooks = new IndexProxy(
  {
    id: 1,
    name: "The Standard of Programming",
    author: "Bob",
  },
  {
    id: 2,
    name: "Essence of .NET",
    author: "Tom",
  },
  {
    id: 6,
    name: "The best practice of SQL",
    author: "Jimmy",
  }
);
console.log(indexBooks);
indexBooks.push({
  id: 8,
  name: "Testing",
  author: "Testing",
});
console.log(indexBooks);

console.log(indexBooks.findBookById(8));
console.log(indexBooks.findBookById(2));
console.log(indexBooks.findBookById(5));
