/**
 * Use this file to describe PHP grammar.  
 */

/**
 * PHP Keywords are not case-sensitive.
 *
 * Note carefully that yield from is a single token that contains whitespace. However, comments are not permitted in that whitespace.
 *
 * @type {string[]}
 */
const keywords = [
    'include',
    'include_once',
    'require',
    'require_once',
    'return',
    'new',
    'or',
    'xor',
    'and',
    'throw',
    'try',
    'unset',
    'var',
    'yield',
    'yield from',
    'print',
    'isset',
    'list',
    'global',
    'const',
    'public',
    'private',
    'protected',
    'function',
    'static',
    'self',
    'parent',
    'use',
    'namespace',
    'class',
    'implements',
    'extends',
    'instanceof',
    'insteadof',
    'trait',
    'if',
    'else',
    'switch',
    'case',
    'for',
    'goto',
    'while',
    'do',
    'foreach',
    'break',
    'continue',
    'int',
    'float',
    'bool',
    'string',
    'null',
    'array',
    'true',
    'false',
    'abstract',
    'as',
    'callable',
    'clone',
    'declare','default','die','echo','elseif','empty',
    'enddeclare','endfor','endforeach','endif','eval','exit','final','finally'
];

const magicConstants = [];

const operators = [];

module.exports = keywords;