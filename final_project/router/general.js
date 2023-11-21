const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred."})
        } else {
            return res.status(404).json({message: "user with same name already exists."});
        }
    }
    return res.status(404).json({message: "Unable to register"});
});



// Get the book list available in the shop
public_users.get('/books',function (req, res) {
    res.send(JSON.stringify(books,null,1));
        return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn])
    return res.status(300).json({message: "Yet to be implemented"});
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let bookauthor = [];
    let isbn = Object.keys(books);
    isbn.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        bookauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({bookauthor}, null, 4));
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booktitle = [];
    let isbn = Object.keys(books);
    isbn.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booktitle.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({booktitle}, null, 4));
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbnreviews = req.params.isbn;
    let reviews = books[isbnreviews]["reviews"];
    res.send(reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

// Code for task 10
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Task 10"));
});

// Code for task 11
public_users.get('/books/isbn/:isbn',function (req, res) {
    const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('Cannot find ISBN'));
        }
    });
    get_books_isbn.
        then(function(){
            console.log("Task 11");
   }).
        catch(function () { 
                console.log('Cannot find ISBN');
  });
});

// Code for task 12
public_users.get('/books/author/:author',function (req, res) {
    const get_books_author = new Promise((resolve, reject) => {
    let booksbyauthor = [];
    let isbn = Object.keys(books);
    isbn.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        bookauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({bookauthor}, null, 4)));
      }
});
get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
});

// Code for task 13
public_users.get('/books/title/:title',function (req, res) {
    const booktitle = new Promise((resolve, reject) => {
    let booktitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booktitle.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booktitle}, null, 4)));
      }
    });
    reject(res.send("The mentioned title does not exist "))      
    });
    get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned title does not exist');
  });
module.exports.general = public_users;