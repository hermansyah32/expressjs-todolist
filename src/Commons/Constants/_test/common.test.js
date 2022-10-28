import * as Common from '../common';
describe('Common test', () => {
  it('should correctly have same value as env', () => {
    // Action and assert
    expect(Common.ACCESS_TOKEN_KEY).toEqual(
      '1f44df94-09b5-4ed4-a9c8-5ead8a4c9ac1'
    );
    expect(Common.REFRESH_TOKEN_KEY).toEqual(
      'af5a62ba-bb6e-438d-acbb-15b7607731de'
    );
  });
});
