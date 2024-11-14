const {task} = require("hardhat/config");

task("deploy-fundme", "合约部署").setAction(async(taskArgs, hre)=>{
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
});

module.exports = {}