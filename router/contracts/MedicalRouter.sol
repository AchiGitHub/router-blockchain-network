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
        uint256 data
    );
    event CallbackRequestAcknowledged(
        uint256 source,
        uint256 destination,
        uint256 data
    );

    constructor() {
        owner = msg.sender;
    }

    function requestCall(
        uint256 source,
        uint256 destination,
        uint256 data
    ) public {
        emit CallbackRequestInitiated(source, destination, data);
    }

    function responseCall(
        uint256 source,
        uint256 destination,
        uint256 data
    ) public {
        emit CallbackRequestAcknowledged(source, destination, data);
    }
}
