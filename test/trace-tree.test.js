const TraceTree = require('@@lib/trace-tree');

describe('Given two stack traces, find the common common call stack',()=>{

    test('two simple traces which have a common callstack',()=>{
        let stack1 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method5',
            'Class1->method6'
        ];

        let expected  = [
            'Class1->method1',
            'Class1->method2',
        ];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });

    test('first trace is a subset of second trace',()=>{
        let stack1 = [
            'Class1->method1',
            'Class1->method2',
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method5',
            'Class1->method6'
        ];

        let expected  = [
            'Class1->method1',
            'Class1->method2',
        ];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });

    test('second trace is a subset of first trace',()=>{
        let stack1 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
        ];

        let expected  = [
            'Class1->method1',
            'Class1->method2',
        ];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });

    test('give traces are same',()=>{
        let stack1 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        let expected  = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });


    test('two traces are not same',()=>{
        let stack1 = [
            'Class1->method2',
            'Class1->method1',
            'Class1->method3',
            'Class1->method4'
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method5',
            'Class1->method6'
        ];

        let expected  = [];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });

    test('both traces with a recursive call but different callstack length',()=>{
        let stack1 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method3',
            'Class1->method4'
        ];

        let stack2 = [
            'Class1->method1',
            'Class1->method2',
            'Class1->method5',
            'Class1->method6'
        ];

        let expected  = [
            'Class1->method1',
            'Class1->method2',
        ];

        expect(TraceTree.findCommon(stack1,stack2)).toEqual(expected);
    });

});

test('Given two traces, create a tree structure',()=>{
    let stack1 = [
        'Class1->method1',
        'Class2->method2',
        'Class4->method4'
    ];

    let stack2 = [
        'Class1->method1',
        'Class3->method3',
    ];

    let expected = {
        'Class1->method1':{
            children:{
                'Class2->method2':{
                    children:{
                        'Class4->method4':{
                            children:{}
                        }
                    }
                },
                'Class3->method3':{
                    children:{}
                }
            }
        }
    };

    let tree = TraceTree.addToTree({},stack1);
    let result = TraceTree.addToTree(tree,stack2);
    expect(result).toEqual(expected);

});

test('Adding a trace which was previously added should not affect the tree',()=>{
    let stack1 = [
        'Class1->method1',
        'Class2->method2',
        'Class4->method4'
    ];

    let stack2 = [
        'Class1->method1',
        'Class3->method3',
    ];

    let expected = {
        'Class1->method1':{
            children:{
                'Class2->method2':{
                    children:{
                        'Class4->method4':{
                            children:{}
                        }
                    }
                },
                'Class3->method3':{
                    children:{}
                }
            }
        }
    };

    let tree = TraceTree.addToTree({},stack1);
    tree = TraceTree.addToTree(tree,stack1);
    tree = TraceTree.addToTree(tree,stack2);
    let result = TraceTree.addToTree(tree,stack2);
    expect(result).toEqual(expected);

});