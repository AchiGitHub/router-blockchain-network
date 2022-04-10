const Migrations = artifacts.require("MedicalRecords");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
