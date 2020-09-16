const [processName, script, ...args] = process.argv;
// const client = require('../null-assignment-1/rest-v2/client');
const client = require('../null-assignment-1/grpc/client');


// please restart server every run
// run: node benchmark_b.js <method>
(async () => {
    const NBENCH = 100;
    const book = { id: 123, title: "A Tale of Two Cities", author: "Charles Dickens" };
    // duplicate books
    // const books = Array(N).fill(0).map(e => book);
    // console.log("books", books.length);

    // insert some books
    await client.insertBooks(Array(100).fill(0).map((e, i) => ({id: i, title: "a", author:"b"})));


    const t1 = Date.now();
    for (let i=0; i<NBENCH; i++) {
        switch (args[0]) {
            case "insert":
                await client.insertBook(i, "a", "b");
                break;
            case "list":
                await client.listBooks();
            break;
            case "get":
                await client.getBook(i);
                break;
            case "delete":
                await client.deleteBook(i);
                break;
        }
    }
    const t2 = Date.now();
    console.log(`method = ${args[0]}, took: ${(t2-t1)/NBENCH} ms per request`);
})()