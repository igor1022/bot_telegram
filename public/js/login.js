let form = document.querySelector('form');

const send = async(ev) => {
    //ev.preventDefault();
    let sendForm = new FormData(form);
    const date = new Date();
    sendForm.append('date', date);
    const result = await axios.post('/auch/login', sendForm);
    console.log(result);
} 

form.addEventListener('submit', (ev) => {send(ev)});

