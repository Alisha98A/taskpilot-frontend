const validator = require("css-validator");
const fs = require("fs");

// CSS files
const cssFiles = [
  "./src/index.css",
  "./src/App.module.css",
  "./src/styles/ContactForm.module.css",
  "./src/styles/Button.module.css",
  "./src/styles/Dashboard.module.css",
  "./src/styles/NavBar.module.css",
  "./src/styles/NoteDetail.module.css",
  "./src/styles/NoteList.module.css",
  "./src/styles/SignInUpForm.module.css",
  "./src/styles/TaskCreate.module.css",
  "./src/styles/TaskDetail.module.css",
  "./src/styles/TaskList.module.css",
  "./src/styles/WelcomePage.css"
];

// Wrap validator in a promise
function validateCss(css) {
  return new Promise((resolve, reject) => {
    validator({ text: css }, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// Filter out some known warnings you want to ignore
function filterWarnings(warnings) {
  const ignoredPatterns = [
    /vendor extension/i,
    /deprecated/i,
    /-webkit-scrollbar/i
  ];
  return warnings.filter(
    (warn) => !ignoredPatterns.some(pattern => pattern.test(warn.message))
  );
}