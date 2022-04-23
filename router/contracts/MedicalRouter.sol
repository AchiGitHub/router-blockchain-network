// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract MedicalOracle {
    address public owner;

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
        address source,
        uint256 destination,
        string data,
        address callerAddress
    );
    event CallbackRequestAcknowledged(
        address indexed source,
        uint256 destination,
        string data,
        address callerAddress
    );

    constructor() {
        owner = msg.sender;
    }

    function requestCall(
        address source,
        uint256 destination,
        string memory data,
        address callerAddress
    ) public {
        emit CallbackRequestInitiated(source, destination, data, callerAddress);
    }

    function responseCall(
        address source,
        uint256 destination,
        string memory data,
        address callerAddress
    ) public {
        emit CallbackRequestAcknowledged(
            source,
            destination,
            data,
            callerAddress
        );
    }
}
