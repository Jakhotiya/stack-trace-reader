const trimChar = require('../src/lib/trim-char');

test('trimChar trims given char or sequence of chars from both ends of given string only once ',()=>{
    let input = 'bab';
    let result = trimChar(input,'b');
    expect(result).toEqual('a');

    input = 'babbbb';
    result = trimChar(input,'b');
    expect(result).toEqual('abbb');

    input = 'babbbb';
    result = trimChar(input,'a');
    expect(result).toEqual('babbbb');

    input = 'babbbb';
    result = trimChar(input,'bbb');
    expect(result).toEqual('bab');

    input = 'stack-trace';
    result = trimChar(input,'stack-');
    expect(result).toEqual('trace');

    expect('').toEqual(trimChar('','1'));
})