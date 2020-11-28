const url = 'http://localhost:7777'

function sendCredentials(){
    fetch(`${url}/login`,{
        method: 'post',

    })
}

function extractValuesForm(){
    let user = document.getElementById('id');
    console.log(user.nodeValue)
}