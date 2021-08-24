window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    //If geolocation exists in the browser
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a1eff9363228335966b48423ec4446dd`;
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                console.log(data);
                //Set DOM Elements from the API and convert to proper units
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for celcius
                let celcius = (temperature - 32) * (5 / 9);

                setIcons(icon, document.querySelector(".icon"));
                //Change temperature to celsius/farenheit
                temperatureSection.addEventListener('click', () => {
                   if (temperatureSpan.textContent === 'F') {
                       temperatureSpan.textContent = 'C';
                       temperatureDegree.textContent = celcius.toFixed(2);
                   } 
                   else {
                       temperatureSpan.textContent = 'F';
                       temperatureDegree.textContent = temperature;
                   }
                });
                //Fetch the second API for location
                return fetch(api2);
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const name = data.name;
                console.log(data);
                console.log(name);
                locationTimezone.textContent = name;

            })

        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});