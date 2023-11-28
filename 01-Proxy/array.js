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
  construct(target, argArray) {
    const index = {};
    argArray.forEach((x) => (index[x.id] = x));
    const _argArray = new target(...argArray);
    return new Proxy(_argArray, {
      get: (target, prop) => {
        if (prop === "push") {
          return (item) => {
            index[item.id] = item;
            return target[prop].call(target, item);
          };
        } else if (prop === "findBookById") {
          return (id) =>
            id in index ? index[id] : `Do not have this book: id: ${id}`;
        }
        return target[prop];
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
console.log(indexBooks.findBookById(2));
console.log(indexBooks.findBookById(8));
indexBooks.push({ id: 8, name: "Testing Book", author: "TestUser1" });
console.log(indexBooks.findBookById(8));
