import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "* ",
});

const menuOpt = ["Add Todo", "View Todos", "Exit"];

const todos = [];
const showMenu = () => {
  menuOpt.forEach((opt, idx) => {
    console.log(`${idx + 1}. ${opt}`);
  });

  rl.question("Choose an option: ", (opt) => {
    switch (opt) {
      case "1":
        rl.question("Enter a todo:", (task) => {
          todos.push(task);
          console.log("\nTodo added successfully \n");
          showMenu();
        });
        break;

      case "2":
        console.log("\nTodos List");
        todos.forEach((todo, idx) => {
          console.log(`${idx + 1}. ${todo}`);
        });
        console.log("\n");
        showMenu();
        break;

      case "3":
        rl.close();
        console.log("Goodbye!");
        break;

      default:
        console.log("Invalid Option");
        showMenu();
        break;
    }
  });
};

showMenu();
