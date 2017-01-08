import { NoodlemasterPage } from './app.po';

describe('noodlemaster App', function() {
  let page: NoodlemasterPage;

  beforeEach(() => {
    page = new NoodlemasterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('nm works!');
  });
});
