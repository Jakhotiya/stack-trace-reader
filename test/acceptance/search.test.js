
Feature('Search');

Scenario('Search a trace by query', (I) => {
    I.amOnPage('/');
    I.seeElement('#search');
    I.fillField('#search','something');
    I.pressKey('Enter');
    I.see('0 matches found','#result-count');
});
