# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:
 
JS's classes are special functions, they have no enforcement to implement as objects and no identities for system to track.

Distinction:
1. A language with real class has an entity to identify and track class in the system.
2. a. Language with class is object-oriented,  and class is a conceptual model, is an abstract  concept, should be implement by a real object.
	b. Language without class focus on process or what function could done. Class is just like a chain, subclass just inherits some functions or abilities.  


## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:
1. Directly modifying the DOM will make system hard to determine if changes have been made. React will compare current object with a previous copy, traverse the entire object tree and then compare each variable and value to find out the changes. This progress will extremely increase complex and also go against to re-rendering DOM.
2. Directly modifying the DOM will also lose some performance we may add in the future such as version go backing.

## Question:  What is composition, and why is it often favored over inheritance?

### Answer:

Composition is the process of combining two or more classes into one class but not fully inherit the whole content from parent classes.

Comparing with inheritance, using composition is:
1. Much easier to change or add new features in later, doesnot have to be fully defined in advance.
2. Face to what object could do, hence composition doesnot have to create new object to use functions in class, which could avoid the bugs caused by missing the "new" instruction.


## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:
 
There is no JavaScript engine yet that natively supports ES6 modules. NodeJS use CommonJS as engine which has technical difference with ES6 modules:

1. CommonJS use '"require" to load whole modules dynamically, but ES6 could selectively import pieces in the module.
2. CommonJS load modules synchronous, but ES6 using "import" could loading asynchronous.

## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:
 
1.Most browsers do not support commonJs as rendering engine, because they lack four global parameters: module, exports, require, global. Hence browsers can not use "require".
2.Browsers just load js files directly by tags. And they could load ES6 modules by tag <script> with property type="module". Browsers do not use "import".

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:
 
 A side effect is a local change in state influencing values outside of the immediate context, such as modifying external variable or object property.

Side effects make programs harder to understand and test, also make bugs in a program much harder to find and prevent.