const express = require("express");
const mysql = require('mysql');

const app = express();

const database = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lethalcompany'
});

database.connect((err) => {
  if (err) {
    console.error('MySQL Connection Error:', err.message);
    process.exit(1);
  }
  console.log('MySQL Connected');
});

const fetchData = async (API) => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba a fetch során:', error);
      return "Error!"
    }
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//get functions
function getData(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const getRows = "SELECT * FROM default_commands";

  database.query(getRows, (err, result) => {
    if (err) {
      console.error('MySQL Query Error:', err.message);
      return next(err);
    }
    res.send(result);
  });
}

function getCommands(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const getRows = "SELECT Command FROM default_commands";

  database.query(getRows, (err, result) => {
    if (err) {
      console.error('MySQL Query Error:', err.message);
      return next(err);
    }
    res.send(result);
  });
}

function getDataByCommand(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let command = req.params.Command;
  const getRow = `SELECT Text FROM default_commands WHERE Command = '${command}'`;

   database.query(getRow, (err, result) => {
    if (err) {
      console.error('MySQL Query Error:', err.message);
      return next(err);
     }
    res.send(result[0]);
  });
}

async function getJoke(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let data = await fetchData("https://v2.jokeapi.dev/joke/Any?type=single")

  res.send(
    { Text: `Here is a joke:\n\n${data.joke}` }
  )
}

async function getWeather(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let API = "https://api.open-meteo.com/v1/forecast?latitude=47.6833&longitude=17.6351&current=temperature_2m,snowfall,weathercode&timezone=Europe%2FBerlin&forecast_days=1"
  
  let data = await fetchData(API)
  
  const date = new Date();
    res.send(
      {
        Text: `Today is ${date.toLocaleString('en-us', { weekday: 'long' })} and the time is ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}.\n\nThe current weather outside is ${data.current.temperature_2m}°C`
      }
    )
}

async function getBored(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let API = "https://www.boredapi.com/api/activity";

  let data = await fetchData(API)
  
    res.send(
        {
          Text: `If you are bored do the following:\n\n${data.activity}`
        }
      )
}

function getRandom(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let rnd = randomNumber(1, 10);

  res.send({Text: `Here is your random number: ${rnd}`})
}

app.get("/", getData);
app.get("/commands", getCommands);
app.get("/joke", getJoke);
app.get("/weather", getWeather);
app.get("/bored", getBored);
app.get("/random", getRandom);
app.get("/:Command", getDataByCommand);

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Szerverhiba' });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Az alkalmazás a ${port}-es porton fut`);
});

process.on('SIGINT', () => {
  database.end((err) => {
    if (err) {
      console.error('MySQL Connection End Error:', err.message);
    } else {
      console.log('MySQL Connection Closed');
    }
    process.exit();
  });
});