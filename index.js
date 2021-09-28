require('dotenv').config();
const express=require('express');
const path=require('path');
const bookRouter=require('./routes/book.route');

const app=express();

const port=process.env.PORT || 3000;

app.use(express.static('public'));

app.set('view engine','ejs');

app.use('/', bookRouter);

app.listen(port,()=>{
    console.log(`Server started at port: ${port}`);
});

app.use((req,res,next)=>{
    const error=new Error("Page not found!");
    return res.render('index',{page: '' ,search: '',results: '' ,message: error.message});
});

