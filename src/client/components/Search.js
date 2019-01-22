import React from "react";

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
                <input id='search'
                       placeholder='Search through your SQL queries and hit Enter'
                       name='search' onKeyPress={this.handleEnter} onChange={this.handleChange} value={this.state.query} />
            </div>
        );
    }
}

export default Search;