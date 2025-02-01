import chalk from "chalk";
import https from "https";

const getJoke = () => {
  const url = "https://v2.jokeapi.dev/joke/Any";

  https.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const joke = JSON.parse(data);

      console.log(`Here is the random ${joke.category} joke:`);
      console.log(chalk.red(`${joke.setup}`));
      console.log(chalk.blue.bgRedBright.bold(`${joke.delivery}`));
    });

    res.on("error", (err) => {
      console.log("Error occured while fetching data", err.message);
    });
  });
};

getJoke();
