import readline from "readline";
import https from "https";

const apiKey = "5230a3d52880cffd7eb7fa78";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Modern JavaScript Way
(async () => {
  try {
    const res = await fetch(apiUrl);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data.conversion_rates);

      rl.question("Enter the amount in USD: ", (amount) => {
        rl.question(
          "Enter the currency you want to convert to ",
          (currency) => {
            currency = currency.toUpperCase();
            if (data.conversion_rates[currency]) {
              const convertedAmount = amount * data.conversion_rates[currency];
              console.log(
                `${amount} USD is equal to ${convertedAmount} ${currency}`
              );
              rl.close();
            } else {
              console.log("Invalid currency");
            }
          }
        );
      });
    } else {
      console.error("Unable to fetch data");
    }
  } catch (error) {
    console.log("Error occured while fetching data", error.message);
  }
})();

// Old JavaScript Way
https.get(apiUrl, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const exchangeRates = JSON.parse(data).conversion_rates;
    console.log(exchangeRates);

    rl.question("Enter the amount in USD: ", (amount) => {
      rl.question("Enter the currency you want to convert to: ", (currency) => {
        currency = currency.toUpperCase();
        if (exchangeRates[currency]) {
          const convertedAmount = amount * exchangeRates[currency];
          console.log(
            `${amount} USD is equal to ${convertedAmount} ${currency}`
          );
          rl.close();
        } else {
          console.log("Invalid currency");
        }
      });
    });
  });

  res.on("error", (error) => {
    console.log("Error occured while fetching data", error.message);
  });
});
