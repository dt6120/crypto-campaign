const Factory = artifacts.require('Factory');
const Campaign = artifacts.require('Campaign');

require('chai')
	.use(require('chai-as-promised'))
	.should();

contract('Factory', (accounts) => {
	let factory;
	let minimumDonation, duration, name, product;
	let campaign, deployedCampaigns;

	before(async () => {
		factory = await Factory.new();

		minimumDonation = 1000;
		duration = 300;
		name = 'Test campaign';
		product = 'Test product';
	});

	describe('createCampaign()', async () => {
		it('creates a campaign', async () => {
			await factory.createCampaign(minimumDonation, duration, name, product);
			deployedCampaigns = await factory.getDeployedCampaigns();
			expect(deployedCampaigns.length).to.equal(1);
		});
	});
});
