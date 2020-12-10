const Factory = artifacts.require('Factory');
const Campaign = artifacts.require('Campaign');

module.exports = async function(deployer, network, accounts) {
	await deployer.deploy(Factory);
	const factory = await Factory.deployed();

	await factory.createCampaign(
		1000,
		300,
		'Test Campaign',
		'This campaign is for testing the functionality of platform'
	);

	// await deployer.deploy(
	// 	Campaign,
	// 	1000,
	// 	300,
	// 	accounts[0],
	// 	'Test Campaign',
	// 	'This campaign is for testing the functionality of platform'
	// )
	// const campaign = await Campaign.deployed();
}
