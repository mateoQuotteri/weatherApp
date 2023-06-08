/*
ChatGPT

Para hacer que tu aplicación 
del clima se muestre dinámicamente según la ubicación que el usuario coloque, 
aquí tienes los pasos generales que debes seguir:

    Obtener la ubicación del usuario: Utiliza la API de geolocalización del 
    navegador para obtener la ubicación actual del usuario. 
    Esto se puede lograr utilizando el objeto navigator.geolocation y llamando al método
     getCurrentPosition(). Esto te proporcionará las coordenadas de latitud y longitud del usuario.

    Convertir las coordenadas en ubicación: Utiliza una API de 
    geocodificación inversa, como la API de Google Maps Geocoding,
     para convertir las coordenadas de latitud y longitud en una ubicación legible 
     para los usuarios, como la ciudad y el país. Envía una solicitud a la API de geocodificación 
     inversa con las coordenadas y procesa la respuesta para obtener la ubicación.


    Obtener datos del clima: Utiliza una API de pronóstico del clima, como OpenWeatherMap 
    o AccuWeather, para obtener los datos del clima para la ubicación actual. 
    Envía una solicitud a la API del pronóstico del clima, proporcionando l
    a ubicación (puede ser la ciudad o las coordenadas) y 
    procesa la respuesta para obtener los datos relevantes, como la temperatura, 
    la descripción del clima, etc.

    Mostrar los datos del clima: Utiliza JavaScript para actualizar dinámicamente 
    los elementos HTML en tu página con los datos del clima obtenidos. P
    uedes seleccionar los elementos apropiados en el DOM utilizando métodos como 
    querySelector() y getElementById(), y luego modificar su contenido 
    o atributos para reflejar los datos del clima.

    Recuerda que cada paso implica el uso de APIs externas y puede requerir la generación de claves de API y el manejo adecuado de las solicitudes y respuestas. Asegúrate de leer y comprender la documentación de las API
    que planeas utilizar y seguir las mejores prácticas de seguridad y manejo de errores. */
    
const paisesSelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');
const advice = document.getElementById("advice")    
const form = document.getElementById("form")
   
const temperatura = document.getElementById("temperatura")
const humedad = document.getElementById("humedad")
const lluvia = document.getElementById("probabilidad-lluvia")
const vientoDireccion = document.getElementById("direccion-viento")
const cieloCubierto = document.getElementById("coberturadelCielo")
const vientoVelocidad = document.getElementById("velocidadViento")
const presionAtmosferica =   document.getElementById("presion")


 window.onload = async function () {
    
     await fetch("https://restcountries.com/v3.1/all")
     .then(response => response.json())
     .then(paises => {
        paises.forEach(pais => {
        
          const option = document.createElement('option');
          option.value = pais.name.common;
          option.text = pais.name.common;
          paisesSelect.appendChild(option);
        })
        })

        citySelect.value = ""; 
}



paisesSelect.addEventListener("change" , async function (event) {
    let paisSeleccionado = paisesSelect.value;
    console.log();
    await fetch(`https://restcountries.com/v3.1/name/${paisSeleccionado}?fullText=true`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if (data[0].capital[0] === undefined ) {
        advice.classList.remove("hidden")
        return
      }else citySelect.value = data[0].capital[0]; 
})
})
/*
curl --request GET \
     --url 'https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=7tvEvoUX2LHij7UECpL1OYuqwj5oVmgW' \
     --header 'accept: application/json'
*/
     form.addEventListener("submit" , async function (e) {
      e.preventDefault()
        const city = citySelect.value
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=7tvEvoUX2LHij7UECpL1OYuqwj5oVmgW`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    })
     })



/*
fetch('https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=7tvEvoUX2LHij7UECpL1OYuqwj5oVmgW', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  */