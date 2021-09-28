const express=require('express');
const router=express.Router();
const bookController=require('../controllers/book.controller');

router.get('/', bookController);

module.exports=router;