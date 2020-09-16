const [processName, script, ...args] = process.argv;

const client = require('../null-assignment-1/rest-v2/client');
// const client = require('../null-assignment-1/grpc/client');

const N = parseInt(args[0]);

// please restart server every run
// run: node benchmark_a.js <num_of_books>
(async () => {
    const NBENCH = 4096*10/N;
    const book = { id: 123, title: "A Tale of Two Cities", author: "Charles Dickens" };
    // duplicate books
    const books = Array(N).fill(0).map(e => book);
    // console.log("books", books.length);

    const t1 = Date.now();
    for (let i=0; i<NBENCH; i++)
        await client.insertBooks(books);
    const t2 = Date.now();
    console.log(`N = ${N}, took: ${(t2-t1)/NBENCH} ms per request`);
})()