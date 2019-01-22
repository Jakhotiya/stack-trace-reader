import React from 'react';

const Sql = ({sql})=>{
    return (
        <code className="language-sql">
            {sql}
        </code>
    );
}

export default Sql;