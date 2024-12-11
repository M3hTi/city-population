const myApi = "z/0AqA+NBZ0NRo+z8ydeCw==05PG1TJdTCMgWd7x"
const searchBtn = document.querySelector('#js-search')
const searchInput = document.querySelector('#cityInput')
const inputGroup = document.querySelector('.input-group')


function getInfo(e) {
    if(e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')){
        e.preventDefault();
        const cityValue = searchInput.value
        try {
            if(cityValue === '') {
                const existingDetails = document.querySelector('.city-details');
                if (existingDetails) {
                    existingDetails.remove();
                }
                throw new Error("Pls Enter Your City Name")
            }
            fetch(`https://api.api-ninjas.com/v1/city?name=${cityValue}`,{
                method: 'GET',
                headers: {
                    'X-Api-Key': myApi,
                },
            })
            .then(Response => {
                if(!Response.ok) throw new Error('server\'s response is failed')
                return Response.json()
            })
            .then(data => {
                console.log(data);
                showInfo(data[0])
            })
            .catch(error => {
                console.error(error)
            })
            
        } catch (error){
            console.error(error)
        }
    }
}




function showInfo(obj){
    // Remove any existing city details before adding new ones
    const existingDetails = document.querySelector('.city-details');
    if (existingDetails) {
        existingDetails.remove();
    }

    const cityDetailContainer = document.createElement('div')
    cityDetailContainer.className = 'city-details'


    const populationContainer = document.createElement('div')
    populationContainer.className = 'detail-item'
    cityDetailContainer.appendChild(populationContainer)


    const populationLabel = document.createElement('span')
    populationLabel.className = 'label'
    populationLabel.textContent = 'Population:'
    populationContainer.appendChild(populationLabel)


    const populationValue = document.createElement('span')
    populationValue.className = 'value'
    populationValue.textContent = `${obj.population}`
    populationContainer.appendChild(populationValue)






    const countryContainer = document.createElement('div')
    countryContainer.className = 'detail-item'
    cityDetailContainer.appendChild(countryContainer)

    const countryLabel = document.createElement('span')
    countryLabel.className = 'label'
    countryLabel.textContent = 'Country:'
    countryContainer.appendChild(countryLabel)

    const countryValue = document.createElement('span')
    countryValue.className = 'value'
    countryValue.textContent = `${obj.country}`
    countryContainer.appendChild(countryValue)

    
    inputGroup.appendChild(cityDetailContainer)

}


















searchBtn.addEventListener('click', getInfo)
searchInput.addEventListener('keydown', getInfo)






















