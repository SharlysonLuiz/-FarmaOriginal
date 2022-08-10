// importando o nosso express
const express = require('express')
//const { ObjectId } = require("mongodb");
const app = express()

app.use(express.urlencoded({extended:true}))


// conectando o banco de dados

const MongoClient =require('mongodb').MongoClient
const uri = "mongodb+srv://dbUser:dbUser@cluster0.rcapfpn.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(uri,(err, client) =>{
    if(err) return console.log(err)
    db = client.db('bancoPlus')
    
    app.listen(3000 , () =>{
        console.log("RODANDO")
    })
})


// static file
app.use(express.static('public'))
app.use('/css', express.static(__dirname +'public/css'))
app.use('/js', express.static(__dirname +'public/js'))
app.use('/img', express.static(__dirname +'public/img'))

//set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req,res) =>{
    res.render('home')
})
app.get('/login', (req,res) =>{
    res.render('login')
})
app.get('/RecSenha', (req,res) =>{
    res.render('RecSenha')
})
app.get('/register', (req,res) =>{
    res.render('register')
})

app.post('/show',(req,res)=>{
    console.log(req.body)
})

app.get('/', (req,res) =>{
    let cursor = db.collection('clientePlus2').find()
})
/*
app.post('/register',(req,res) =>{
    db.collection("clientePlus").insertOne(req.body,(err,result) => {
        if(err) return console.log(err)
        console.log("salvou no nosso banco")
        res.redirect("/register")
        db.collection("clientePlus").find().toArray((err,results)=>{
            console.log(results)
        })
    })
})
*/

app.post('/register',(req,res) =>{
    db.collection("clientePlus2").insertOne(req.body,(err,result) => {
        if(err) return console.log(err)
        console.log("salvou no nosso banco")
        res.redirect("/register")
        db.collection("clientePlus2").find().toArray((err,results)=>{
            console.log(results[results.length-1].password)
            console.log(results[results.length-1].email)
        })
    })
})

app.post('/login',(req,res)=>{
    var email1 = req.body.email
    var senha = req.body.password
    var query = {email:email1,password:senha}
    db.collection("clientePlus2").find(query).toArray((err,results)=>{
        if (results[0] == undefined ) return res.send('<script type="text/javascript">alert("Não encontrado");window.location = "http://localhost:3000/login";</script>')
        res.redirect("/")

    })
    
})



//permitir servidor se comunicar com o navegador


// ALTERAÇAO DA MINHA BRANCH, SSE TU VER ESSE CODIGO PEDRO,EU TO TESTANDO REMIFICACOES