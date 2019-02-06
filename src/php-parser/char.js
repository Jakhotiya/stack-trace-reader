
function isSemicolon(char){
    return char===';'
}

/**
 * @ is error control operator in php. http://php.net/manual/en/language.operators.errorcontrol.php
 *
 * Also checkout out  http://php.net/manual/en/language.operators.execution.php
 *
 * @param char
 * @returns {boolean}
 */
function isOperator(char){
    return -1!==['+','-','*','/','=','?',':','<','>','>>','<<','%','!','&','|','^','~','**','@','.'].indexOf(char);
}

function isNewLineChar(charCode){
    return -1!==[10,11,12,13].indexOf(charCode);
}

function isSpaceChar(){
    return -1!==[9,32].indexOf(charCode);
}



module.exports = {isSemicolon,isOperator,isNewLineChar,isSpaceChar};