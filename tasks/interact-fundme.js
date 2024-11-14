const { task } = require("hardhat/config");

task("interact-fundme","合约交互")
    .addParam("addr", "fundme contarct address")
    .setAction(async (taskArgs,hre)=>{
        const fundMeFactory = await ethers.getContractFactory("FundMe");
        const fundMe = fundMeFactory.attach(taskArgs.addr)
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
    })

    module.exports = {}