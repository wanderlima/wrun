#!/usr/bin/env node
import inquirer from "inquirer";
import { execa } from "execa";

import { validateDependencies } from "./checks.js";

validateDependencies();

const args = process.argv.slice(2);

let category = args[0];
let command = args[1];

const categories = {
  git: [
    { name: "pr - create pull request", value: "pr" },
    { name: "reset - soft reset last commit", value: "reset" },
    { name: "amend - edit last commit message", value: "amend" },
  ],
};

if (!category || !categories[category]) {
  const mainMenu = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Select a category:",
      choices: Object.keys(categories).map((c) => ({ name: c, value: c })),
    },
  ]);
  category = mainMenu.category;
}

if (!command || !categories[category].some((c) => c.value === command)) {
  const subMenu = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: `Select a ${category} command:`,
      choices: categories[category],
    },
  ]);
  command = subMenu.command;
}

switch (category) {
  case "git":
    switch (command) {
      case "pr":
        await execa("gh", ["pr", "create", "--fill", "--web"], {
          stdio: "inherit",
        });
        break;

      case "reset":
        await execa("git", ["reset", "--soft", "HEAD~1"], {
          stdio: "inherit",
        });
        break;

      case "amend":
        await execa("git", ["commit", "--amend"], {
          stdio: "inherit",
        });
        break;
    }
    break;
}
