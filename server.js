const express = require('express');
const app = express();
const port = 4131 
const sendEmail = require('./resources/js/email');
app.set("views", "templates");
app.set("view engine", "pug");
app.use(express.static('resources'));
app.use('/images', express.static('resources/images'));
app.use('/js', express.static("resources/js"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// login 
app.get('/', (req , res) => {
    res.render("emailpage.pug");
})

app.post('/endpoint/send-email', (req,res) =>{
    // Grab crap and verify 
    body = req.body;    
    sendEmail(body).catch(console.error).then(x => {
        if(x){
            res.render('success.pug');
            console.log("SUCCESS");
        }else{
            res.render('failure.pug');
            console.log("A failure occured");
        }
    });
    
})
app.listen (port , () => {
    console.log(`Emailer app listening on port ${port}`)
  })