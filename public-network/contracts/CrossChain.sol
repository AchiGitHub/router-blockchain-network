// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract PublicCrossChain {
    address public owner;
    uint256 public nextRequest;

    struct User {
        string name;
        string email;
        string birthdate;
        uint256 age;
        string phoneNumber;
        string streetAddress;
        string city;
    }

    mapping(address => User) public users;

    struct Call {
        address source;
        uint256 destination;
        string data;
        address caller;
    }

    mapping(uint256 => Call) public pendingRequests;

    struct Output {
        bool status;
        string returnedData;
    }

    event CallbackRequestInitiated(
        address source,
        uint256 destination,
        string data,
        address callerAddress
    );

    event CallbackRequestAcknowledged(
        address indexed callerId,
        bool status,
        string returnedData
    );

    constructor() {
        owner = msg.sender;
    }

    function requestCall(uint256 destination, string memory data) external {
        require(destination > 0, "Invalid crosschain tranasction");
        pendingRequests[nextRequest] = Call(
            owner,
            destination,
            data,
            msg.sender
        );
        emit CallbackRequestInitiated(owner, destination, data, msg.sender);
        nextRequest++;
    }

    function acknowledgeCall(
        address caller,
        bool status,
        string memory data
    ) external {
        emit CallbackRequestAcknowledged(caller, status, data);
    }

    function registerUser(
        string memory name,
        string memory email,
        string memory birthdate,
        uint256 age,
        string memory phoneNumber,
        string memory streetAddress,
        string memory city
    ) external {
        users[msg.sender] = User(
            name,
            email,
            birthdate,
            age,
            phoneNumber,
            streetAddress,
            city
        );
    }

    function getUser() public view returns (User memory) {
        return users[msg.sender];
    }

    function getNumberOfPendingCalls() public view returns (uint256) {
        return nextRequest;
    }
}
