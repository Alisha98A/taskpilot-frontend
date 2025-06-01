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

async function validateCssFile(filePath) {
  try {
    const css = fs.readFileSync(filePath, "utf-8");
    console.log(`Validating file: ${filePath}`);

    const data = await validateCss(css);

    if (data.errors.length === 0) {
      console.log(`✅ No errors found in ${filePath}`);
    } else {
      console.log(`❌ Errors in ${filePath}:`);
      data.errors.forEach((err) => console.log("  - " + err.message));
    }

    const filteredWarnings = filterWarnings(data.warnings);

    if (filteredWarnings.length > 0) {
      console.log(`⚠️ Warnings in ${filePath}:`);
      filteredWarnings.forEach((warn) => console.log("  - " + warn.message));
    }
  } catch (err) {
    console.error(`Error validating ${filePath}:`, err);
  }
}

async function validateAll() {
  for (const file of cssFiles) {
    await validateCssFile(file);
  }
}

validateAll();