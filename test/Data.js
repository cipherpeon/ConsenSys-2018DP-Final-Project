var helper = require("./util.js");

const Data = artifacts.require("Data");
const Society = artifacts.require("Society");

contract('Data', async (accounts) => {
  var instance;

  beforeEach(async () => {
    instance = await Data.new();
  });

  describe("During deployment", async () => {
    it("should register the deployer as the owner", async () => {
      let owner = await instance.owner.call();
      assert.equal(owner, accounts[0])
    });

    it("should allow the contract to be unpaused", async () => {
      await instance.pause();
      await instance.unpause();
      let isPaused = await instance.paused.call();
      assert.isFalse(isPaused);
    });
  });

  describe("User creation", function () {
    it("can add a new user", async () => {
      await instance.addNewUser("Jack");
      let exists = await instance.userExists.call(accounts[0]);
      assert.isTrue(exists);
    });

    it("can add new user and register addition to total users", async () => {
      let usersBefore = await instance.numberOfUsers.call();
      await instance.addNewUser("Jack");
      let usersAfter = await instance.numberOfUsers.call();
      assert.isBelow(usersBefore.toNumber(), usersAfter.toNumber());
    });

    it("can add new user and get correct registration status", async () => {
      await instance.addNewUser("Jack");
      let registered = await instance.userIsRegistered.call(accounts[0]);
      assert.isTrue(registered);
    });

  })

  describe("Society creation", function() {
    beforeEach(async () => {
      await instance.addNewUser("Jack");
    });

    it("can create a new society and register addition to total societies", async () => {
      let societiesBefore = await instance.numberOfSocieties.call();
      await instance.createSociety("Blockchain London", "United Kingdom", "https://www.meetup.com/blockchain-London/");
      let societiesAfter = await instance.numberOfSocieties.call();
      assert.isBelow(societiesBefore.toNumber(), societiesAfter.toNumber());
    });

  })

  describe("Society interaction", function() {

    var society;

    beforeEach(async () => {
     await instance.addNewUser("Jack");
     await instance.addNewUser("Jude", {from:accounts[1]});
     await instance.createSociety("Blockchain London", "United Kingdom", "https://www.meetup.com/blockchain-London/");
     society = await instance.allSocieties.call(0);
    });

    it("can join a society", async () => {
      let joined = await instance.joinSociety.call(society, {from:accounts[1]});
      assert.isTrue(joined);
    });

  })

})
