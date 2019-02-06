const Parser = require('@@php-parser/index');

test('Tokenize on spaces,newline charecter,tabs,comments',()=>{

    let php = `#this is a php comment starting with # instead of // got it?
    //this is a php comment with     
    /** This one is block comment */
    `;

    let expected = [
        '#this is a php comment starting with # instead of // got it?',
        '//this is a php comment with',
        `/** This one is block comment */`
    ];

    expect(Parser(php)).toEqual(expected);

});


test('Invalid comment can throw Parse error for line 2 position 6 ',()=>{

    let php = `#this is a php comment starting with #
    /this is a php comment with     
    /** This one is block comment */
    `;

    expect(()=>{
        Parser(php);
    }).toThrow();

});