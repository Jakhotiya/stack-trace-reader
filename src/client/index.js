import React from "react";
import {render} from "react-dom";
import traceLine from './../lib/trace-line';

const FormatTrace = ({trace})=>{
    let lines = trace.split('\n');

    let result = lines.map(line=>{
        line = traceLine.removeHash(line);
        if(!traceLine.isValidTraceLine(line)){
            return (<div><span className='invalid-line'>Invalid Trace line</span></div>);
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


class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            query:''
        }
    }

    handleChange = (e)=>{
        this.setState({query:e.target.value});
    }

    handleEnter = (e)=>{
        if(e.key === 'Enter'){
            this.props.handleSubmit(this.state.query);
        }
    }

    render(){
        return (
            <div className='search-container'>
                <label>Search Query put it here</label>
                <input id='search' name='search' onKeyPress={this.handleEnter} onChange={this.handleChange} value={this.state.query} />
            </div>
        );
    }
}

const Spinner = ({visible})=>{
    let className = visible ? 'show' : 'hide';
    return (
        <div id='loader' className={className}>
            Loading...
        </div>
    )
}

class Trace extends React.Component{

    render(){
        return (
            <div className='trace'>
                <div className='query'>
                    {this.props.trace.query}
                </div>
                <div className='formatted trace'>
                    <FormatTrace trace={this.props.trace.trace}/>
                </div>
            </div>
        )
    }
}


class TraceList extends React.Component{

    render(){
        let {handleClick,data} = this.props;
       return (
           <div id='trace-list'>
               { data.map((trace)=>{
                   return (<div key={trace.trace_id} className='query' onClick={()=>handleClick(trace)}>{trace.query}</div>)
               }) }
           </div>
       );
    }
}

class App extends React.Component
{

    state={
        loading:false,
        data:[],
        activeTrace:null
    }

    componentDidMount(){
        location.hash='';
        window.onhashchange = ()=>{
            if(''===location.hash){
                this.setState({activeTrace:null});
            }
        }
    }

    handleSubmit = (query)=>{
        this.setState({loading:true});
        fetch('/get-trace?'+query).then((response)=>{
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(data =>{
                this.setState({data:data})
                console.log(data);
            });
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            this.setState({loading:false});
        })
    }

    handleClick = (trace)=>{
        this.setState({activeTrace:trace});
        location.hash = 'trace='+trace.trace_id;
    }

    render(){
        if(this.state.activeTrace){
            return (<Trace trace={this.state.activeTrace}/>);
        }
        return (
            <div>
                <Spinner visible={this.state.loading}/>
                <Search handleSubmit={this.handleSubmit}/>
                <TraceList handleClick={this.handleClick} data={this.state.data}/>
            </div>
        );
    }
}

render((<App/>), document.getElementById("root"));