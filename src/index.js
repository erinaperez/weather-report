const state = {
    currentTempButton: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: 72,
    tempColor: null,
    sky: null,
    skySelect: null,
    landscape: null,
    cityNameInput: null,
    headerCityName: null,
    lat: null,
    lon: null,
    cityName: 'Seattle',
};

const handleTempColor = (tempValue) => {
  if (tempValue >= 80) {
    state.tempColor = 'red'; 
  } else if (tempValue >= 70 && tempValue < 80) {
    state.tempColor = 'orange';
  } else if (tempValue >= 60 && tempValue < 70) {
    state.tempColor = 'gold';
  } else if (tempValue >= 50 && tempValue < 60) {
    state.tempColor = 'green';
  } else if (tempValue < 50) {
    state.tempColor = 'teal';
  }
};

const handleWeatherGarden = (tempValue) => {
  if (tempValue >= 80) {
    state.landscape = '🌵 🏜 🐍 🦂 🏝️ 🦀 🐚 🌿 🌻 🍉';
  } else if (tempValue >= 70 && tempValue < 80) {
    state.landscape = '🌿 🌻 🐛 🍀 🌼 🌿 🦋 🍄 🌺 🐝';
  } else if (tempValue >= 60 && tempValue < 70) {
    state.landscape = '🌸 🐝 🌱 🐿️ 🌷 🐞 🍃 🐌 🪻 🐇';
  } else if (tempValue < 60) {
    state.landscape = '🛷 🍂 ☃️ 🍁 🌲 🍂 🪵 🍁 ⛄️ 🌲 🍂';
  }
};

const handleSky = () => {
  let skySelect = state.skySelect.value;
  if (skySelect === 'sunny') { 
    state.sky.textContent = '☀️ 😎 ☀️ 🫠 ☀️ 😎 ☀️ 🫠 ☀️ 😎 ☀️ 🫠 ☀️'; 
  } else if (skySelect === 'cloudy') {
    state.sky.textContent = '🌥️ 😶‍🌫️ ⛅️ ☁️ 🌥️ 😶‍🌫️ ⛅️ ☁️ 🌥️ 😶‍🌫️ ⛅️ ☁️'; 
  } else if (skySelect === 'rainy') {
    state.sky.textContent = '🌦 🌈 ⚡️ 🌧 ⛈ 🌈 ⚡️ 🌩️ 🌦 🌈 ⚡️ 🌧'; 
  } else if (skySelect === 'snowy') {
    state.sky.textContent = '🌨 ❄️ 🥶 ❄️ 🌨 ❄️ 🥶 ❄️ 🌨 ❄️ 🥶 ❄️ 🌨'; 
  } else if (skySelect === 'catsAndDogs') {
    state.sky.textContent = '🐱 🐈‍⬛ 🐶 🐩 🐱 🐈 🐶 🐕‍🦺 🐱 🐈 🐶 🦮'; 
  } else if (skySelect === 'chooseSky') {
    state.sky.textContent = '✨ 🌙 ✨ 🌞 ✨ 🌖 ✨ 🪐 ✨ 🌗 ✨ 💫'; 
  }
};

const handleTempUpdate = () => {
  handleTempColor(state.tempValue);
  handleWeatherGarden(state.tempValue)
  document.getElementById('tempValue').style.color = state.tempColor;
  document.getElementById('tempValue').innerHTML = state.tempValue;
  document.getElementById('landscape').innerHTML = state.landscape;
};

const handleTempBtnClick = (direction) => {
  if (direction === 'up') {
    state.tempValue += 1; 
  }
  else if (direction === 'down') {
    state.tempValue -= 1;
  }
  handleTempUpdate();
};

const handleLatLon = () => {
  axios.get('http://localhost:5000/location',
  {
    params: {
    q: state.cityName
      }
  })
  .then((response) => {
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    handleWeather()
  })
  .catch((error) => {
    console.log(error)
  })
};

const convertToFah = (temp) => Math.floor((Number(temp) - 273.15) * 9/5 + 32);

const handleWeather = () => {
  axios.get('http://localhost:5000/weather',
  {
    params: {
    lat: state.lat,
    lon: state.lon
      }
  })
  .then((response) => {
    state.tempValue = convertToFah(response.data.main.temp);
    handleTempUpdate()
  })
  .catch((error) => {
    console.log('bad weather')
    console.log(error)
  })
    };

const resetCityName = () => {
  state.cityName = 'Seattle';
  state.cityNameInput.value = state.cityName
  state.headerCityName.textContent =  state.cityName;
};

const handleCityName = (input) => {
  state.cityName = input;
  state.cityNameInput.value = state.cityName;
  state.headerCityName.innerHTML = state.cityName;
};

const loadControls = () => {
  state.currentTempButton = document.getElementById('currentTempButton');
  state.increaseTempControl = document.getElementById('increaseTempControl');
  state.decreaseTempControl = document.getElementById('decreaseTempControl');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.headerCityName = document.getElementById('headerCityName');
  state.cityNameInput.value = state.cityName;
  state.cityNameReset = document.getElementById('cityNameReset')
  state.headerCityName.innerHTML = state.cityName;
  state.sky = document.getElementById('sky');
  state.skySelect = document.getElementById('skySelect');
  handleTempUpdate();
  handleSky();
};

const registerEvents = () => {
  state.currentTempButton.addEventListener('click', handleLatLon);
  state.skySelect.addEventListener('change', handleSky);
  state.increaseTempControl.addEventListener('click', () => {
    handleTempBtnClick('up');
  });
  state.decreaseTempControl.addEventListener('click', () => {
    handleTempBtnClick('down');
  });
  state.cityNameInput.addEventListener('input', (event) => {
    handleCityName(event.target.value)
  });
  state.cityNameReset.addEventListener('click', resetCityName);
};

const onLoad = () => {
  loadControls();
  registerEvents();
};
onLoad();