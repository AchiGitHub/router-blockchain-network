const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const CrossChainTransaction = artifacts.require("./PublicCrossChain.sol");

contract("Cross chain transaction test", async accounts => {

    let crossingChainTransaction;

    before(async () => {
        crossingChainTransaction = await CrossChainTransaction.deployed();
    })

    describe('Initiate Request Call', () => {
        it("initiate crossing chain trasnaction successfully", async () => {
            const req = await crossingChainTransaction.requestCall(12, "sdasd");
            expectEvent.inLogs(req.logs, "CallbackRequestInitiated")
        });
        it("should throw error for invalid arguments", async () => {
            await expectRevert(crossingChainTransaction.requestCall(0, "sdasd"), "Invalid crosschain tranasction")
        });
    });

    describe('Acknowledge Response', () => {

        it("acknowledge the message recieved from third", async () => {
            const req = await crossingChainTransaction.requestCall(12, "sdasd");
            expectEvent.inLogs(req.logs, "CallbackRequestInitiated");
        });

        it("should throw error for invalid arguments", async () => {
            await expectRevert(crossingChainTransaction.requestCall(0, "sdasd"), "Invalid crosschain tranasction")
        });

        it("should return data for the caller", async () => {
            let req = await crossingChainTransaction.acknowledgeCall(accounts[0], true, "sdasd");
            expectEvent.inLogs(req.logs, 'CallbackRequestAcknowledged', { callerId: accounts[0] })
        });

        it("should not return acknowledge data to invalid caller", async () => {
            let fd = await crossingChainTransaction.acknowledgeCall(accounts[2], true, "sdasd");
            expectEvent.notEmitted.inTransaction(fd.tx, 'CallbackRequestAcknowledged', { callerId: accounts[1] })
        });
    });
})