//imports
const {getContractFactory} = require("@nomiclabs/hardhat-ethers/types")
const {ethers, run, network} = require("hardhat")

// main function
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    const simpleStorage = await simpleStorageFactory.deploy()
    console.log("deploying the contract...")
    await simpleStorage.deployed()
    console.log(`depoyed contract to:${simpleStorage.address}`)
    if (network.config.chainId===5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for blocks confirmation...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
    }
    

    //calling contract functions
    const currentValue = await simpleStorage.retrieve()
    console.log(`current number is: ${currentValue}`)

    //update the favorite number with new number
    const storeNumber = await simpleStorage.store(7)
    const storageResponse = await storeNumber.wait(1)
    const updatedNumber = await simpleStorage.retrieve()
    console.log(`updated number is:${updatedNumber}`)

    //adding people with their favorite number
    const newPerson= await simpleStorage.setPeople("lucie", 9)
    const personFavoriteNumber= await newPerson.wait(1)
    const personAndNumber= await simpleStorage.people(0)
    console.log(`new person with his favorite number is:${personAndNumber}`)
    const personNumber= await simpleStorage.yourNumber("lucie")
    console.log(`Lucie favorite number is: ${personNumber}`)
}

//verify automatically the contract after its deployed
const verify= async(contractAddress, args)=> {
    console.log("verifying the contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowercase().includes("already verified")) {
            console.log("contract already verified")
        } else {
            console.log(error)
        }
    } 
}

// calling main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
