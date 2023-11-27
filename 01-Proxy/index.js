// Proxy is powerful API for ECMA2015 that provides some hooks to dynamically custom the operations
// in the object[function, array], it likes a layer between object and user behaviors, it is usually used to
// check the validation of property in a object or extend the object with custom features
// for example computed property etc.

const gameData = {};
const gameDataProxy = new Proxy(gameData, {
  // 'get' property: It will be called, when you try to get a property in the target
  // target:  original object
  // prop: property name that you try to fetch
  get: (target, prop) => {
    if (prop in target) return prop + ": " + target[prop];
    return false;
  },
  // 'set' property is a function that will be called when you try to assign value to a property on
  // the target
  // target: original object
  // prop: property name
  // value
  set: (target, prop, value) => {
    if (!["level", "duration", "player"].includes(prop))
      throw new Error(prop + " is not a valid setting of a game");
    target[prop] = value;
  },
  // 'delete' property is a function that will be called whe you try to delete a property on the target
  deleteProperty(target, prop) {
    if (prop in target) {
      console.log(`delete ${prop} in target`);
      delete target[prop];
    }
  },
});
// console.log(gameData.level, "origin"); // do not call the get
// console.log(gameDataProxy.level);
// gameDataProxy.date = new Date().toLocaleDateString();
// console.log(gameDataProxy.date);
// gameDataProxy.level = "hard";
// console.log(gameDataProxy);
// // gameDataProxy.time = "15 mins"; // Error: time is not a valid setting of a game
// delete gameDataProxy["level"];
// console.log(gameDataProxy);

// Function Proxy
const getTodayDate = function (country) {
  return `${
    this.name
  } said: today is ${new Date().toLocaleDateString()} in ${country}`;
};

const getTodayDateProxy = new Proxy(getTodayDate, {
  // Will callback 'apply' property when the proxy of function call the call/apply function or directly call it.
  apply: (target, thisArg, argArray) => {
    console.log("exec apply, this pointer: ", thisArg);
    return target.call(thisArg, argArray).toUpperCase();
  },
});

// console.log(getTodayDateProxy("China"));

const person = {
  name: "rylan",
  getTodayDate: getTodayDateProxy,
};

console.log(person.getTodayDate("Russia"));
