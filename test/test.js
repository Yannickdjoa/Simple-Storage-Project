const {assert}= require("chai");
describe("simpleStorage", function(){
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach( async function () {
        simpleStorageFactory= await ethers.getContractFactory(
            "SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })
    it("initial faorite number should be 0", async function(){
        const currentValue = await simpleStorage.retrieve();
        const expectedValue="0";
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("updated value should equal the stored value", async function(){
        const expectedValue="7";
        const storedValue= await simpleStorage.store(expectedValue)
        const updatedValue = await simpleStorage.retrieve();
        
        assert.equal(updatedValue.toString(), expectedValue)
    })
    it("render a person name and his stored favorite number based on their index", async function(){
        const expectedName= "lucie";
        const expectedNumber="9";
        const storedValue= await simpleStorage.setPeople(expectedName, expectedNumber);
        await storedValue.wait(1)
        const {name, favoriteNumber}= await simpleStorage.people(0)
        assert.equal(name, expectedName)
        assert.equal(favoriteNumber, expectedNumber)
    })
    it("should give back the favorite number of a given name", async function(){
        const expectedName= "lucie";
        const expectedNumber="9";
        const storedValue= await simpleStorage.setPeople(expectedName, expectedNumber);
        await storedValue.wait(1)
        const outputValue= await simpleStorage.yourNumber(expectedName)
        assert.equal(outputValue, expectedNumber)
    })
})
    
        
    
