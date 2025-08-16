const { sync: commandExistsSync } = require("command-exists");

function validateDependencies() {
  if (!commandExistsSync("gh")) {
    console.error("❌ GitHub CLI (gh) is required. https://cli.github.com/");

    process.exit(1);
  } else if (!commandExistsSync("git")) {
    console.error("❌ Git (git) is required. https://git-scm.com/");

    process.exit(1);
  }
}

module.exports = { validateDependencies };
