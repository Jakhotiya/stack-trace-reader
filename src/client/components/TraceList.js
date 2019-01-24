import React from "react";
import Pager from './Pager';
import Search from './Search';
import Spinner from './Spinner';


function objToQueryString(obj){
    let q = [];
    for(var key in obj){
        q.push(`${key}=${obj[key]}`);
    }
    return q.join('&');
}

/**
 * @FoodForThought: fetchData is called below setState line. I'd heard that state updates are async.
 * If that's true fetchData should be called in a callback.
 */
class TraceList extends React.Component {

    state = {
        page: 1,
        totalRecords: 20,
        perPageRecords: 20,
        query:'',
        data: []
    };

    componentDidMount() {
        this.fetchData({});
    }

    fetchData = () => {
        let {query,page,perPageRecords} = this.state;
        let offset = perPageRecords*(page-1);
        let limit = 20;
        var queryObj = {offset:offset,limit:limit,query:query};
        this.setState({loading: true});
        let payload = objToQueryString(queryObj);
        payload = payload!=='' ? '?'+payload : '';
        fetch('/get-trace'+payload).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(data => {
                this.setState({data: data.records,totalRecords:data.totalRecords})
                console.log(data);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.setState({loading: false});
        })
    };

    handleSubmit = (query) => {
        this.setState({query:query});
        this.fetchData();
    };


    prev = () => {
        let current = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({page: current});
        this.fetchData();
    };

    next = () => {
        let totalPages = Math.ceil(this.state.totalRecords/this.state.perPageRecords);
        let current =  this.state.page<totalPages ? this.state.page + 1 : 1;
        this.setState({page: current});
        this.fetchData();
    };

    render() {
        let {handleClick} = this.props;
        let data = this.state.data;

        return (
            <div id='page-trace-list'>
                <Spinner visible={this.state.loading}/>
                <Search handleSubmit={this.handleSubmit}/>
                <div className="trace-list">
                    <div className="total-records">Records Found : {this.state.totalRecords} | Showing page: {this.state.page}</div>
                    {data.map((trace) => {
                        return (<div key={trace.trace_id} className='query'><code
                            onClick={() => handleClick(trace)}>{trace.query}</code></div>)
                    })}
                </div>
                <Pager prev={this.prev} next={this.next}/>
            </div>
        );
    }
}

export default TraceList;