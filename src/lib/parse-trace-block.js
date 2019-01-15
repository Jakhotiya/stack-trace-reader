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

    let result = {};
    result.request = block.indexOf('REQUEST:')!==-1 ? getTextBetween(block,'REQUEST:','##') : 'unknown';
    let sql = getTextBetween(block,'SQL:','AFF');
    result.query = sql;
    result.query_time = getTextBetween(block,'TIME:','TRACE');
    result.trace = getTextBetween(block,'TRACE:');
    return result;
}

