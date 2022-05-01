const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const RouterNodes = artifacts.require("./Router.sol");

contract("Router nodes test", async accounts => {

    let routerNodes;

    before(async () => {
        routerNodes = await RouterNodes.deployed();
    })

    describe('Router Node', () => {
        it("create router node", async () => {
            const node = 1;
            const blockchainName = 'medical';
            const priority = '1';
            const blockchainAddr = accounts[0];
            const timestamp = "0";
            const appInterface = "22";

            const createRouterCall = await routerNodes.setRouter(node, blockchainName, priority, blockchainAddr, timestamp, appInterface);

            const storedRouterNode = await routerNodes.getRouterNode(node);
            expect(storedRouterNode[0]).to.equal(blockchainName);
            expect(storedRouterNode[1]).to.equal(priority);
            expect(storedRouterNode[2]).to.equal(blockchainAddr);
        });
    });

})