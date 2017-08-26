import { browser, element, by } from 'protractor';

export class HpAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hp-root h1')).getText();
  }
}
