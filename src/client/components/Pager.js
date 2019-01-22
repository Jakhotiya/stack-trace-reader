import React from 'react';


const Pager = ({prev,next})=>{
    return (
        <div className="pager">
            <button class="btn prev" onClick={(e)=>prev()}> Prev </button>
            <button class="btn next" onClick={(e)=>next()}> Next </button>
        </div>
    );
};

export default Pager;