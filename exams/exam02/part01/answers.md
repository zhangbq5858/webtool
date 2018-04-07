# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => {
return data;
});

console.log(data.cats);
```
### Answer:


```
const data = await fetch('example.com/test')
.then( response => { return response.ok ? response.json() : Promise.reject(response.statusText) );

console.log(data.cats);
```


* The original code doesnot work as intended because the fetch() API only rejects a promise when a "network error is encountered" such as the user is offline. When some errors happens in server end, the promise is still resolved. Hence we need to check the HTTP response's status before analysis the response data.

* Fetch funtion is a async funtion, hence in the origin code, the line  "console.log(data.cats);" will be executed first. Hence use key word await to block the data line until data get value from server.

## Question: What is the scope of a variable in JS?  How does it relate to closures?

### Answer:
* When a variable is declared in a function or in a curly brace, then the variable is a local variable and its scope is within the function or the brace. And a variable is defined outside of all functions or any curly braces, then the variable is a global variable, its scope is anywhere in code.
*  When a scope is declared in another scope, the inner scope is the closure.

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes?

### Answer:
* A ployfill is a broswer fallback that checks features whether supported in current browser's JS engine.
* Polyfill add new array function to the constructor's prototype object to make change to all Array object.

## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer:

* Crossing-Origin Resource Sharing is a mechanism about restricting cross site requests (a web page request from one domain to another outside domain). Because CORS is one technique for relaxing SOP which is a policy in browsers.

* The Same Origin Policy forbids cross site requests by default. CORS gives access to some outside domains like (B , C) which is saved in domain (A). Then B and C could do the cross site requests to A.

## Question: What is the difference between a bundler and a transpiler?

### Answer:

* Transpiler is a toTol to read source code in one programming language and then produce an equivalent code in another

* Bundler is a tool to simply the process of merge together a group of modules into a single file.

