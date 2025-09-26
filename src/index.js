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
    {
      name: "amend multiple - edit multiple commits messages",
      value: "amend-multiple",
    },
    { name: "← Back", value: "back" },
  ],
};

async function showMainMenu() {
  const mainMenu = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Select a category:",
      choices: [
        ...Object.keys(categories).map((c) => ({ name: c, value: c })),
        { name: "Exit", value: "exit" },
      ],
    },
  ]);
  return mainMenu.category;
}

if (!category || !categories[category]) {
  category = await showMainMenu();
  if (category === "exit") {
    console.log("Goodbye! 👋");
    process.exit(0);
  }
}

async function showSubMenu(category) {
  while (true) {
    const subMenu = await inquirer.prompt([
      {
        type: "list",
        name: "command",
        message: `Select a ${category} command:`,
        choices: categories[category],
      },
    ]);

    if (subMenu.command === "back") {
      const newCategory = await showMainMenu();
      if (newCategory === "exit") {
        console.log("Goodbye! 👋");
        process.exit(0);
      }
      return { category: newCategory, command: null, shouldContinue: true };
    }

    return { category, command: subMenu.command, shouldContinue: false };
  }
}

if (!command || !categories[category].some((c) => c.value === command)) {
  const result = await showSubMenu(category);
  if (result.shouldContinue) {
    category = result.category;
    const nextResult = await showSubMenu(category);
    command = nextResult.command;
  } else {
    command = result.command;
  }
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

      case "amend-multiple":
        const { commitCount } = await inquirer.prompt([
          {
            type: "input",
            name: "commitCount",
            message: "How many commits do you want to rebase?",
            default: "2",
            validate: (input) => {
              const num = parseInt(input);
              if (isNaN(num) || num < 1) {
                return "Please enter a valid number greater than 0";
              }
              return true;
            },
          },
        ]);

        console.log("\n📝 Instructions:");
        console.log("You will be prompted with the last commit messages.");
        console.log(
          "Change 'pick' to 'reword' for commits you want to edit and save to proceed with edition.\n"
        );

        await execa("git", ["rebase", "-i", `HEAD~${commitCount}`], {
          stdio: "inherit",
        });

        break;
    }
    break;
}
