const [processName, script, ...args] = process.argv;
const client = require('../client');

const N = parseInt(args[0]);

(async () => {
    const NBENCH = 5000;
    const book = { id: 123, title: "A Tale of Two Cities", author: "Charles Dickens" };
    // duplicate books
    const books = Array(N).fill(0).map(e => book);

    const t1 = Date.now();
    for (let i=0; i<NBENCH; i++)
        await client.insertBooks(books);
    const t2 = Date.now();
    console.log(`N = ${N}, took: ${(t2-t1)/NBENCH} ms per request`);
})()