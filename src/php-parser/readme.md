Implements php parser using these [spec](https://github.com/php/php-langspec/tree/master/spec)


## Why write a Compiler or Parser
Short answer, It's fun. Building Compilers or even parsers, requires good amount of logical exercise. You build knowledge of
Algorithms and Data structures when writing a parser. Amid this mess of frameworks and libraries, I think we are forgetting the basics. Our work
involves more and more plumbling and less and less reasoning. Hence I feel it is important to drop all plumbing and get into pure reasoning.
This parser that we are going to build must not have any dependency. 
Another reason I think why programming is becomming less fun, is trying to solve problems that don't exist. A lot of times,
my code does not need to be very extensible, or I might not need an architecture, but I think too much about them. I've come to belive, you can not
become a Good programmer or even an architect, if you have not dealt with mess. Hence, while writing this code we are going to go against every 
good programming advice or paradim except following two:

1. Write code that looks well formatted and has naming conventions that make sense.
2. All code must be covered with tests. Tests give you confidenece that your mess works and can be refactored if needed

Above two rules ensure, we are free to experiment with the codebase without worrying about breaking functionality.


To create mess we are not going to spit out code into separate files. Let's just create one big mess.

## Lexical Analysis

The term sounds super complicated for a non-english speaker and a novice programmer as well.
Lexical Analysis is taking in the whole source program and dividing it into "Tokens".
What the hell is a token now?
Imagin you are reading a program. You are looking at each word and mentally making a note of it.

```php
//this is a comment
$a = 3;
function callme (){
}
```

As you read through this program you know, the first line is a comment. On second line, you are doing a variable assignment. 
$a is a variable. 3 is it's value. Later in the program you are defining a function. How do you know all of this?
Now imaging the same program without any space or new line character. Hard to figure out what's what..right??
So obviously mentally we are using spaces and new line characters to make sense of programs. We are separating the program into
bunch of keywords, mentally. On top of that we are also aware of :
1. // means start of the comment line
2. $a is a variable because it starts with `$` and `=` is an operator
3. `function` keyword in feature of the language and means we are about to declare a function
4. `{` and `}` contains the definition and we can treat these charecters as punctuation.

Most us learn basics of the a language and then most of language features are learned on job. We never explicity 
think about the syntax. When writing "Lexical Analiser" we need to jot down syntax of the language in systematic way.
It needs to be as detailed as possible.
How do you implement language specification. I think "Comments" is a good start.
1. comments
2. Variables and declaration
3. Operators like (+ / * = > < ++ --) and Mathematical expressions
4. punctuations like paranthesis,brackets,semicolumns.
5. Expressions (What the hell is that?)
6. Class and Object syntax 

First problem I need to solve is recognizing space charecters like tab, newline and spaces. Doing something like `str.indexOf(' ') ` may 
work for spaces but might not work well with other control charecters. I think comparing charecter code might be a good idea

@wikapedia:  "A control character or non-printing character is a code point (a number) in a character set, that does not represent a written symbol."

Some parsers on github use "code point" terminology for control characters

