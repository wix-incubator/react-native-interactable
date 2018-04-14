describe('Example', () => {
  beforeEach(async () => {
    await device.relaunchApp();
  });
  
  it('should show Overview screen', async () => {
    await expect(element(by.id('Overview'))).toBeVisible();
  });

  it('Menu is visible', async () => {
    await expect(element(by.id('Menu'))).toBeVisible();
  });
  
})