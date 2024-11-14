const {ethers} = require("hardhat");

async function main(){

    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("ccontract  deploying");

    // deploy contact from factory
    const fundMe = await fundMeFactory.deploy(300);
    
    await fundMe.waitForDeployment();
    console.log(`successfully, contarct address is ${fundMe.target}`);

    
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){

        await fundMe.deploymentTransaction().wait(5);
        console.log("waiting for 5 confirations");

        await hre.run("verify:verify", {
            address: fundMe.target,
            constructorArguments: [300],
        });
    } else {
        console.log("skip verification");
    }

    //init 2 accounts
    const [firstAccount, secondAccount] = await ethers.getSigners();

    //fund contract with first account
    const fundTx = await fundMe.fund({value: ethers.parseEther("0.01")});
    await fundTx.wait();

    // check balance of contarct
    const balanceOfCountract =await ethers.provider.getBalance(fundMe.target);
    console.log(`balance of the contract is ==> ${balanceOfCountract}`);

    //  fund contract with second account
    const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.01")});
    await fundTxWithSecondAccount.wait();

    // check balance of contarct
    const balanceOfCountractAfterSecondFund =await ethers.provider.getBalance(fundMe.target);
    console.log(`balance of the contract is ==> ${balanceOfCountractAfterSecondFund}`);
    
    // check mapping fundersToAmount
    const firstAccountBanaceInFundMe = fundMe.fundersToAmount(firstAccount.address);
    const secondAccountBanaceInFundMe = undMe.fundersToAmount(secondAccount.address);

    console.log(`Balance of first account ${firstAccount.address} is ${firstAccountBanaceInFundMe}`);
    console.log(`Balance of second account ${secondAccount.address} is ${secondAccountBanaceInFundMe}`);
    
}

main().then().catch((err)=>{
    console.error(err);
    process.exit(0);
})