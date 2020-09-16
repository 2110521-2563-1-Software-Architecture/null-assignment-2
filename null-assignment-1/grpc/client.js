const grpc = require("grpc");

const booksProto = grpc.load("books.proto"); // .<filename>

const client = new booksProto.books.BookService('127.0.0.1:50051',
    grpc.credentials.createInsecure());

const printResponse = (err, books) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Response:", books);
    }
};

const listBooks = () => {
    return new Promise((resolve, reject) => {
        client.list({}, (err, res) => {
            if (err !== null) reject(err);
            else (resolve(res));
        });
    });
};
const insertBook = (id, title, author) => {
    const book = {id: parseInt(id), title, author};
    return new Promise((resolve, reject) => {
        client.insert(book, (err, res) => {
            if (err !== null) reject(err);
            else (resolve(res));
        });
    });
}
// use array of books so that client won't need to create new array every request
const insertBooks = (books) => {
    return new Promise((resolve, reject) => {
        client.insertBooks({books: books}, (err, res) => {
            if (err !== null) reject(err);
            else (resolve(res));
        });
    });
}
const getBook = (id) => {
    const bookIdRequest = {id: parseInt(id)};
    return new Promise((resolve, reject) => {
        client.get(bookIdRequest, (err, res) => {
            if (err !== null) reject(err);
            else (resolve(res));
        });
    });
}
const deleteBook = (id) => {
    const bookIdRequest = {id: parseInt(id)};
    return new Promise((resolve, reject) => {
        client.delete(bookIdRequest, (err, res) => {
            if (err !== null) reject(err);
            else (resolve(res));
        });
    });
}
const watchBooks = () => {
    const call = client.watch({});
    call.on('data', (book) => {
        console.log("Recv book:", book);
    });
}


module.exports = {
    listBooks,
    insertBook,
    insertBooks,
    getBook,
    deleteBook,
    watchBooks,
};


// const [processName, scriptName, command, ...args] = process.argv;
// if (command === "list")
//     listBooks();
// else if (command === "insert") 
//     insertBook(args[0], args[1], args[2]);
// else if (command === "get")
//     getBook(args[0]);
// else if (command === "delete")
//     deleteBook(args[0]);
// else if (command === "watch")
//     watchBooks()
// else if (command == "insertMany") {
//     const n = parseInt(args[3]);
//     const book = {id: parseInt(args[0]), title: args[1], author: args[2]};
//     const books = [];
//     for (let i=0; i<n; i++)
//         books.push(book);
//     insertBooks(books);    
// }
// else {
//     console.log(`Usage:
// node client.js list                            List all books
// node client.js insert <id> <title> <author>    Insert a book
// node client.js get <id>                        Get a book by its ID
// node client.js delete <id>                     Delete a book by its ID
// node client.js watch                           Watch for inserted books`);
// }