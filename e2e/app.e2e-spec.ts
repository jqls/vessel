import { VesselPage } from './app.po';

describe('vessel App', function() {
  let page: VesselPage;

  beforeEach(() => {
    page = new VesselPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
