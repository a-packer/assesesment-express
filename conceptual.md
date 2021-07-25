### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  nesting promises
  async and await

- What is a Promise?
  code that is sent before the code resolves with a status of pending or resolved

- What are the differences between an async function and a regular function?
  async function will stop on await points before continuing on with the following code
  regular code just carries on

- What is the difference between Node.js and Express.js?
  Node.js allows a user to use javascript for backend work (outside of a web browser)
  Express.js is a backend framework for Node.js for web apps and API's (the most popular framework for Node)

- What is the error-first callback pattern?
  check for error first in the routes. If error occurs, jump to error handling
  else: run the relevant code

- What is middleware?
  code that happens before or after every request depending on where the code is in the file (top or bottom)

- What does the `next` function do?
  next tells express to pass on to the next middleware function or route that matches the request

- What does `RETURNING` do in SQL? When would you use it?
  Terminates the code and returns control to the caller of the terminated code
  Can indicate the sucess or failure of a procedure


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

since each call for a user doesn't depending on the other, consider removing the await from each line, and use await until after each call is sent
make the function dry by saving 'https://api.github.com/users' to a variable then use a string template literal
it might be better to just have a getUser() function and a getUsers() function

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
