const parse = require('../src/lib/parse-trace-block');

/**
 * These tests don't cover line carriage charecter tests thoroughly. The implementation is not robust.
 */

test('Convert a trace block recieved from system into a object which contains query, trace, query time, request as different things',()=>{

    const input = `
## REQUEST: unknown
## 2019-01-03 07:05:05
## 9290 ## QUERY
SQL: INSERT INTO \`catalog_product_index_eav_temp\` SELECT DISTINCT  \`cpe\`.\`entity_id\`, \`dd\`.\`attribute_id\`, \`s\`.\`store_id\`, COALESCE(ds.value, dd.value) AS \`value\`, \`cpe\`.\`entity_id\` FROM \`store\` AS \`s\`
 LEFT JOIN \`catalog_product_entity_int\` AS \`dd\` ON dd.store_id = 0
 LEFT JOIN \`catalog_product_entity_int\` AS \`ds\` ON ds.store_id = s.store_id AND ds.attribute_id = dd.attribute_id AND ds.entity_id = dd.entity_id
 LEFT JOIN \`catalog_product_entity_int\` AS \`d2d\` ON d2d.store_id = 0 AND d2d.entity_id = dd.entity_id AND d2d.attribute_id = 84
 LEFT JOIN \`catalog_product_entity_int\` AS \`d2s\` ON d2s.store_id = s.store_id AND d2s.attribute_id = d2d.attribute_id AND d2s.entity_id = d2d.entity_id
 LEFT JOIN \`catalog_product_entity\` AS \`cpe\` ON cpe.entity_id = dd.entity_id
AFF: 6012
TIME: 0.1585
TRACE: #1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#0000000020d1c03f000000006cef7a94#->getStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/File.php:67]
#2 Magento\\Framework\\DB\\Logger\\File#0000000020d1c03f000000006cef7a94#->logStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/LoggerProxy.php:152]
#3 Magento\\Framework\\DB\\Logger\\LoggerProxy#0000000020d1c021000000006cef7a94#->logStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:518]
#4 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#0000000020d1c011000000006cef7a94#->_query('INSERT INTO \`cat...', array()) called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:580]
#5 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#0000000020d1c011000000006cef7a94#->query('INSERT INTO \`cat...') called at [vendor/magento/module-catalog/Model/ResourceModel/Product/Indexer/Eav/Source.php:203]
`;

    const output = {
        'request':'unknown',
        'query': `INSERT INTO \`catalog_product_index_eav_temp\` SELECT DISTINCT  \`cpe\`.\`entity_id\`, \`dd\`.\`attribute_id\`, \`s\`.\`store_id\`, COALESCE(ds.value, dd.value) AS \`value\`, \`cpe\`.\`entity_id\` FROM \`store\` AS \`s\`
 LEFT JOIN \`catalog_product_entity_int\` AS \`dd\` ON dd.store_id = 0
 LEFT JOIN \`catalog_product_entity_int\` AS \`ds\` ON ds.store_id = s.store_id AND ds.attribute_id = dd.attribute_id AND ds.entity_id = dd.entity_id
 LEFT JOIN \`catalog_product_entity_int\` AS \`d2d\` ON d2d.store_id = 0 AND d2d.entity_id = dd.entity_id AND d2d.attribute_id = 84
 LEFT JOIN \`catalog_product_entity_int\` AS \`d2s\` ON d2s.store_id = s.store_id AND d2s.attribute_id = d2d.attribute_id AND d2s.entity_id = d2d.entity_id
 LEFT JOIN \`catalog_product_entity\` AS \`cpe\` ON cpe.entity_id = dd.entity_id`,
        'query_time':'0.1585',
        'trace':`#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#0000000020d1c03f000000006cef7a94#->getStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/File.php:67]
#2 Magento\\Framework\\DB\\Logger\\File#0000000020d1c03f000000006cef7a94#->logStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Logger/LoggerProxy.php:152]
#3 Magento\\Framework\\DB\\Logger\\LoggerProxy#0000000020d1c021000000006cef7a94#->logStats('query', 'INSERT INTO \`cat...', array(), &Magento\\Framework\\DB\\Statement\\Pdo\\Mysql#0000000020d1c6da000000006cef7a94#) called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:518]
#4 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#0000000020d1c011000000006cef7a94#->_query('INSERT INTO \`cat...', array()) called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:580]
#5 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#0000000020d1c011000000006cef7a94#->query('INSERT INTO \`cat...') called at [vendor/magento/module-catalog/Model/ResourceModel/Product/Indexer/Eav/Source.php:203]`
    };


    let result = parse(input);
    expect(result).toEqual(output);
});

