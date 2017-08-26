import { HpAppPage } from './app.po';

describe('hp-app App', function() {
  let page: HpAppPage;

  beforeEach(() => {
    page = new HpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hp works!');
  });
});
