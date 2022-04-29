// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Router {
    struct RouterInformation {
        string blokchainName;
        uint256 priority;
        address blockchainAddress;
        string timestamp;
        string applicationInterface;
    }

    mapping(uint256 => RouterInformation) public routingAddresses;
    uint256 routerAddressCount;

    function setRouter(
        uint256 node,
        string memory blockchainName,
        uint256 priorirty,
        address blockchainAddress,
        string calldata timestamp,
        string memory applicationInterface
    ) public {
        routingAddresses[node] = RouterInformation(
            blockchainName,
            priorirty,
            blockchainAddress,
            timestamp,
            applicationInterface
        );
        routerAddressCount++;
    }

    function getRouterNode(uint256 id)
        public
        view
        returns (RouterInformation memory)
    {
        return routingAddresses[id];
    }

    function getAllNodes() public view returns (RouterInformation[] memory) {
        RouterInformation[] memory ret = new RouterInformation[](
            routerAddressCount
        );
        for (uint256 i = 0; i < routerAddressCount; i++) {
            ret[i] = routingAddresses[i];
        }
        return ret;
    }
}
