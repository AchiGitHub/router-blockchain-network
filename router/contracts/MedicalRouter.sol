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
        uint256 source,
        uint256 destination,
        string data,
        address callerAddress
    );
    event CallbackRequestAcknowledged(
        uint256 source,
        uint256 destination,
        string data
    );

    constructor() {
        owner = msg.sender;
    }

    function requestCall(
        uint256 source,
        uint256 destination,
        string memory data,
        address callerAddress
    ) public {
        emit CallbackRequestInitiated(source, destination, data, callerAddress);
    }

    function responseCall(
        uint256 source,
        uint256 destination,
        string memory data
    ) public {
        emit CallbackRequestAcknowledged(source, destination, data);
    }
}
