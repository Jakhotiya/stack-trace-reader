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
    storage.getTrace((err, rows, fields)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            res.send(err.message);
            return;
        }
        res.json(rows);
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

app.get('/install',()=>{
    /**
     * Install the trace table in the target database. Example query:
     *
     CREATE TABLE `trace` (
     `trace_id` int(11) NOT NULL AUTO_INCREMENT,
     `trace` longtext NOT NULL,
     `query` text NOT NULL,
     `query_time` float NOT NULL,
     `request` varchar(1000) NOT NULL,
     UNIQUE KEY `trace_id` (`trace_id`) USING BTREE,
     KEY `request` (`request`)
     ) ENGINE=InnoDB AUTO_INCREMENT=983 DEFAULT CHARSET=utf8
     */


})

app.listen(8081,()=>{
    console.log('Express running on 8081');
});