const MedicalOracle = artifacts.require("MedicalOracle");

module.exports = function (deployer) {
    deployer.deploy(MedicalOracle);
};
