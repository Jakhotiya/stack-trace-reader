import React from 'react';

const Spinner = ({visible})=>{
    let className = visible ? 'show' : 'hide';
    return (
        <div id='loader' className={className}>
            Loading...
        </div>
    )
};

export default Spinner;