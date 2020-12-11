const Campaign = artifacts.require('Campaign');

require('chai')
	.use(require('chai-as-promised'))
	.should();

contract('Campaign', ([manager, user_1, user_2, user_3, recipient]) => {
	let campaign;

	before(async () => {
		campaign = await Campaign.new(1000, 300, manager, 'Test campaign', 'Test product');
	});

	describe('Campaign deployment', async () => {
		it('sets the campaign parameters correctly', async () => {
			assert.equal(await campaign.getCampaignName(), 'Test campaign');
			assert.equal(await campaign.getCampaignProduct(), 'Test product');
			assert.equal(await campaign.getMinimumDonation(), 1000);
		});
	});

	describe('contribute()', async () => {
		describe('and the contribution is valid', async () => {
			it('allows user to contribute to campaign', async () => {
				await campaign.contribute({ from: user_1, value: 1000 });
				assert.equal(await campaign.getContributions(), 1000);
				assert.equal(await campaign.getBackedBy(), 1);
			});
		});

		// describe('and contribution is less than minimum donation', async () => {
		// 	it('throws an error', async () => {
		// 		expect(await campaign.contribute({ from: user_1, value: 100 }))
		// 			.to.throw(error => assert.equal(error.reason, 'Increase the contribution amount'));
		// 	});
		// });
	});

	describe('appproveRequest()', async () => {
		describe('and the request exists', async () => {
			it('approves the request', async () => {
				await campaign.createRequest('Test description', 2000, recipient);
				await campaign.contribute({ from: user_2, value: 1000 });
				await campaign.approveRequest(0, { from: user_2 });
				assert.equal((await campaign.getCampaignRequest(0)).approvalCount, 1);
			});
		});

		// describe('and the request does not exist', async () => {
		// 	it('throws an error', async () => {
		// 		await campaign.approveRequest(1, { from: user_1 })
		// 	});
		// });
	});

	describe('finalizeRequest()', async () => {
		before(async () => {
			await campaign.createRequest('Test description', 3000, recipient);
			await campaign.contribute({ from: user_1, value: 1000 });
			await campaign.contribute({ from: user_2, value: 1000 });
			await campaign.contribute({ from: user_3, value: 1000 });
		});

		describe('and request has majority approval', async () => {
			it('finalizes the request', async () => {
				await campaign.approveRequest(1, { from: user_1 });
				await campaign.approveRequest(1, { from: user_2 });
				await campaign.finalizeRequest(1, { from: manager });
			});
		});

		// describe('and request does not have majority approval', async () => {
		// 	it('throws an error', async () => {
		// 		console.log(await campaign.getCampaignRequests());
		// 		await campaign.approveRequest(0, { from: user_1 });
		// 		await campaign.finalizeRequest(0, { from: manager });
		// 	});
		// });
	});
});
