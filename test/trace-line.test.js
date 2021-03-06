const traceLine = require('@@lib/trace-line');

test('removeHash Can recognize object hashes from the php trace and remove them from php trace', () => {
    let input = "#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#0000000020d1c03f000000006cef7a94#->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6ca000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/File.php:67]";
    let expectedOutput = "#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql) called at [vendor/magento/framework/DB/Logger/File.php:67]";
    let actualOutput = traceLine.removeHash(input);
    expect(actualOutput).toBe(expectedOutput);
});

test('test for a valid trace line when function call is not static',function(){
    let input = "#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql) called at [vendor/magento/framework/DB/Logger/File.php:88]";

    let actualOutput = traceLine.isValidTraceLine(input);
    expect(actualOutput).toEqual(true);
});

test('test for a valid trace line when function call is static',function(){
    let input = "#1 Magento\\Framework\\DB\\Logger\\File::getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql) called at [vendor/magento/framework/DB/Logger/File.php:88]";

    let actualOutput = traceLine.isValidTraceLine(input);
    expect(actualOutput).toEqual(true);

});

test('for a valid trace line when there is just a function call without php class',()=>{
    let input = '#24 call_user_func_array(array(&Magento\\Indexer\\Cron\\UpdateMview, \'execute\'), array(&Magento\\Cron\\Model\\Schedule)) called at [vendor/magento/module-cron/Observer/ProcessCronQueueObserver.php:292]';
    let actualOutput = traceLine.isValidTraceLine(input);
    expect(actualOutput).toEqual(true);

    let expectedTokens = {
        'position':'24',
        'className':'',
        'parentClass':'',
        'callType':'',
        'methodName':'call_user_func_array',
        'arguments':'array(&Magento\\Indexer\\Cron\\UpdateMview, \'execute\'), array(&Magento\\Cron\\Model\\Schedule)',
        'filepath':'vendor/magento/module-cron/Observer/ProcessCronQueueObserver.php',
        'line':'292'
    }
    expect(traceLine.tokenize(input)).toEqual(expectedTokens);

})

test('Tokenize a trace line and return class,functions,arguments,filename,line number of the call in a trace line as separate tokens',function(){
    let input = "#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql) called at [vendor/magento/framework/DB/Logger/File.php:67]";
    let expectedOutput = {
        'position':'1',
        'className':'Magento\\Framework\\DB\\Logger\\File',
        'parentClass':'Magento\\Framework\\DB\\Logger\\LoggerAbstract',
        'callType':'->',
        'methodName':'getStats',
        'arguments':"'query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql",
        'filepath':'vendor/magento/framework/DB/Logger/File.php',
        'line':'67'
    };
    let actualOutput = traceLine.tokenize(input);
    expect(actualOutput).toEqual(expectedOutput);
});