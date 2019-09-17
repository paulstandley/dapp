const Meme = artifacts.require("Meme");

require('chai').use(require('chai-as-promised')).should();

contract('Meme', (accounts) => {
  let meme;
  // tests
  describe('deployment', async () => {
    it('deployed successfully', async () => {
      meme = await Meme.deployed();
      const address = meme.address;
      console.log(address);
    })

  })
});
