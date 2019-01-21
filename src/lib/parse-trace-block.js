/**
 * Can be a generic utility that return string between two given strings excluding the two strings
 */
function getTextBetween(str,start,end){
    let a = str.indexOf(start);
    a += start.length;
    let temp = str.slice(a).trim();
    let b = end  ? temp.indexOf(end) : false;
    if(!b)
        return temp;
    return temp.slice(0,b).trim();
}

module.exports = function parse(block){

    if(block.indexOf('TRACE:')===-1 || (block.indexOf('SQL:')===-1 && block.indexOf('TRANSACTION')===-1 && block.indexOf('CONNECT')===-1 ) || block.indexOf('TIME:')===-1){
        //@TODO remove console.log and add the block string in the error message
        console.log(block);
        throw new Error('Invalid Trace block. Make sure your block contains keywords  "TRACE:", "SQL:" and  "TIME:"');
    }

    let result = {};
    result.request = block.indexOf('REQUEST:')!==-1 ? getTextBetween(block,'REQUEST:','##') : 'unknown';
    let sql = block.indexOf('SQL:')!==-1 ? getTextBetween(block,'SQL:','AFF:') : '';
    result.query = sql;
    result.query_time = getTextBetween(block,'TIME:','TRACE');
    result.trace = getTextBetween(block,'TRACE:');
    return result;
}

