//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;

contract Campaign {

    struct Request {
        uint256 id;
        string description;
        uint256 amount;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
    }

    address internal manager;
    string internal campaignName;
    string internal campaignProduct;
    uint256 internal minimumDonation;
    Request[] internal requests;
    mapping(uint256 => bool) requestExists;
    mapping(address => bool) internal canApprove;
    uint256 internal backedBy;
    uint256 internal createdDate;
    uint256 internal lastDate;
    mapping(uint256 => mapping(address => bool)) hasApproved;

    event ContributionToCampaign(address sender, address this, uint256 amount);
    event CampaignRequestCreated(address receiver, uint256 amount);
    event CampaignRequestApproved(uint256 requestId);
    event CamapignRequestFinalized(uint256 requestId);


    modifier onlyManager() {
        require(msg.sender == manager, 'Only manager can call this function');
        _;
    }

    constructor(uint256 _minimumDonation, uint256 _duration, address _creator, string memory _name, string memory _product) {
        manager = _creator;
        campaignName = _name;
        campaignProduct = _product;
        minimumDonation = _minimumDonation;
        createdDate = block.timestamp;
        lastDate = block.timestamp + _duration;
    }

    function getCampaignDetails() public view 
        returns (address, string memory, string memory, uint256, Request[] memory, uint256, uint256, uint256, uint256) {
            return (
                manager,
                campaignName,
                campaignProduct,
                minimumDonation,
                requests,
                backedBy,
                createdDate,
                lastDate,
                address(this).balance
            );
    }
    
    function createRequestId(string memory _description, uint256 _amount, address _recipient) internal pure returns (uint256) {
        uint256 id = uint256(keccak256(abi.encodePacked(_description))) + 
                        _amount +
                        uint256(keccak256(abi.encodePacked(_recipient)));
        
        return id;
    }

    function contribute() public payable {
        require(block.timestamp <= lastDate, 'Campaign has expired');
        require(msg.value >= minimumDonation, 'Increase the contribution amount');
        
        if (!canApprove[msg.sender]) {
            canApprove[msg.sender] = true;
            backedBy++;
        }

        emit ContributionToCampaign(msg.sender, address(this), msg.value);
    }

    function createRequest(string memory _description, uint256 _amount, address payable _recipient) public onlyManager {
        Request memory newRequest = Request({
            id: createRequestId(_description, _amount, _recipient),
            description: _description,
            amount: _amount,
            recipient: _recipient,
            complete: false,
            approvalCount: 0
        });

        require(!requestExists[newRequest.id], 'Request already exists');

        requestExists[newRequest.id] = true;
        requests.push(newRequest);

        emit CampaignRequestCreated(_recipient, _amount);
    }

    function approveRequest(uint256 _index) public {
        Request storage myRequest = requests[_index];

        require(canApprove[msg.sender], 'To approve a request, contribute first');
        require(!hasApproved[myRequest.id][msg.sender], 'You have already approved this request');

        hasApproved[myRequest.id][msg.sender] = true;
        myRequest.approvalCount++;

        emit CampaignRequestApproved(myRequest.id);
    }

    function finalizeRequest(uint256 _index) public onlyManager {
        Request storage myRequest = requests[_index];

        require(!myRequest.complete, 'This request has already been completed');
        require(myRequest.approvalCount > backedBy / 2, 'Not enough contributors have approved this request');
        require(address(this).balance >= myRequest.amount, 'Not enough contributions to pay for this request');

        myRequest.complete = true;
        myRequest.recipient.transfer(myRequest.amount);

        emit CamapignRequestFinalized(myRequest.id);
    }

}
