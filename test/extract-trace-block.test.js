const sut = require('../src/server/extract-trace-block');

/**
 * DO NOT CHANGE FORMATTING OF ANY INPUT OR OUTPUT STRINGS. THEY ARE INTENTIONALLY FORMATTED THIS WAY
 * TO AVOID ANY SPACE OR TAB CHARECTERS. THE TESTS WILL FAIL IF YOU CHANGE THE FORMATTING.
 */

test('Each block is correctly extracted using boundary \n\n\n',(done)=>{
    let input = `#TRACE 1

#TRACE 2

#TRACE 3


`;

    let output =[];

    sut.getBlocks(input,(trace)=>{
        output.push(trace);
    })


     input = `
#TRACE 4
#TRACE 5
#TRACE 6


`;

    sut.getBlocks(input,(trace)=>{
        output.push(trace);
    })

    input = `#TRACE 7
`;

    sut.getBlocks(input,(trace)=>{
        output.push(trace);
    })

    input = `#TR`;
    sut.getBlocks(input,(trace)=>{
        output.push(trace);
    })

    input = `ACE8
`;

    sut.getBlocks(input,(trace)=>{
        output.push(trace);
    })

    output.push(sut.getLeftOver());

    const expectedResult = [
       `#TRACE 1

#TRACE 2

#TRACE 3`,
   `#TRACE 4
#TRACE 5
#TRACE 6`,

`#TRACE 7
#TRACE8`
    ];

    setTimeout(()=>{
        expect(output).toEqual(expectedResult);
        done();
    },2000)

});