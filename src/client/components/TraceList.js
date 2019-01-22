import React from "react";
import Pager from './Pager';
import Search from './Search';
import Spinner from './Spinner';


class TraceList extends React.Component {

    state = {
        page: 1,
        totalRecords: 20,
        perPageRecords: 20,
        data: []
    };

    componentDidMount() {
        this.fetchData({});
    }

    fetchData = (params) => {
        this.setState({loading: true});
        fetch('/get-trace').then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(data => {
                this.setState({data: data})
                console.log(data);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.setState({loading: false});
        })
    }

    handleSubmit = (query) => {
        this.fetchData({query: query});
    }


    prev = () => {
        let current = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({page: current})
    }

    next = () => {
        let current = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({page: current})
    }

    render() {
        let {handleClick} = this.props;
        let data = this.state.data;
        return (
            <div id='page-trace-list'>
                <Spinner visible={this.state.loading}/>
                <Search handleSubmit={this.handleSubmit}/>
                <div className="trace-list">
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