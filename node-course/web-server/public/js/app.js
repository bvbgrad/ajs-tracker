
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

console.log('Client side javascript is loaded')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchInput.value
    
    messageOne.textContent = 'Use this site to get your weather'
    messageTwo.textContent = ''
    
    const url = "http://34.125.187.11:3000/weather?address=" + location
    console.log(url)
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastSummary
            }
        })
    })    
})