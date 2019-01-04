const classNameParser = require('./../src/classname-parser');

test('Can recognize object hashes from the php trace and remove them from php trace', () => {
    let input = "TRACE: #1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#0000000020d1c03f000000006cef7a94#->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6ca000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/File.php:67]";
    let expectedOutput = "TRACE: #1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]->getStats('query', 'INSERT INTO `cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql) called at [vendor/magento/framework/DB/Logger/File.php:67]";
    let actualOutput = classNameParser.parse(input);
    expect(actualOutput).toBe(expectedOutput);
});