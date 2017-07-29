import { ScreenetPage } from './app.po';

describe('screenet App', () => {
  let page: ScreenetPage;

  beforeEach(() => {
    page = new ScreenetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
