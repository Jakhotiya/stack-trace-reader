const fs = require('fs');
const path = require('path');
const storage = require('./src/server/storage');
const traceBlocks = require('./src/server/extract-trace-block');
let filename = process.argv[2];

const logStream = fs.createReadStream(path.join(__dirname,filename));


let num = 0;

logStream.on('data',data=>{
    let str = data.toString();
    traceBlocks.getBlocks(str,(block)=>{
        storage.saveTrace(block);
        num++;
    })
    console.log(`${num} blocks saved`)
})

logStream.on('error',err=>{
    console.log(err);
})

logStream.on('close',()=>{
    let block = traceBlocks.getLeftOver();
    storage.saveTrace(block);
    console.log('stream closed')
})