const os = require('os');
const trimChar = require('../lib/trim-char');


const boundary = os.EOL+os.EOL+os.EOL;
let leftOver = '';

/**
 * Modifies the passed buffer
 *
 * @param buff
 * @returns {Array}
 */
function getBlocksFrom(buff){
    let blocks = [];
    let data = leftOver+buff;
    while(-1!==data.indexOf(boundary)){
        let index = data.indexOf(boundary);
        let block = data.slice(0,index);
        blocks.push(block);
        data = data.slice(index+boundary.length);
    }
    leftOver = data;
    return blocks;
}

//Remember node modules are shared. So even the left over variable is shared
//This implementation is flawed because if a certain trace block is very huge, the application will start hogging
//memory since everything is stored in leftover until the boundary is reached
//@TODO how can you safegurad against memory crash??

module.exports = {
    getBlocks:function(data,cb){
        let blocks = getBlocksFrom(data);
        blocks = blocks.map(block=>{
           return trimChar(block,'\n');
        });
        blocks.forEach(cb);
    },
    getLeftOver:function(){
        return trimChar(leftOver,'\n');
    }
}
