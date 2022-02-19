const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
//https://code.visualstudio.com/docs/nodejs/nodejs-debugging

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use(express.static('client'))

app.set('json spaces', 2);

app.get('/json', (req, res) => {
    console.log(req.query)
    console.log(req.query.a)
    res.json({ a: 1 });
})

app.get('/client', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', '/index.html'));
});

app.get('/client/form.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', '/form.html'));
});

app.post('/form', function(req, res) {
    console.log(req.body)
    console.log('form post')
});

app.get('/', (req, res) => {
    //console.log('hi')
    //debugger
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.get('/about', (req, res) => {
    res.send('about')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})