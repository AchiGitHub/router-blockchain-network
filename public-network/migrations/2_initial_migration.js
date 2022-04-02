const CrossChain = artifacts.require("PublicCrossChain");

module.exports = function (deployer) {
    deployer.deploy(CrossChain);
};
