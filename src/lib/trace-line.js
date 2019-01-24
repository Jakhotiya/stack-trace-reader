/**
 * module below deals with parsing single line from php trace
 *
 * Each trace line is made of 1) class[optional] 2)function call 3)function arguments[optional]
 * The trace can be represented as array of trace line. array because sequence matters
 * Each array element is made up of class + function + argument types
 * Two trace lines are equal if class + function match.
 */

const hashRegEx = /#[0-91-zA-Z]+#/g;

/**
 * Only recognises psr4 standard classnames for now
 * ] charecter is important hint in the trace that the text before it is a class
 */
const className = /(\\{0,1}(\w+\\)*\w+)/g;

/**
 * Each trace line should match this pattern. ES2018 regex named groups could
 * have made this horrible regex more readable. But for now this works.
 * Need to make it more inclusive. This pattern may flag a trace line invalid even if there
 * some extra spaces
 * @TODO tokinisation can be implemented using string look ahead functions. That can be more reliable and readable compared to
 * this regular expression
 * @type {RegExp}
 */
const traceLinePattern = /^#([0-9]+)\s((\\{0,1}(\w+\\)*\w+)(\[(\\{0,1}(\w+\\)*\w+)\]){0,1}(->|::))?(.+)\s+called at\s+\[(.+):(\d+)\]/

/**
 * This is a list of text tokens which help a human make sense
 * of the trace. When I see "called at" I know that whatever follows is going to be a filepath where
 * the call happened. Seeing operator "->" or "::" hints towards class function relationship
 *
 * @type {string[]}
 */
const hints = ['#','->','::',' called at '];

module.exports = {

    isValidTraceLine(str){
        return traceLinePattern.test(str);
    },

    removeHash:function(str){
        return str.replace(hashRegEx,'');
    },

    tokenize:function(str){

        let r = str.replace(traceLinePattern,'$1 || $3 || $6 || $8 || $9 || $10 || $11');
        let arr = r.split(' || ');

        let methodCall = arr[4];
        let methodName = methodCall.slice(0,methodCall.indexOf('('));
        let methodArgs = methodCall.slice(methodCall.indexOf('(')+1,methodCall.lastIndexOf(')'));

        /**
         * @TODO extract arguments from the arguments string
         */

        let result = {
            'position':arr[0],
            'className': arr[1],
            'parentClass':arr[2],
            'callType':arr[3],
            'methodName':methodName,
            'arguments':methodArgs,
            'filepath':arr[5],
            'line':arr[6]
        };
        return result;
    },

}