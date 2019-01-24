const express = require('express')
const app = express();
const parser = require('body-parser');
const storage = require('./src/server/storage');

let mysqlMiddleware = function(req,res,next){
    storage.saveTrace(req.body);
    next();
}

app.use(express.static('public'))

app.get('/get-trace',(req,res)=>{
    //@FoodForThought: Anychange in result will need refactoring TraceList component. They need a common interface
    storage.getTrace(req.query,(err, result)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.send(err.message);
            return;
        }
        res.json(result);
    });

});

app.post('/save-trace',parser.text({ type: 'text/plain','parameterLimit':2000,'limit':'1000kb'}),mysqlMiddleware,function(req,res){
    console.log(req.body);
    res.json({'success':true});
});

app.delete('/flush-storage',function(req,res){
    storage.flushStorage(()=>{
        res.json({'success':true});
    });

})

app.get('/install',(req,res)=>{

    const installSql = `
        CREATE TABLE  \`trace\` (
 \`trace_id\` int(11) NOT NULL AUTO_INCREMENT,
 \`trace\` longtext NOT NULL,
 \`query\` longtext NOT NULL,
 \`query_time\` float NOT NULL,
 \`request\` varchar(1000) NOT NULL,
 UNIQUE KEY \`trace_id\` (\`trace_id\`) USING BTREE,
 KEY \`request\` (\`request\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `;


    storage.createSchema(installSql, function (error, results, fields) {
        if (error){
            res.json({'ERROR':'E_INSTALLATION_ERROR:'+error.message});
            return;
        }
        res.json({'ERROR':false})
    });

})

app.listen(8081,()=>{
    console.log('Express running on 8081');
});