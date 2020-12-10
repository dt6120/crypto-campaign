//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import './Campaign.sol';

contract Factory {

	address[] internal deployedCampaigns;

	event CampaignCreated(address indexed campaignAddress, address indexed creator);

	function createCampaign(uint256 _minimumDonation, uint256 _duration, string memory _name, string memory _product) public {
		address newCampaign = address(new Campaign(_minimumDonation, _duration, msg.sender, _name, _product));
		deployedCampaigns.push(newCampaign);

		emit CampaignCreated(address(newCampaign), msg.sender);
	}

	function getDeployedCampaigns() public view returns(address[] memory) {
		return deployedCampaigns;
	}

}
