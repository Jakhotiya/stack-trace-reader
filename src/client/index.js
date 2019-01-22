import React from "react";
import {render} from "react-dom";
import Trace from './components/Trace';
import TraceList from './components/TraceList';



import './style.css';

class App extends React.Component
{

    state={
        loading:false,
        activeTrace:null
    };

    componentDidMount(){
        location.hash = '';
        window.onhashchange = () => {
            if ('' === location.hash) {
                this.setState({activeTrace: null});
            }
        }
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
                <TraceList handleClick={this.handleClick}/>
            </div>
        );
    }
}

render((<App/>), document.getElementById("root"));