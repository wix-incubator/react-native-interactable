describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show Overview screen', async () => {
    await expect(element(by.id('Overview'))).toBeVisible();
  });

  it('Chat Heads is clickable', async () => {
    await element(by.text('Chat Heads')).tap();
  });

})
