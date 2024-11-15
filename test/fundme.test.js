const { ethers, deployments, getNamedAccounts } = require("hardhat")
const { assert } = require("chai")

describe("test fundme contract",function(){

    let fundMe
    let firstAccount

    beforeEach(async function () {
        await deployments.fixture(["all"]);
        firstAccount = (await getNamedAccounts()).firstAccount;
        const fundMeDeployments = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe",fundMeDeployments.address);
    })

    it("test if the owner is mag.sender", async function () {
        assert.equal((await fundMe.owner()),firstAccount);
    })

    it("test if the dataFeed is assigned conrrectly", async function () {
        assert.equal((await fundMe.dataFeed()),"0x694AA1769357215DE4FAC081bf1f309aDC325306");
    })

    
})