/*-------------REQUIRE-------------*/

    //Inicializando express y sus plugins
const express = require('express')
const bodyParser = require('body-parser') //bodyParser permite jugar con los datos de los formularios
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

    //El resto de cosas
var mongodb = require('mongodb')
var mongoose = require('mongoose')

/*-------------MONGODB-------------*/
const dburl = 'mongodb://localhost:27017/'
var db

mongodb.connect(dburl, (err, client) =>{
    if (err) return console.log(err)
    db = client.db('test')

        //Iniciando la escucha
    var server = app.listen(port, ()=>{
        console.log('Servidor a la espera en http://' + server.address().address + ':' + server.address().port)
    })
})

/*-------------CONFIGURACIÓN-------------*/

var port =  process.env.PORT || 3000 //puerto

    //Haciendo que /app sea la ruta por defecto
app.get('/', function (req, res) {
    return res.redirect('/app')
})
    //_dirname devuelve el directorio en el que se encuentra el servidor
app.get('/app', (req, res) =>{
    res.sendFile(__dirname + '/app/index.html')
})

    //Por alguna razón, no se pueden importar archivos JS sin que el servidor le indique la ruta
app.get('/script/index_script.js', function (req, res) {
  res.sendFile(__dirname + '/app/script/index_script.js');
});


/*-------------FUNCIONES CRUD-------------*/

    //Devuelve un JSON con todos los datos que contiene la base de datos
app.get('/shana', (req, res) =>{
    db.collection('formulario1').find().toArray((err, jotason) =>{
        if (err) return console.log(err)
        res.status(200).json(jotason)
    })
})

    //C - Create / Añadir documento
app.post('/anyadirDocumento', (req, res, next) =>{
    db.collection('formulario1').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/') //para no dejar estancado al usuario
    })
})

    //R - Read / Leer documento
app.post('/leerDocumento', (req, res, next) => {
    db.collection('formulario1').findOne({_id: new mongodb.ObjectID(req.body._id)}, (err, jotason) =>{
        if (err) return console.log(err) 
        res.status(200).json(jotason)
    })
})

    //U - Update / Actualizar documento
app.post('/editarDocumento', (req, res, next) => {
    db.collection('formulario1').updateOne({_id: new mongodb.ObjectID(req.body._id)}, req.body, (err, jotason) =>{
        if (err) return console.log(err)
    }) 
})

    //D - Delete / Borrar documento
app.post('/borrarDocumento', (req, res, next) => {
    db.collection('formulario1').deleteOne({_id: new mongodb.ObjectID(req.body._id)}, (err, jotason) =>{
        if (err) return console.log(err)
    })
})