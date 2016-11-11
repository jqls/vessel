import { ETL7Page } from './app.po';

describe('etl-7 App', function() {
  let page: ETL7Page;

  beforeEach(() => {
    page = new ETL7Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
