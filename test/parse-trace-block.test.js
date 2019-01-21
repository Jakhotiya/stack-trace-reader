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


test('Convert a trace block recieved from system into a object which contains query, trace, query time, request as different things',()=>{

    const input = `
    
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



test('test with invalid trace block',()=>{
   const input = `
   Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderNonCachedElement('columns') called at [vendor/magento/framework/View/Layout.php:489]
#27 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderElement('columns') called at [vendor/magento/framework/View/Layout.php:585]
#28 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->_renderContainer('main.content') called at [vendor/magento/framework/View/Layout.php:536]
#29 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderNonCachedElement('main.content') called at [vendor/magento/framework/View/Layout.php:489]
#30 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderElement('main.content') called at [vendor/magento/framework/View/Layout.php:585]
#31 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->_renderContainer('page.wrapper') called at [vendor/magento/framework/View/Layout.php:536]
#32 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderNonCachedElement('page.wrapper') called at [vendor/magento/framework/View/Layout.php:489]
#33 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderElement('page.wrapper') called at [vendor/magento/framework/View/Layout.php:585]
#34 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->_renderContainer('root') called at [vendor/magento/framework/View/Layout.php:536]
#35 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderNonCachedElement('root') called at [vendor/magento/framework/View/Layout.php:489]
#36 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->renderElement('root') called at [vendor/magento/framework/View/Layout.php:954]
#37 Magento\\Framework\\View\\Layout\\Interceptor[Magento\\Framework\\View\\Layout]#0000000018f78f740000000023ba799e#->getOutput() called at [vendor/magento/framework/Interception/Interceptor.php:58]
#38 Magento\\Framework\\View\\Layout\\Interceptor#0000000018f78f740000000023ba799e#->___callParent('getOutput', array()) called at [vendor/magento/framework/Interception/Interceptor.php:138]
#39 Magento\\Framework\\View\\Layout\\Interceptor#0000000018f78f740000000023ba799e#->Magento\\Framework\\Interception\\{closure}() called at [vendor/magento/framework/Interception/Interceptor.php:153]
#40 Magento\\Framework\\View\\Layout\\Interceptor#0000000018f78f740000000023ba799e#->___callPlugins('getOutput', array(), array(array('layout-model-cac...'))) called at [generated/code/Magento/Framework/View/Layout/Interceptor.php:39]
#41 Magento\\Framework\\View\\Layout\\Interceptor#0000000018f78f740000000023ba799e#->getOutput() called at [vendor/magento/framework/View/Result/Page.php:257]
#42 Magento\\Framework\\View\\Result\\Page\\Interceptor[Magento\\Framework\\View\\Result\\Page]#0000000018f78a360000000023ba799e#->render(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [vendor/magento/framework/View/Result/Layout.php:170]
#43 Magento\\Framework\\View\\Result\\Page\\Interceptor[Magento\\Framework\\View\\Result\\Layout]#0000000018f78a360000000023ba799e#->renderResult(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [vendor/magento/framework/Interception/Interceptor.php:58]
#44 Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#->___callParent('renderResult', array(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#)) called at [vendor/magento/framework/Interception/Interceptor.php:138]
#45 Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#->Magento\\Framework\\Interception\\{closure}(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [app/code/Aheadworks/Layerednav/Model/Plugin/Result.php:93]
#46 Aheadworks\\Layerednav\\Model\\Plugin\\Result#0000000018f78a340000000023ba799e#->aroundRenderResult(&Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#, &Closure#0000000018f78f8a0000000023ba799e#, &Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [vendor/magento/framework/Interception/Interceptor.php:135]
#47 Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#->Magento\\Framework\\Interception\\{closure}(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [vendor/magento/framework/Interception/Interceptor.php:153]
#48 Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#->___callPlugins('renderResult', array(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#), array(array('result-builtin-c...', 'result-varnish-c...'))) called at [generated/code/Magento/Framework/View/Result/Page/Interceptor.php:26]
#49 Magento\\Framework\\View\\Result\\Page\\Interceptor#0000000018f78a360000000023ba799e#->renderResult(&Magento\\Framework\\App\\Response\\Http\\Interceptor#0000000018f78e1a0000000023ba799e#) called at [vendor/magento/framework/App/Http.php:139]
#50 Magento\\Framework\\App\\Http#0000000018f78e1d0000000023ba799e#->launch() called at [vendor/magento/framework/App/Bootstrap.php:256]
#51 Magento\\Framework\\App\\Bootstrap#0000000018f78e870000000023ba799e#->run(&Magento\\Framework\\App\\Http#0000000018f78e1d0000000023ba799e#) called at [pub/index.php:36]
   `;

   expect(()=>{
       let result = parse(input);
   }).toThrow('Invalid Trace block. Make sure your block contains keywords  "TRACE:", "SQL:" and  "TIME:"');

});


test('When it is a transaction commit operation or transaction start operation and when block has no SQL',()=>{
    const input = `
## 2019-01-18 12:42:03
## 34098 ## TRANSACTION COMMIT
TIME: 0.0111
TRACE: #1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#000000005be3940b000000006cfad168#->getStats('transaction', 'COMMIT', array(), NULL) called at [vendor/magento/framework/DB/Logger/File.php:84]
#2 Magento\\Framework\\DB\\Logger\\File#000000005be3940b000000006cfad168#->logStats('transaction', 'COMMIT', array(), NULL) called at [vendor/magento/framework/DB/Logger/LoggerProxy.php:152]
#3 Magento\\Framework\\DB\\Logger\\LoggerProxy#000000005be39436000000006cfad168#->logStats('transaction', 'COMMIT') called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:292]
#4 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#000000005be3943b000000006cfad168#->commit() called at [vendor/magento/framework/Model/ResourceModel/AbstractResource.php:90]
#5 Ess\\M2ePro\\Model\\ResourceModel\\Config\\Module[Magento\\Framework\\Model\\ResourceModel\\AbstractResource]#000000005be39066000000006cfad168#->commit() called at [vendor/magento/framework/Model/ResourceModel/Db/AbstractDb.php:420]
#6 Ess\\M2ePro\\Model\\ResourceModel\\Config\\Module[Magento\\Framework\\Model\\ResourceModel\\Db\\AbstractDb]#000000005be39066000000006cfad168#->save(&Ess\\M2ePro\\Model\\Config\\Module#000000005be39e9b000000006cfad168#) called at [vendor/magento/framework/Model/AbstractModel.php:647]
#7 Ess\\M2ePro\\Model\\Config\\Module[Magento\\Framework\\Model\\AbstractModel]#000000005be39e9b000000006cfad168#->save() called at [app/code/Ess/M2ePro/Model/ActiveRecord/AbstractModel.php:105]`;

    const output = {
        'request':'unknown',
        'query': '',
        'query_time':'0.0111',
        'trace':`#1 Magento\\Framework\\DB\\Logger\\File[Magento\\Framework\\DB\\Logger\\LoggerAbstract]#000000005be3940b000000006cfad168#->getStats('transaction', 'COMMIT', array(), NULL) called at [vendor/magento/framework/DB/Logger/File.php:84]
#2 Magento\\Framework\\DB\\Logger\\File#000000005be3940b000000006cfad168#->logStats('transaction', 'COMMIT', array(), NULL) called at [vendor/magento/framework/DB/Logger/LoggerProxy.php:152]
#3 Magento\\Framework\\DB\\Logger\\LoggerProxy#000000005be39436000000006cfad168#->logStats('transaction', 'COMMIT') called at [vendor/magento/framework/DB/Adapter/Pdo/Mysql.php:292]
#4 Magento\\Framework\\DB\\Adapter\\Pdo\\Mysql#000000005be3943b000000006cfad168#->commit() called at [vendor/magento/framework/Model/ResourceModel/AbstractResource.php:90]
#5 Ess\\M2ePro\\Model\\ResourceModel\\Config\\Module[Magento\\Framework\\Model\\ResourceModel\\AbstractResource]#000000005be39066000000006cfad168#->commit() called at [vendor/magento/framework/Model/ResourceModel/Db/AbstractDb.php:420]
#6 Ess\\M2ePro\\Model\\ResourceModel\\Config\\Module[Magento\\Framework\\Model\\ResourceModel\\Db\\AbstractDb]#000000005be39066000000006cfad168#->save(&Ess\\M2ePro\\Model\\Config\\Module#000000005be39e9b000000006cfad168#) called at [vendor/magento/framework/Model/AbstractModel.php:647]
#7 Ess\\M2ePro\\Model\\Config\\Module[Magento\\Framework\\Model\\AbstractModel]#000000005be39e9b000000006cfad168#->save() called at [app/code/Ess/M2ePro/Model/ActiveRecord/AbstractModel.php:105]`
    };

    let result = parse(input);
    expect(result).toEqual(output);

});