const client = require('./client');

(async () => {
    const N = 20000;
    
    const t1 = Date.now();
    for (let i=0; i<N; i++) {
        await client.listBooks();
    }
    const t2 = Date.now();
    
    console.log("took: ", (t2-t1)/N, "ms");
})()