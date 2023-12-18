import { useState } from 'react'
function App() {
  // for the current position for user
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [userAddress, setuserAddress] = useState("")
  const [clickButton, setClickButton] = useState(false)

  const updater = navigator.geolocation

  // for the dynamic GPS location of user
  const [GPSLatitude, setGPSLatitude] = useState(0)
  const [GPSLongitude, setGPSLongitude] = useState(0)
  const [GPSUserAddress,setGPSUserAddress] = useState()
  const [clickGPSButton, setClickGPSButton] = useState(false)

  // for stopping the live tracking
  const [stopButton, setStopButton] = useState(false)


  // get current user location (kind of static location)
  updater.getCurrentPosition((position) => {
    let userLatitude = position.coords.latitude
    let userLongitude = position.coords.longitude
    console.log("latitude is : " + userLatitude + "\nlongitude is : " + userLongitude);
    setLatitude(userLatitude)
    setLongitude(userLongitude)
  })

  // get user's GPS position location (kind of live location)
  // watch position will update the co-ordinates in real time (if used from phone)
  // PC doesn't have GPS
  const constantPosition = updater.watchPosition((positionGPS) => {
    let userGPSLatitude = positionGPS.coords.latitude
    let userGPSLongitude = positionGPS.coords.longitude
    console.log("GPS latitude is : " + userGPSLatitude + "\nGPS longitude is : " + userGPSLongitude);
    setGPSLatitude(userGPSLatitude)
    setGPSLongitude(userGPSLongitude)
  })

  const UserAddress = async () => {
    // use the longitude - latitude instead of opencage's default
    let APIurl = `[Replace Your openCage API]`
    const Address = (await fetch(APIurl))
    const data = await Address.json()
    console.log("Details are : ", data)
    setuserAddress(data.results[0].formatted)
    console.log(userAddress);
  }

  const GPSuserAddress = async () => {
    // use the longitude - latitude instead of opencage's default
    let GPSAPIurl = `[Replace Your openCage API]`
    const GPSAddress = (await fetch(GPSAPIurl))
    const GPSdata = await GPSAddress.json()
    console.log("Details are : ", GPSdata)
    setGPSUserAddress(GPSdata.results[0].formatted)
    console.log(GPSUserAddress);
  }

  const handleClickGetUserAddress = () => {
    setClickButton(true)
    UserAddress()
  }

  const handleClickGPSLocation = () => {
    setClickGPSButton(true)
    GPSuserAddress()
  }

  const stopGPS = () => {
    updater.clearWatch(constantPosition)
    setStopButton(true)
  }

  return (
    <>
      <h1>
        Current Location
      </h1>
      <h2>
        Latitude : {latitude}
      </h2>
      <h2>
        Longitude : {longitude}
      </h2>

      <button onClick={handleClickGetUserAddress}>
        Get your current location
      </button>
      {clickButton ? <h2>Address : {userAddress}</h2> : ""}
      <hr></hr>
      <h1>
        GPS Location
      </h1>
      <h2>
        GPS Latitude : {GPSLatitude}
      </h2>
      <h2>
        GPS Longitude : {GPSLongitude}
      </h2>
      <button onClick={handleClickGPSLocation}>
        Get your GPS located Information
      </button>
      {clickGPSButton ? <h2>Address by GPS : {GPSUserAddress}</h2> : ""}

      <hr></hr>

      <button onClick={stopGPS}>
        Stop GPS
      </button>
      {stopButton ? <h2>Stopped tracking !!</h2> : ""}

    </>
  )
}

export default App
