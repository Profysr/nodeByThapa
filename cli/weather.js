import readline from "readline";

const apiKey = "efa5b568cbd0978db8c6a0fe508e18f2";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

const url = `http://api.openweathermap.org/data/2.5/weather?q=pune&appid=efa5b568cbd0978db8c6a0fe508e18f2&units=metric`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async () => {
  rl.question("Enter the city name: ", async (city) => {
    const res = await fetch(
      `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(`Error while fetching response ${res.status}`);
    }
    rl.close();
  });
};

getWeather();
