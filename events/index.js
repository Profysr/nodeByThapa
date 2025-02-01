const EventEmitter = require("events");

const emitter = new EventEmitter();
const eventCounts = {};

const trackEvent = (eventName) => {
  eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
};

emitter.on("login", (username) => {
  trackEvent("login");
  console.log(`User ${username} has logged in`);
});

emitter.on("logout", (username) => {
  trackEvent("logout");
  console.log(`User ${username} has logged out`);
});

emitter.on("purchase", (item) => {
  trackEvent("purchase");
  console.log(`User has purchased ${item}`);
});

emitter.on("profileUpdate", (profile) => {
  trackEvent("profileUpdate");
  console.log(
    `User profile has been updated: ${profile.name}, ${profile.email}`
  );
});

emitter.emit("login", "Bilal");
emitter.emit("logout", "Bilal");
emitter.emit("purchase", "Macbook Pro");
emitter.emit("profileUpdate", { name: "Bilal", email: "xyz@gmail.com" });
emitter.emit("login", "xyz");
emitter.emit("login", "xyz");

console.log(eventCounts);
