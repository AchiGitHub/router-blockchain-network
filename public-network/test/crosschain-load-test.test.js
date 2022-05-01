const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const CrossChainTransaction = artifacts.require("./PublicCrossChain.sol");

const numberOfTransactions = 500;

contract("Cross chain transaction test", async accounts => {

    let crossingChainTransaction;

    before(async () => {
        crossingChainTransaction = await CrossChainTransaction.deployed();
    })

    it(`Test ${numberOfTransactions} Cross chain Calls `, async () => {
        for (let i = 1; i < 1 + numberOfTransactions; i++) {
            let account = accounts[i % 100];
            crossingChainTransaction.requestCall(12, 12);
            /* do not wait for events, because it makes test very slow (330 seconds instead 47) */
            /*await utils.assertEvent(lottery, {
                event: "BuyTicket",
                args: {participant: account}
            });*/
        }
        expect(await crossingChainTransaction.getNumberOfPendingCalls()).to.not.equal(0);
    });
})