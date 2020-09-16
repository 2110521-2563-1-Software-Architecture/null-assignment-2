const [processName, script, ...args] = process.argv;

// select client
// const client = require('../null-assignment-1/rest-v2/client');
const client = require('../null-assignment-1/grpc/client');


// please restart server every run
// how to run: node benchmark_d.js
(async () => {
    // insert some books for initial

    // make it so that server has N books
    
    const currentBooks = 1;
    
    const SIZES = [1, 4, 16, 64, 256, 1024, 4096];
    
    for (let targetSize of SIZES) {
        const startIndex = currentBooks;
        // make it so that server have `targetSize` books
        await client.insertBooks(Array(targetSize-currentBooks).fill(0).map((_, i) => ({id: startIndex+i, title: "a", author:"b"})));

        const NBENCH = 100;
    
        const t1 = Date.now();
        for (let i=0; i<NBENCH; i++) {
            await client.listBooks();
        }
        const t2 = Date.now();
        console.log(`listSize = ${targetSize}, took: ${(t2-t1)/NBENCH} ms per request`);
    }

})()