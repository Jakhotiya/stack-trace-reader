const parseTraceBlock = require('../lib/parse-trace-block');
const mysql = require('mysql');
const appConfig = require('../../app.config');

const storage = {
    saveTrace:function(trace){
        let result = parseTraceBlock(trace);

        let connection = mysql.createConnection(appConfig.mysql);

        connection.connect();

        result.trace_id = null;
        connection.query('INSERT INTO `trace` SET ?',result , function (err, rows, fields) {
            if (err){
                console.log(trace);
                console.log(err);
                process.exit(0);
            }
        });
        connection.end()
    },

    getTrace:function(cb){
        let connection = mysql.createConnection(appConfig.mysql);
        connection.query('SELECT * FROM `trace` ORDER BY trace_id DESC LIMIT 30',cb);
    },

    flushStorage:function(cb){
        let connection = mysql.createConnection(appConfig.mysql);
        connection.query('TRUNCATE `trace`',cb);
    },

    createSchema:function(schema,cb){
        let connection = mysql.createConnection(appConfig.mysql);
        connection.query(schema,cb);
    }
};


module.exports = storage;