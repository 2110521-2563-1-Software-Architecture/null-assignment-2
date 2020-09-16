const request = require("superagent");

const listBooks = async () => {
    return await request.get('http://localhost:3000/books/list')
}
const insertBook = async (id, title, author) => {
    return await request.post("http://localhost:3000/books/insert")
    .send({id: parseInt(id), title, author})
}
const insertBooks = async (books) => {
    return await request.post("http://localhost:3000/books/insertMany")
    .send({books})
}
const getBook = async (id) => {
    return await request.get("http://localhost:3000/books/get")
    .query("id="+String(id))
}
const deleteBook = async (id) => {
    return await request.delete("http://localhost:3000/books/delete")
    .query("id=" + String(id))
}

module.exports = {
    listBooks,
    insertBook,
    insertBooks,
    getBook,
    deleteBook,
};


// no need to implement watch for REST API

// const watchBooks = () => {
//     const call = client.watch({});
//     call.on('data', (book) => {
//         console.log("Recv book:", book);
//     });
// }

// const [processName, scriptName, command, ...args] = process.argv;
// if (command === "list") {
//     listBooks();
// }
// else if (command === "insert") 
//     insertBook(args[0], args[1], args[2]);
// else if (command === "get")
//     getBook(args[0]);
// else if (command === "delete")
//     deleteBook(args[0]);
// else {
//     console.log(`Usage:
// node client.js list                            List all books
// node client.js insert <id> <title> <author>    Insert a book
// node client.js get <id>                        Get a book by its ID
// node client.js delete <id>                     Delete a book by its ID
// node client.js watch                           Watch for inserted books`);
// }
// // else if (command === "watch")
//     // watchBooks()