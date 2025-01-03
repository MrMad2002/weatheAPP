import { useEffect, useRef, useState } from 'react'
import './App.css'
import Clock from './clock'
import camera from './assets/cameraLens.png'
import search from './assets/search.png'
import cloud from './assets/cloud.png'
import snow from './assets/snow.png'
import rain from './assets/rain.png'
import wind from './assets/wind.png'
import humidity from './assets/humidity.png'
import drizzle from './assets/drizzle.png'
import clear from './assets/clear.png'



function App() {
  const [cityName, setCityName] = useState('Delhi')
  const [weatherData, setWeatherData] = useState(false)
  const apiKey = 'e7c4f3ad39dd3e35abd3c12129caa88c';
  const allIcons = {
    '01d':snow,
    '01n':snow,
    '02d':cloud,
    '02n':cloud,
    '13d':snow,
    '13n':snow,
    '04d': drizzle,
    '04n': drizzle,
    '09d': snow,
    '09n': snow,
    '03d': cloud,
    '03n': cloud,
    '50d': clear,
    '50n': clear,
    '10d' : rain,
    '10n' : rain,
    '11n' : wind,
    '11d' : wind
  }
    
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
 
  const fetchWeatherData = async () => {
    try{
      const response = await fetch(apiLink);
      const data = await response.json();
       
      console.log(data)
      setWeatherData({
        temperature:Math.floor(data.main.temp),
        humidity: data.main.humidity ,
        wind: data.wind.speed,
        city: data.name,
        icon: data.weather[0].icon,
        

      })
      } catch(error) {
        console.error('error fetching data:', error);
    }
  }
  
  useEffect(() =>
    fetchWeatherData, []
  )

  return (
    <>

        <div className='rounded-3xl bg-pink-300 p-0.5 justify-self-center' 
            style={{height:'560px', width:'292px', borderRadius:'38px', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.3)'}}>
        
          <div className='justify-center flex flex-wrap px-3'
              style={{ height:'100%', width:'100%', backgroundImage: `URL('https://st4.depositphotos.com/11246114/22951/i/450/depositphotos_229513910-stock-photo-beautiful-blue-sky-clouds-background.jpg')`, backgroundSize:'cover',border: '9px solid black', borderRadius:'38px' }}>
        
              <div
                  className="flex bg-black justify-center items-center text-center rounded-2xl px-2 mt-2"
                  style={{ width: '90px', height: '25px' }} >
                  <img src={camera} alt="Camera Lens" className="h-4 w-4 opacity-30" />
                  <div className="bg-zinc-900 w-12 h-3 ml-1 rounded-r-2xl opacity-30"> . . .
                  </div>
              </div>

              {/* <div className='w-full rounded-3xl mt-3'> <Clock /></div> */}
              <div className="flex bg-slate-100 justify-between items-center mt-3 rounded-2xl h-11 w-full">
                  <input
                  type="text"
                  placeholder="Search"
                  className=" h-full w-10/12 bg-slate-2200 text-black placeholder-gray-500 rounded-l-2xl px-2 focus:outline-none"
                  onChange={(e) => setCityName(e.target.value)} 
                  onKeyDown={(e) => {if(e.key ==='Enter'){fetchWeatherData()}}}/>
                  <button className='bg-slate-100 active:bg-slate-200 h-full rounded-r-2xl w-2/12'><img
                  src={search} 
                  alt="Search Icon"
                  className="h-6 ml-2 mr-1 cursor-pointer"
                  onClick={() => fetchWeatherData()} /> </button>
              </div>
        
              <div className='text-3xl text-white '>
                  <img src={allIcons[weatherData.icon] || clear} alt=''
                  className='h-36 w-36'/>
                  <div className='-mt-2'>
                      <p> {weatherData.temperature}°C </p>
                      <p> {weatherData.city || '_____' } </p>
                  </div>
              </div>

              <div className='flex flex-row font-bold text-sm text-slate-800 rounded-2xl mt-3 items-baseline'>
              <div className=' flex flex-col justify-center rounded-2xl p-2 w-20'
              style={{backgroundColor: "rgba(0, 0, 0, 0.07)", height:"145px", width: '110px'}}>
                <img src={humidity} alt='' className='h-14 w-16 mb-5 ml-4'/>
                <div>
                    <p> {weatherData.humidity || "_____"}% </p>
                    <p> Humidity </p>
                </div>
              </div> 
              <div className='flex flex-col rounded-2xl justify-center ml-5 p-2 ' 
              style={{backgroundColor: "rgba(0, 0, 0, 0.07)", height:"145px", width: '110px'}}>
                <img src={wind} alt=''
                className='h-14 w-16 mb-5 ml-4'/>
                <div>
                    <p> {weatherData.wind}Km/h </p>
                    <p> Wind </p>
                </div>
              </div> 
              </div>
        
              <div className='h-4 w-full bg-none flex flex-col justify-end justify-self-end'>
                  <div className='bg-neutral-400 h-1 w-24 rounded-full self-center '></div>
              </div>
        
          </div>
        
        </div>
        
    </>
  )
}

export default App   