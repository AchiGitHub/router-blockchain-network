// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract PublicCrossChain {
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
        uint256 data
    ) public {
        emit CallbackRequestInitiated(source, destination, data);
    }
}