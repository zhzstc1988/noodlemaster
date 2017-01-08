import { browser, element, by } from 'protractor';

export class NoodlemasterPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('nm-root h1')).getText();
  }
}
