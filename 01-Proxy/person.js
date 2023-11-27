const person = {
  last: "Wei",
  first: "Rylan",
};

const personProxy = new Proxy(person, {
  ownKeys: (target) => {
    console.log("exec");
    return Reflect.ownKeys(target);
  },
  // A proxy handler for in operator return a Boolean whether the target has this prop
  has: (target, prop) => {
    if (prop in target) return true;
    throw new Error(`${prop} dose not exist in target`);
  },
  // TODO: Implement Computed property
  get: (target, prop) => {
    if (prop in target) return target[prop];
    if (prop.includes("_"))
      return prop
        .split("_")
        .map((key) => (key in target ? target[key] : "Unknown"))
        .join(" ");
    else return "Unknown";
  },
});

// for (const key in personProxy) {
//   const element = person[key];
//   //   console.log(element);
// }

// console.log("last" in personProxy);
// console.log("age" in personProxy); Error: age dose not exist in target

// TODO: User Case : Implement a computed property
console.log(personProxy.first_last_first_last);
