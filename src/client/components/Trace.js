import React from "react";
import traceLine from "../../lib/trace-line";
import Sql from './Sql';

const FormatTrace = ({trace})=>{
    let lines = trace.split('\n');

    let result = lines.map((line,index)=>{
        line = traceLine.removeHash(line);
        if(!traceLine.isValidTraceLine(line)){
            return (<div key={line}><span className='invalid-line'>Invalid Trace line {line}</span></div>);
        }
        let tokens = traceLine.tokenize(line);
        return (
            <div className="trace-line" key={tokens.position}>
                <span className='className'>{tokens.className}</span>
                <span>{tokens.callType}</span>
                <span className='method'>{tokens.methodName}</span>
            </div>
        );
    })

    return result;

}

class Trace extends React.Component{

    render(){
        return (
            <div className='trace'>
                <Sql sql={this.props.trace.query}/>
                <div className='formatted-trace'>
                    <code className='language-php'>
                        <FormatTrace trace={this.props.trace.trace}/>
                    </code>
                </div>
            </div>
        )
    }
}

export default Trace;