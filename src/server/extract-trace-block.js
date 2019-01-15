const fs = require('fs');
const path = require('path');

const log = fs.createReadStream(path.join(__dirname,'__data/trace-blocks.log'));
let newLinechar = Buffer.from('\n\n');
let leftOver = Buffer.from('');

/**
 * Modifies the passed buffer
 *
 * @param buff
 * @returns {Array}
 */
function getBlocksFrom(buff){
    let blocks = [];
    let data = Buffer.concat([leftOver,buff]);
    let index = data.indexOf(newLinechar);
    while(-1!==data.indexOf(newLinechar)){
        let block = data.slice(0,index);
        blocks.push(block);
        data = data.slice(index+1);
    }
    leftOver = data;
    return blocks;
}



log.on('data',data=>{

    let blocks = getBlocksFrom(data);
    Buffer.concat([leftOver,data]);
    console.log(blocks)
})

log.on('error',err=>{
    console.log(err);
})

log.on('close',()=>{

    console.log('stream closed')
})