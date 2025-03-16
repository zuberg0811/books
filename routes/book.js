const express = require('express')
const router = express.Router()
const BookModel = require('../models/BookModel')

//view all books
//URL: localhost:3000/book
router.get('/', async (req, res) => 
   {
    console.log("123")  
   let books = await BookModel.find({}).sort({"_id" : -1})
   res.render('book/books', { books })
})

router.get('/list', async (req, res) => {
   //get all book data from database
   //latest books => oldest books: sort by _id descending
   let books = await BookModel.find({}).sort({ "_id": -1 })
   //show book data
   //res.send(books)
   //Path: views/book/book_list.hbs
   res.render('book/book_list', { books })
})

//delete book
//URL: localhost:3000/book/delete/book_id
router.get('/delete/:id', async (req, res) => {
   //get book id from URL
   let id = req.params.id
   //find book id in DB to delete
   await BookModel.findByIdAndDelete(id)
   //redirect to book list page after deletion
   res.redirect("/toy/list")
})

//add new book (1) => render add form
//URL: localhost:3000/book/add
router.get('/add', (req, res) => {
   res.render("book/book_add")
})

//add new book (1) => process data from add form
router.post('/add', async (req, res) => {
   //save data from form to variable
   let book = req.body
   //add data to database
   await BookModel.create(book)
   //redirect to book list page after adding
   res.redirect("/toy/list")
})

//edit book (1) => render edit form
//URL: localhost:3000/book/edit/book_id
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let book = await BookModel.findById(id)
   res.render('book/book_edit', { book })
})


//edit book (2) => process edit form
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let book = req.body
   await BookModel.findByIdAndUpdate(id, book)
   res.redirect("/toy/list")
})

module.exports = router