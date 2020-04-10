const form = document.querySelector('form')
const loc = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = loc.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }        
    });
    
})
})

