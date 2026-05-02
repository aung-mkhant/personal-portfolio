---
title: "My Experience With Typescript"
excerpt: "Why isn't Javascript enough? Why write more? Are we stupid?"
date: "2026-03-12T20:54:02Z"
author: "Aung Min Khant"
tags:
  - Typescript
  - Javascript
---

![Starting Point](/assets/blog/my-experience-with-typescript/cover.jpg)

### I Hated Typescript

It's true. Imagine writing extra code for every code. I mean, a good programmer strives to write less. Why would you go out of your way to write more?

That is what I thought about Typescript at first, but as my project grew larger, I began to see the shortcomings of Javascript. In fact, Typescript has to be the best thing Microsoft ever created.

#### Take this function for example:

```javascript:example.js
function getDiscountedPrice(price, discount) {
    return price - discount;
}
```

Normally you could pass in whatever arguments you want to the function and it would just run.

```javascript
const brokenTotal = getDiscountedPrice(100, "10% off")
```

In this case, the function will return `100 - "10% off"` which is `NaN` (Not a Number). Common bugs like this can happen when you have a large codebase and you forget what type of data each function is supposed to receive and return.

This is where Typescript comes into play.

#### In Typescript, you write:

```typescript:example.ts
function getDiscountedPrice(price: number, discount: number): number {
    return price - discount;
}
// If you pass in a string instead of number, Typescript will throw an error at compile time.
const brokenTotal = getDiscountedPrice(100, "10% off"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

Typescript will warn you if you are writing bad code. This allows you to catch errors at compile time instead of runtime. Or better yet, Typescript automatically infers the types for you whenever possible so you write less types and still get the benefits of type safety.

#### Still Typescript but types are inferred:

```typescript:example.ts
function getDiscountedPrice(price, discount) ...

const price = 100; // TS knows this is a number
const discount = 10; // TS knows this is a number
const total = getDiscountedPrice(price, discount); // TS knows total is a number
```

One could think of Typescript as an inconvenience when learning it. In fact, Javascript's still perfectly fine for small to medium-sized projects. But I assure you, as soon as your project grows larger and more people start to work on it, future-you and developers on your team will thank you for having used Typescript.
