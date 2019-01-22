
Feature('Search');

Scenario('Search a trace by query', (I) => {
    I.amOnPage('/');
    I.seeAttributesOnElements('#search', {'placeholder': "Search through your SQL queries and hit Enter"});
    I.fillField('#search','something');
    I.pressKey('Enter');
    I.seeElement('button.next');
    I.seeElement('button.prev');
});
