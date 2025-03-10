"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullTimeStudent_1 = require("./FullTimeStudent");
var PartTimeStudent_1 = require("./PartTimeStudent");
console.log("Hello TypeScript");
var a = 100; // Number
console.log(a);
var b;
b = "Helloo";
var c = 100;
var d = false;
var e = "Hello";
function add(a, b) {
    return a + b;
}
var sum = add(10, 20);
console.log(sum);
console.log(typeof sum);
var x; // Union type
x = 100;
x = "Hello";
var y;
y = true;
console.log("".concat(y, " is boolean"));
if (typeof y === 'string') {
    console.log("".concat(y, " is string"));
}
else if (typeof y === 'number') {
    console.log("".concat(y, " is number"));
}
var s1 = {
    sid: 1,
    snm: "Pritesh",
    per: 50.50,
    isPass: true
};
console.log(s1);
var s2 = new FullTimeStudent_1.default(2, "Alex", 75.2, true, "FullTimeStudent");
s2.print();
var x1 = 100;
x1 = "Hello";
var a1 = null;
a1 = 100;
var home = {
    streeNo: 100,
    streeName: "Street Name",
    city: "TOR",
    postalCode: "M1M2M3"
};
var loc = {
    lat: 10,
    lng: 20,
    alt: 30
};
var fullhome = {
    streeNo: 100,
    streeName: "Street Name",
    city: "TOR",
    postalCode: "M1M2M3",
    lat: 10,
    lng: 20,
    alt: 30
};
// Class usage
var pts1 = new PartTimeStudent_1.default(1, "Patel", 10.89, false, "PartTimeStudent - 1");
pts1.snm = "Pritesh Patel";
pts1.display();
