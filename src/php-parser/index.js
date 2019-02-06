const Char = require('./char');

function isTokenEnd(token,endMarker,char){

    let charCode = char.charCodeAt();
    return -1 !== endMarker.indexOf(charCode);
}

//As soon as we see a character #,/,",' look ahead for comments,or string literals

const Parser = (text)=>{
  let l = 0;
  let tokens = [];
  let token = '';
  let char = '';
  let currentLine = 1;

  let lookAhead = false;

  /**
   * store array of char codes which mark end of current token in endMarker
   */
  let endMarker = false;

  while(l<text.length){

      char = text.charAt(l);

      if(Char.isNewLineChar(char.charCodeAt())){
          currentLine++;
      }

      if(!lookAhead){
          if(char=='#'){
              //look for "end of the line" because this is single line comment. Update l to index of EOL
              endMarker = [10,11,12,13];
              //look for end of the line
              lookAhead = true;

          }
          if(char=='/'){
              //look ahead for a following / or * to see if it's a /* pattern for // pattern
              if(text.charAt(l+1)!=='/' && text.charAt(l+1)!=='*'){
                  throw new Error(`Parse error at line ${currentLine}:${l}`);
              }
              endMarker = [10,11,12,13];
              //look for end of the line if it is // type of comment
              // look for */ if comment type is block
              lookAhead = true;
          }
          if(char==='"'|| char==='\''){
              //look for next string closing character. This would be for string literal
              lookAhead = true;
              // Look for " string end or ' depending on the starting character
              endMarker = char==="'" ? ["'"] : ['"'];
          }
      }


      if(isTokenEnd(token,endMarker,char)){
          tokens.push(token.trim());
          token = '';
          lookAhead=false;
      }else{
          token+=char;
      }

      l++;
  }
  return tokens;
};

module.exports =  Parser;