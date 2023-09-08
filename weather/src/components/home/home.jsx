import axios from 'axios';
import { useState,useRef } from 'react';
import WeatherCard from '../weatherWidget/weatherWidget';




const Home =  (e) => {
    // e.preventdefault();
//     not recommended
//    const [cityName, setCityName] = useState("");
const [weatherData, setweatherData] = useState ([]);
  
const cityNameRef = useRef(null);


  const submitHandler = async (e) => {
    e.preventDefault();


    console.log("cityName:" , cityNameRef.current.value) 
    
    
    let API_KEY = '03b4bab7aafa03272197e29200c2b488'

    try{
     const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${API_KEY}&units=metric`
        )
            console.log(response.data);

            setweatherData([response.data, ...weatherData] );
        
        }catch(error) {
            console.log(error.data);
        
        }


}

    

  

    return <div>
    <form  onSubmit={submitHandler}>
        <label htmlFor="cityNameInput">cityNameInput</label>
        <input
         type="text"
          id="cityNameInput"
           required 
           minLength={2} 
           maxLength={20}
        //    onChange={ (e) => setCityName(e.target.value)}
           ref = {cityNameRef}
            />
        <br />
        <button type="submit"> get weather</button>
    </form>

    <hr />

    {weatherData.length ?(

    weatherData.map((eachWeatherData, index) => {
    return<WeatherCard key={index} weatherData={eachWeatherData}/>;
    })
    
    ) : (<div> No Data </div>
)  }

    </div>
    
}

export default Home;