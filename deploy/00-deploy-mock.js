const { network } = require("hardhat");
const {DECIMAL,INITIAL_ANSWER} = require("../helper-hardhat.config")
const { devlopmentChains } = require("../helper-hardhat.config");

module.exports = async ({getNamedAccounts,deployments})=>{

    if(devlopmentChains.includes(network.name)){
        const {firsetAccount} = await getNamedAccounts();
        const {deploy} = deployments;
    
        deploy("MockV3Aggregator",{
            from: firsetAccount,
            args: [DECIMAL, INITIAL_ANSWER],
            log: true
        })
    } else {
        console.log("environment is not local, mock contarct deployment is skip!")
    }
}

module.exports.tags = ['all','mock'];