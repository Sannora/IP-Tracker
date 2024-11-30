import axios from "axios";
import { createContext, useEffect, useState } from "react";

const QueryContext = createContext();

export const QueryProvider = ({children}) => {

    // Client kullanıcısının verilerini tutacak useState hook'u
    const [clientData, setClientData] = useState({
        ip: '',
        location: '',
        timezone: '',
        isp: '',
    })

    // Arama sonucu döndürülen yanıt verilerini tutacak useState hook'u
    const [responseData, setResponseData] = useState({
        ip: '',
        location: '',
        timezone: '',
        isp: '',
    })

    // Kullanıcı girdisini tutacak useState hook'u
    const [inputData, setInputData] = useState("");

    // Error durumunda error bilgisini tutacak useState hook'u
    const [error, setError] = useState("");

    // Sayfa açıldığında mevcut kullanıcı IP ve konum bilgilerini çeken axios isteği fonksiyonu
    useEffect(() =>{
        
        const getClientIp = async () => {

            try {

                const response = await axios.get(`https://ipinfo.io?token=f2d64f3908c05c`);
                const [lat , lng] = response.data.loc.split(",")
                console.log(response.data)
                /*console.log(response.data.ip)
                console.log(response.data.location.region + ' , ' + response.data.location.city + ' / ' + response.data.location.country)
                console.log('UTC ' + response.data.location.timezone)
                console.log(response.data.isp)
                console.log(response.data.location.lat)
                console.log(response.data.location.lng)*/
                setClientData({
                    ip: response.data.ip,
                    location: response.data.region + ' , ' + response.data.city + ' / ' + response.data.country,
                    timezone: response.data.timezone,
                    isp: response.data.org,
                    lat: lat,
                    lng: lng,
                })
            } catch (error) {
                
                setError("Sorry, it seems like we can not find your IP address.")

            }

        }

        getClientIp();
    }, [])

    // Kullanıcının girdisine göre veri çeken axios isteği fonksiyonu
    const getIp = async () => {
        
        try {
            const response = await axios.get(`https://ipinfo.io/${inputData}?token=f2d64f3908c05c`)
            const [lat , lng] = response.data.loc.split(",")
            console.log(response.data)
            setResponseData({
                ip: response.data.ip,
                    location: response.data.region + ' , ' + response.data.city + ' / ' + response.data.country,
                    timezone: response.data.timezone,
                    isp: response.data.org,
                    lat: lat,
                    lng: lng,
            })
        } catch (error) {
            
            setError("Invalid input. Please enter a valid IPv4 or IPv6 address.");

        }

    };

    const changeInputHandler = (event) => {
        setInputData(event.target.value);
      };

      return(

        <QueryContext.Provider value={{ clientData, responseData, inputData, changeInputHandler, getIp, error }}>
            {children}
        </QueryContext.Provider>

      )

}

export default QueryContext