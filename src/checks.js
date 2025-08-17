// src/checks.js
import chalk from "chalk";
import { sync as commandExistsSync } from "command-exists";

export function validateDependencies() {
  if (!commandExistsSync("gh")) {
    console.error(
      chalk.red("❌ GitHub CLI (gh) is required.") +
        " " +
        chalk.blue("https://cli.github.com/")
    );
    process.exit(1);
  }

  if (!commandExistsSync("git")) {
    console.error(
      chalk.red("❌ Git (git) is required.") +
        " " +
        chalk.blue("https://git-scm.com/")
    );
    process.exit(1);
  }
}
