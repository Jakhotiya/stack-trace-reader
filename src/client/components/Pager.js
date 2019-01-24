import React from 'react';


const Pager = ({prev,next})=>{
    return (
        <div className="pager">
            <button className="btn prev" onClick={(e)=>prev()}> Prev </button>
            <button className="btn next" onClick={(e)=>next()}> Next </button>
        </div>
    );
};

export default Pager;