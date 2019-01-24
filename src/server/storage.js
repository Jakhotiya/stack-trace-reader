const parseTraceBlock = require('../lib/parse-trace-block');
const mysql = require('mysql');
const appConfig = require('../../app.config');

/**
 * @FoodForThought: Looks like each connection life is method specific. Would it not be better if it were request specific?
 * and how to implement that?
 */

const storage = {

    saveTrace:function(trace){
        //@TODO unhandled exception
        let result = parseTraceBlock(trace);

        let connection = mysql.createConnection(appConfig.mysql);
        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
        });

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

    getTrace:function({query,limit=20,offset=0},cb){
        let connection = mysql.createConnection(appConfig.mysql);

        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
        });

        let select = 'SELECT * FROM `trace`';
        let where = !!query ? 'WHERE query LIKE "%'+ query +'%"': '';
        let orderBy = 'ORDER BY query_time DESC';
        let page = `LIMIT ${limit} OFFSET ${offset}`;

        let sql = `${select} ${where} ${orderBy} ${page}`;

        let result = {totalRecords:0,records:[]};
        /**
         * @FoodForThought: This callback hell kind of thing is result of trying to query database in a sequential fashion.
         * In this situation we want to call to query depends on the result of previous query result
        */
        connection.query('SELECT COUNT(`trace_id`) as count from `trace` '+where,(err,rows)=>{
            if(err){
                console.log(err);
                cb(err);
                return;
            }

            if(rows[0]['count']>0){
                result.totalRecords = rows[0]['count'];
                connection.query(sql,(err,records)=>{

                    if(err){
                        console.log(err);
                    }
                    result.records = records;
                    cb(err,result);
                });
            }
        });

    },

    flushStorage:function(cb){
        let connection = mysql.createConnection(appConfig.mysql);
        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
        });
        connection.query('TRUNCATE `trace`',cb);
        connection.end();
    },

    createSchema:function(schema,cb){
        let connection = mysql.createConnection(appConfig.mysql);
        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
        });
        connection.query(schema,cb);
        connection.end();
    }
};


module.exports = storage;