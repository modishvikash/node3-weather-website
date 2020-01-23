console.log('client side javascript is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const msg1 = document.querySelector('#message-1')
msg1.textContent = '';

const msg2 = document.querySelector('#message-2')
msg2.textContent='';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value

    console.log(location)
    const url = '/weather?address='+location;

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error;
                msg2.textContent = "";
            }else{
                msg1.textContent = data.address;
                msg2.textContent = data.forecast;
            }
            
        })
    })
})