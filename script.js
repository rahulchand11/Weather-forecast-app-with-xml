const inputcity = document.querySelector(".cityvalue");
const cityname = document.querySelector(".city-name");
const image = document.getElementById("images");
const temp  = document.querySelector(".temperature");
const humid = document.querySelector(".temp-humidity");
const humidpercentage = document.querySelector(".humid-percentage");
const windspeed= document.querySelector(".wind-speed");
const searchicon = document.querySelector(".search");
let dynamicIcon = document.createElement("img");


// Api call and other functions
const apicall = function(city){
    const APIkey= 'ff163cee6ddd3b2790b3fd0477261cfe';
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputcity.value}&appid=${APIkey}`;
    if (inputcity.value === "") {
        alert("Please Enter an city")
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', APIURL, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4) {
            console.log(xhr.status);
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(this.responseText);
                // console.log(data);
            let celsiustemp = Math.floor(data.main.temp - 273.15);        
            cityname.innerHTML = `${data.name}`;
            humid.innerHTML = `${data.weather[0].description}`
            windspeed.innerHTML = `${data.wind.speed}Km/h<br>Wind-Speed`;
            humidpercentage.innerHTML = `${data.main.humidity}%<br>Humidity`;
            temp.innerHTML = `${celsiustemp}&deg;C`;
             dynamicIcon.setAttribute("src", `https:/openweathermap.org/img/wn/${data.weather[0].icon}.png`);
             console.log(data.weather[0].icon);
              dynamicIcon.setAttribute("id", "images");
                 switch(data.weather[0].main){
        case 'Clouds':
            image.src = "/assets/cloud.png";
            break;
        case 'Clear':
            image.src = "/assets/clear.png";
            break;
        case 'Rain':
            image.src = "/assets/rain.png";
            break;
        case 'Mist':
            image.src = "/assets/mist.png";
            break;
        case 'Snow':
           image.src = "/assets/snow.png";
            break;

    }
               image.replaceWith(dynamicIcon);
            console.log(data.weather[0].icon);    
            } else {
                console.log("Bad Request");
            }
        }
    }
    xhr.send();
    }
    
}

// Fetch API button event listener.
searchicon.addEventListener("click", function(){
    apicall(inputcity.value);
    // console.log(inputcity.value);
})
