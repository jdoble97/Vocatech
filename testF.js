const fetch = require()

fetch('http://localhost:7777',{
    method: 'post',
    body: JSON.stringify({
        'field1': 'joorge',
        'field2': 'afdadf'
    })
})
    .then(resp=>console.log(resp));