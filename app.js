const place = document.querySelector("input");
const msgcontainer = document.querySelector(".hide-display");
const body = document.querySelector(".total")
const error = document.querySelector(".er");
place.addEventListener('keyup',(evt)=>{
    if (evt.keyCode === 13){
       evt.preventDefault();

        const name=evt.target.value;
        getdata(name);
        removehide();
        
    }
})

const removehide = () =>{
    msgcontainer.style. display="block";
}


const getdata = async(name) => {
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8546a0ad0f8e7773e80c00b42a59e720&units=metric`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
        try
        {
            document.querySelector("#city").innerHTML=data.name;
            document.querySelector("#temp").innerHTML=Math.round(data.main.temp)+"°C";
            document.querySelector("#sky").innerHTML=data.weather[0].main;
            document.querySelector("#humidityCheck").innerHTML=data.main.humidity+"%";
            document.querySelector("#windspeed").innerHTML=Math.round(data.wind.speed)+"km/h";
            console.log(data.weather[0].main);

            if(data.weather[0].main==="Clouds"){
                document.body.style.backgroundImage="url(/images/clouds.avif) ";
                // document.body.style.backgroundRepeat="no-repeat";
            }
            else if(data.weather[0].main==="Haze"){
                document.body.style.backgroundImage="url(/images/haze.avif) ";

            }
            else if(data.weather[0].main==="Clear"){
                document.body.style.backgroundImage="url(/images/clear.webp) ";

            }
            
            else if(data.weather[0].main==="Rain"){
                document.body.style.backgroundImage="url(/images/rain.avif) ";

            }
            
            else if(data.weather[0].main==="Mist"){
                document.body.style.backgroundImage="url(/images/mist.avif) ";

            }
        }
        catch(error)
        {
            msgcontainer.style. display="none";
            document.body.style.background="rgba(83, 91, 84, 0.1)";
            error.classList.remove("hide");



        }
    }





