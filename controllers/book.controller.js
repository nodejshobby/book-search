const books = require('google-books-search');

bookIndex=async (req,res,next)=>{
    const bookTitle=req.query.title || ''; //The book title from query parameter
    const pageNumber=req.query.page || 1;   //The page number from query parameter
    const limit=12;                         //Number of data displayed per page
    const offset=(pageNumber-1)*limit;       //Calculated offset
    //Api conditional search
   if(bookTitle){

       //Api parameters loaded
        const options = {
            key: process.env.GOOGLE_BOOK_API_KEY,
            field: 'title',
            offset: offset,
            limit: limit,
            type: 'books',
            order: 'relevance',
            lang: 'en'
        };
        
        //A cool call to the api from google host
        await books.search(bookTitle, options, function(error, results, apiResponse) {
            if (!error) { 
                const count =apiResponse ? apiResponse.totalItems : 0; //Number of total results
                const pages= Math.ceil(count/limit) //Number of calculated chunked pages
                return res.render('index',{page: pageNumber ,search: bookTitle, pages: pages, results: results, message:''});
            } else {
                console.log(error.message);
                return res.render('index',{page: '' ,search: '',results: '', message: error.message});
            }
        });
   }
   else{
        return res.render('index',{page: '' ,search: '',results: '' ,message: ''});
   }
}

module.exports=bookIndex;