const { validateDependencies } = require("./checks");

validateDependencies();

console.log("🖥️  Welcome to wrun cli");

const args = process.argv.slice(2);

if (args[0] === "about") {
  console.log("👋 check more about at https://github.com/wanderlima/wrun");
} else {
  console.log("Try: wrun about");
}
