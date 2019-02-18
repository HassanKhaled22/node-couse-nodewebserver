const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
let app=express();



hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
})


app.use((req,res,next)=>{
let now =new Date().toString();
let log=`${now}  ${req.method} ${req.url}`
console.log(log);
fs.appendFileSync('server.log',log)

    next()
})


// app.use((req,res,next)=>{
// res.render('maintance.hbs',{
//     text:'the site is upating come back later'
// })
// })


app.use(express.static(__dirname+'public'))


app.set('view engine','hbs');


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'home page',
        welcom:'welcom to our site'

    })
})

hbs.registerHelper('screamit',(text)=>{
   return text.toUpperCase();
})
   

// res.send({
//     name:'hassan',
//     likes:[
//         'biking',
//         'football',
//         'vediogame'
//     ]
// })
// }) 

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'about us',
        
    })
})


app.get('/bad',(req,res)=>{
    res.send({
        erroreMeassage:'the server  is crashed'
    })
})



app.listen(3000)