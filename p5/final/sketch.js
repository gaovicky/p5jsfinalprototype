var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=11769368576be5c3583c2050bd6ad840'; //apiKey
var units = '&units=metric';
var input;
var rain = [];
var cloud = [];

function setup() {
  createCanvas(500,500);

  var button = select('#submit');
  button.mousePressed(weatherResults); //shows results when mouse is pressed

  input = select('#city');

  for (i = 0; i < 100; i++) {
    rain[i] = new drawRain();
    cloud[i] = new drawCloud();
  }
}

function weatherResults() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(78, 129, 247); //blue
  if (weather) {
    if (weather.weather[0].main === "Clouds") {
    background(78, 129, 247); //blue
       for (i = 0; i < cloud.length; i++) {
         cloud[i].movingCloud();
       }
    } else if (weather.weather[0].main === "Clear") {
      ellipse(100,100,200,200);
    } else if (weather.weather[0].main === "Mist") {
      rect(100,100,100,300);
    } else if (weather.weather[0].main === "Snow") {
      rect(100,100,500,300);
    } else if (weather.weather[0].main === "Rain") {
      background(86, 89, 93); //grey
      for (i = 0; i < rain.length; i++) {
        rain[i].fallingRain();
      }
    } else if (weather.weather[0].main === "Haze") {
      ellipse(100,100,50,50);
    } else {
      ellipse(100,100,200,400);
    }
    print(weather.weather[0].main);
    text(weather.weather[0].description, 200, 200);
  }
}

class drawRain {
  constructor() {
    this.x = random(-30,530);
    this.y = random(0,-4000);
    this.length = 30;
  }

  fallingRain() {
    noStroke();
    fill(198, 215, 255); //light blue
    ellipse(this.x, this.y, 4, this.length);
    this.y = this.y + 6 // + frameCount/60;
    if (this.y > 500) {
      this.y = 0;
    }
    if (this.length < 0) {
      this.length = 0;
    }
  }
} //code of rain falling https://editor.p5js.org/son/sketches/ry8-HnOAQ
//
// function drawSun() {
//   //insert code of sun rotating https://editor.p5js.org/monicawen/sketches/HkU-BCJqm
// }
//
class drawCloud {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.w = 75;
    this.h = 55;
  }

  movingCloud() {
    noStroke();
    fill(255, 254, 250); //off white
    ellipse(this.x, this.y - 20, this.w, this.h);
    ellipse(this.x - 55, this.y - 5, this.w, this.h);
    ellipse(this.x + 50, this.y, this.w, this.h);
    ellipse(this.x + 20, this.y + 15, this.w, this.h);
    ellipse(this.x - 30, this.y + 13, this.w, this.h);
    this.x += 0.1;
  }
  //code of clouds moving across https://editor.p5js.org/mena-landry/sketches/D7ql4Nd3V
}
//
// function drawSnow() {
//   //nsert code of snow https://p5js.org/examples/simulate-snowflakes.html
// }

//<---REFERENCES--->
// Rain:
// https://editor.p5js.org/son/sketches/ry8-HnOAQ
// Sun:
// https://editor.p5js.org/monicawen/sketches/HkU-BCJqm
// Snow:
// https://p5js.org/examples/simulate-snowflakes.html
// Cloud:
// https://editor.p5js.org/mena-landry/sketches/D7ql4Nd3V
//
// Current Weather Data for over 200,000 cities:
// https://openweathermap.org/current
//
// 10.5: Working with APIs in Javascript - p5.js Tutorial https://youtu.be/ecT42O6I_WI
// 10.6: API Query with User Input - p5.js Tutorial https://youtu.be/4UoUqnjUC2c
