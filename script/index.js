const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=d001131f11e22571952ac96c3c096b0c'
const form = document.querySelector('form')
const output = document.querySelector('.output')
const input = document.querySelector('#inp')
const giphy = document.querySelector('.giphy')



const getWeather = async () => {
    let url = API + input.value + key
    const req = await fetch(url)
    const res = await req.json()
    renderWesther(res);
    getMap(res.coord)
    input.value = ''
}


renderWesther = (data) => {
    output.innerHTML = ''
    console.log(data);
    const title = document.createElement('h1')
    title.textContent = data.name
    const title2 = document.createElement('p')
    title2.textContent = Math.floor(data.main.temp - 273.15)
    const title3 = document.createElement('p')
    title3.textContent = Math.floor(((data.main.temp - 273.15) * 1.8) + 32)
    const title4 = document.createElement('p')
    title4.textContent = data.weather[0].main
    const title5 = document.createElement('p')
    title5.textContent = data.weather[0].description
    const title6 = document.createElement('p')
    title6.textContent = data.wind.deg
    const title7 = document.createElement('p')
    title7.textContent = data.wind.gust
    const title8 = document.createElement('p')
    title8.textContent = data.wind.speed
    const title9 = document.createElement('p')
    title9.textContent = data.sys.country

    if (data.weather[0].main == 'Clouds') {
        giphy.src = 'https://i.pinimg.com/originals/aa/96/97/aa9697a3f7a61389675b8dc109518753.gif'
    } else if (data.weather[0].main == 'Sunny') {
        giphy.src = `https://cdnimpuls.com/voxnews.al/media3/-640-0-sunny-day-when-sharks-attack-1672381912.gif`
    } else if (data.weather[0].main == 'Rain') {
        giphy.src = `https://media.tenor.com/LJg3Fh3QpwIAAAAd/rain.gif`
    } else if (data.weather[0].main == 'Snow') {
        giphy.src = `https://static.wixstatic.com/media/d43caf_f41dcd3bd8ed43ecb30470262737eb0d.gif`
    } else if (data.weather[0].main == 'Foggy') {
        giphy.src = `https://i.pinimg.com/originals/4f/9d/8f/4f9d8f32bf3103a9c8fbbce7a7075c09.gif`
    } else {
        giphy.src = `https://media.tenor.com/ldzGpnumnuwAAAAd/starry-night.gif`
    }

    output.append(title, title2, title3, title4, title5, title6, title7, title8, title9)
}


const getMap = ({ lat, lon }) => {

    let map = document.createElement('div')
    map.id = 'map'

    DG.then(() => {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('ADI!');
    });
    output.append(map)
}



form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})


