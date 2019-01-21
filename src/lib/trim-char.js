module.exports = function trimChar(str,char){
    let result = str.indexOf(char)===0 ? str.slice(char.length) : str;
    let indexFromEnd = result.lastIndexOf(char);
    return indexFromEnd!==-1 && indexFromEnd!==0 && indexFromEnd===result.length-char.length ? result.slice(0,result.lastIndexOf(char)):result;
}