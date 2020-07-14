// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
"use strict";

module.exports = [
  {
    type: "input",
    name: "name",
    message: "What's rule's name?",
  },
  {
    type: "input",
    name: "description",
    message: "What's rule's description?",
  },
];
