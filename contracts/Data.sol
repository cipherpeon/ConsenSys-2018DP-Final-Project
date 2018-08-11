pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Society.sol";

contract Data {

    using SafeMath for uint;

    struct User {
        bool registered;
        string name;
        mapping(address => bool) memberOf;
        address[] memberships;
        uint totalDonations;
    }

    mapping(address => User) public users;

    uint public numberOfSocieties;
    uint public numberOfUsers;

    event NewUserAdded();
    event NewSocietyAdded();

    /*
    Getters
    */

    function userGetName(address _user) public view returns (string) {
        return users[_user].name;
    }

    function userIsRegistered(address _user) public view returns (bool) {
        return users[_user].registered;
    }

    function userGetTotalDonations(address _user) public view returns (uint) {
        return users[_user].totalDonations;
    }

    function userGetMemberships(address _user) public view returns (address[]) {
        return users[_user].memberships;
    }

    /*
    Society utilities
    */

    function createSociety(string _name, string _location, bytes32 _logoHash) public returns (Society) {
        require(userExists(msg.sender));
        Society s = new Society(_name, _location, msg.sender, _logoHash);
        joinSociety(s);
        newSocietyAdded();
        return s;
    }

    function joinSociety(address _society) public returns (bool) {
        require(userExists(msg.sender));
        users[msg.sender].memberOf[_society] = true;
        users[msg.sender].memberships.push(_society);
        Society s = Society(_society);
        s.join();
        return true;
    }

    /*
    User utilities
    */

    function userExists(address _user) public view returns (bool) {
        return users[_user].registered;
    }

    function userAddDonation(address _user, uint _donation) private returns (bool) {
        require(userExists(_user));
        users[_user].totalDonations = users[_user].totalDonations.add(_donation);
        return true;
    }

    function userIsMemberOf(address _user, address _society) private view returns (bool) {
        return users[_user].memberOf[_society];
    }

    function addNewUser(string _name) public returns (bool) {
        require(!userExists(msg.sender));
        users[msg.sender].name = _name;
        users[msg.sender].registered = true;
        newUserAdded();
        return true;
    }

    /*
    Other utilities
    */

    function newSocietyAdded() private returns (bool) {
        numberOfSocieties = numberOfSocieties.add(1);
        emit NewSocietyAdded();
        return true;
    }

    function newUserAdded() private returns (bool) {
        numberOfUsers = numberOfUsers.add(1);
        emit NewUserAdded();
        return true;
    }

}
