var helper = require("./util.js");

const Data = artifacts.require("Data");
const Society = artifacts.require("Society");

contract('Society', async (accounts) => {
  var instance;
  var data;
  var name = "Blockchain London";
  var location = "United Kingdom";
  var admin = accounts[0];
  var socialLink = "https://www.meetup.com/blockchain-London/";

  beforeEach(async () => {
    data = await Data.new();
    instance = await Society.new(name, location, admin, socialLink);
  });

  describe("During deployment", async () => {
    it("should register the admin as a member", async () => {
      let isMember = await instance.userIsMember.call(admin);
      assert.isTrue(isMember);
    });

    it("should register number of members as 1", async () => {
      let memberships = await instance.memberships.call();
      assert.equal(1, memberships);
    });
  });

  describe("Society interaction", async () => {
    it("should allow user to join", async () => {
      await data.addNewUser("Jack", {from:accounts[1]});
      let joined = await instance.join.call(accounts[1], {from:accounts[1]});
      assert.isTrue(joined);
    });

    it("should not allow members to join", async () => {
      await helper.expectThrow(instance.join(accounts[0]));
    });

    it("should allow member to leave", async () => {
      await data.addNewUser("Jack", {from:accounts[1]});
      await instance.join(accounts[1], {from:accounts[1]});
      let left = await instance.leave.call(accounts[1], {from:accounts[1]});
      assert.isTrue(left);
    });

    it("should allow admin to withdraw donations", async () => {
      await data.addNewUser("Jack", {from:accounts[1]});
      await instance.join(accounts[1], {from:accounts[1]});
      await web3.eth.sendTransaction({from:accounts[1], to:instance.address, value:web3.toWei(1, "ether")})
      let result = await instance.withdraw.call();
      assert.isTrue(result);
    });
  });

})
