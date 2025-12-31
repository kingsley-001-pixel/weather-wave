import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";


function Weather() {

    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Nigeria');
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState('--')
    const showAlert = useRef(false)
    const [isDark, setIsDark] = useState(false)

    // WELCOME MESSAGE
    useEffect(() => {
        if(!showAlert.current) {alert('Welcome to the Weather Wave! Click below " ⁰C " to view temperature in Celsius or " ⁰F " to view temperature in Farenheit')
        showAlert.current = true;
        }
    }, [])

    // FETCHING WEATHER API
    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const response = await fetch (`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
        }
        fetchWeatherData();
    }, [city]);

    // SETTING STATE OF CITY TO USER'S INPUT TO FETCH DATA
    const handleCity = () => {
        const inputedCity = document.getElementById('countryInput').value
        setCity(inputedCity)
        document.getElementById('countryInput').value = ''
    }
    

    // CHANGE OF TEMPERATURE UNIT TO USER'S PREFERENCE
    const handleCelsius = () => {
        setTemp(`${weatherData.current.temp_c}⁰C`)
    }
    const handleFarenheit = () => {
        setTemp(`${weatherData.current.temp_f}F`)
    }

    // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // ADDING EVENT LISTENER OF "ENTER" TO RUN SEARCH
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleCity()
        }
    })

    const handleTheme = () => {
        document.documentElement.classList.toggle('dark')
        setIsDark(!isDark)
        // const themeBtn = document.getElementById('themeBtn')
        // if(document.documentElement.classList.contains('dark')) {
        // themeBtn
        // }
    }

    // DISPLAY OF LOADING DUE TO DELAY IN FETCH API
    if(loading) return <div className="bg-sky-400 
                            text-slate-800 
                            font-semibold
                            text-3xl 
                            rounded-lg 
                            flex 
                            min-h-screen
                            items-center 
                            justify-center"
                            >Loading...</div>

    // DISPLAY OF DATA FETCHED SUCCESSFULY
    return (
        <div className="min-w-full 
                        grid 
                        items-center 
                        justify-center 
                        flex-wrap 
                        h-screen 
                        box-border">
                            
            {/* WEATHER CONTAINER */}
            <div className="flex items-center justify-center mb-[-100px]">
                <h1 className="text-yellow-300 text-2xl font-bold">WEATHER WAVE</h1>
            <button onClick={handleTheme} className="cursor-pointer  ml-14"><FontAwesomeIcon 
            className="text-slate-800 
                        text-2xl 
                        dark:text-sky-400"
                        id="themeBtn"
                        icon={isDark ? faSun : faMoon}/>
            </button>
            </div>
            
            <div className="bg-sky-400 
                            text-slate-800 
                            font-semibold 
                            w-72 
                            h-96 
                            rounded-lg 
                            text-center 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            p-0 
                            text-lg
                            dark:bg-slate-800
                            dark:text-sky-400
                            " 
                            id="weatherContainer">
                
            {/* SEARCH BAR CONTAINER */}
            <div className="mb-28 mt-[-30px]" id="searchBar">
                {/* SEARCH BAR */}
                <input type="search" 
                            className="rounded-md 
                            focus:bg-slate-200 
                            shadow-md 
                            shadow-slate-500 
                            ring-1 
                            ring-neutral-200 
                            p-1 
                            h-7 
                            focus:text-sky-400 
                            focus:font-normal 
                            placeholder:font-normal" 
                            placeholder="Enter country name..." 
                            id="countryInput"/>
                {/* SEARCH BUTTON */}
                <button id="searchBtn"><FontAwesomeIcon                                                  onClick={handleCity}
                                className="text-white
                                                        ml-2 
                                                        text-xl" 
                                                        icon={faMagnifyingGlass} />
                </button>
            </div>

            {/* BODY CONTAINER */}
            <div className="space-y-2 mt-[-90px] relative" id="body">
                {/* COUNTRY NAME */}
                <h1 className="text-2xl">{weatherData.location.name}</h1>
                {/* <h3>{days[new Date().getUTCDay()]}</h3> */}
                {/* ICON REPRESENTATION OF WEATHER */}
                <img className="w-[4.5rem]
                                ml-5" 
                                src={weatherData.current.condition.icon}
                                alt="Weather Icon" />
                {/* TEMPERATURE BLOCK */}
                <div className="tempMeasurement">
                    {/* TEMPERATURE DISPLAY */}
                    <h2 id="temp">{temp}</h2>
                {/* CHANGE TO CELSIUS BUTTON */}
                <button className="text-white mr-4 hover:text-gray-300" onClick={handleCelsius}>&deg;C </button>
                {/* CHANGE TO FARENHEIT BUTTON */}
                <button className="text-white ml-4 hover:text-gray-300" onClick={handleFarenheit}> &deg;F</button>
                </div>
                    {/* DISPLAY OF  */}
                    <h3>{weatherData.current.is_day ? `Day 🌕` : 'Night 🌑'}</h3>
                {/* DESCRIPTION OF WEATHER */}
                <h3>{weatherData.current.condition.text}</h3>
                {/* DISPLAY OF WIND SPEED */}
                <h3>Wind: {weatherData.current.wind_mph}mph</h3>
            </div>
            </div>
        </div>
    );
}

export default Weather;