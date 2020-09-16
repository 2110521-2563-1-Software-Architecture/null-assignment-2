const [processName, script, ...args] = process.argv;

// select client
const client = require('../null-assignment-1/rest-v2/client');
// const client = require('../null-assignment-1/grpc/client');


// please restart server every run
// how to run: node benchmark_c.js
(async () => {
    // insert some books for initial
    await client.insertBooks(Array(4096).fill(0).map((_, i) => ({id: i, title: "a", author:"b"})));    

    let promises;
    // vary size
    const REQS = [1, 4, 16, 64, 256, 1024, 4096];
    const num = 1;
    for (let N of REQS) {
        const NBENCH = 4096*2/N;

        const t1 = Date.now();
        for (let i=0; i<NBENCH; i++) {
            // make `N` concurrent requests
            promises = Array(N).fill(0).map((_, i) => client.getBook(i));
            await Promise.all(promises);
        }
        const t2 = Date.now();
        console.log(`N = ${N}, took: ${(t2-t1)/NBENCH} ms per request`);
    }

})()