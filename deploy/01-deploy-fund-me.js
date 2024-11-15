const { network } = require("hardhat");
const { devlopmentChains, networkConfig ,CONFIRMATIONS} = require("../helper-hardhat.config");

module.exports = async ({getNamedAccounts,deployments})=>{

    const {firsetAccount} = await getNamedAccounts();
    const {deploy} = deployments;

    console.log("network.config.chainId=>",network.name);

    if(devlopmentChains.includes(network.name)){
        const mockV3Aggregator= await deployments.get("MockV3Aggregator");
        dataFeedAddr = mockV3Aggregator.address;
    } else {
        dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed;
    }

    const fundMe = deploy("FundMe",{
        from: firsetAccount,
        args: [LOICK_TIME,dataFeedAddr],
        log: true,
        waitConfirmations: CONFIRMATIONS,
    })

    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        await hre.run("verify:verify", {
            address: fundMe.address,
            constructorArguments: [LOICK_TIME,DataFeedAddr],
        });
    } else {
        console.log("network is not sepolia, verf is skip!")
    }
}

module.exports.tags = ['all','fundme'];