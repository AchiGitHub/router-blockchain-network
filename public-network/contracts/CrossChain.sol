// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract PublicCrossChain {
    address public owner;

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
        string source;
        string destination;
        string data;
    }

    struct Output {
        bool status;
        string returnedData;
    }

    event CallbackRequestInitiated(
        uint256 source,
        uint256 destination,
        string data,
        address callerAddress
    );
    event CallbackRequestAcknowledged(
        uint256 callId,
        bool status,
        string returnedData
    );

    constructor() {
        owner = msg.sender;
    }

    function requestCall(
        uint256 source,
        uint256 destination,
        string memory data
    ) public {
        emit CallbackRequestInitiated(source, destination, data, msg.sender);
    }

    function acknowledgeCall(
        uint256 source,
        bool status,
        string memory data
    ) public {
        emit CallbackRequestAcknowledged(source, status, data);
    }

    function registerUser(
        string memory name,
        string memory email,
        string memory birthdate,
        uint256 age,
        string memory phoneNumber,
        string memory streetAddress,
        string memory city
    ) public {
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
}
