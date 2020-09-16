const request = require("superagent");

const listBooks = async () => {
    await request.get('http://localhost:3000/books/list')
}
const insertBook = (id, title, author) => {
    request.post("http://localhost:3000/books/insert")
    .send({id: parseInt(id), title, author})
    .then(res => {
        console.log(res.body);
    });
}
const getBook = (id) => {
    request.get("http://localhost:3000/books/get")
    .query("id="+String(id))
    .then(res => {
        console.log(res.body);
    })
    .catch(err => {
        console.log(err.message);
    });
}
const deleteBook = (id) => {
    request.delete("http://localhost:3000/books/delete")
    .query("id=" + String(id))
    .then(res => {
        console.log(res.body);
    })
    .catch(err => {
        console.log(err.message);
    });
}

module.exports = {
    listBooks,
    insertBook,
    getBook,
    deleteBook,
};