pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Society.sol";

contract Data {

    using SafeMath for uint;

    struct User {
        address wallet;
        bool registered;
        string name;
        mapping(address => bool) memberOf;
        uint memberships;
        uint totalDonations;
    }

    mapping(address => User) public users;
    User[] public allUsers;
    Society[] public allSocieties;

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
        uint len = users[_user].memberships;
        address[] memory memberships = new address[](len);
        uint pointer = 0;
        for (uint i = 0; i < allSocieties.length; i++) {
            if (allSocieties[i].userIsMember(_user)) {
                memberships[pointer] = address(allSocieties[i]);
                pointer = pointer.add(1);
            }
        }
        return memberships;
    }

    function societyGetMembers(address _society) public view returns (address[]) {
        Society s = Society(_society);
        uint len = s.memberships();
        address[] memory memberships = new address[](len);
        uint pointer = 0;
        for (uint i = 0; i < allUsers.length; i++) {
            if (allUsers[i].memberOf[_society]) {
                memberships[pointer] = allUsers[i].wallet;
                pointer = pointer.add(1);
            }
        }
        return memberships;
    }

    /*
    Society utilities
    */

    function createSociety(string _name, string _location, bytes32 _logoHash) public returns (Society) {
        require(userExists(msg.sender));
        Society s = new Society(_name, _location, msg.sender, _logoHash);
        allSocieties.push(s);
        joinSociety(s);
        newSocietyAdded();
        return s;
    }

    function joinSociety(address _society) public returns (bool) {
        require(userExists(msg.sender));
        users[msg.sender].memberOf[_society] = true;
        users[msg.sender].memberships = users[msg.sender].memberships.add(1);
        Society s = Society(_society);
        s.join(msg.sender);
        return true;
    }

    function leaveSociety(address _society) public returns (bool) {
        require(userExists(msg.sender));
        users[msg.sender].memberOf[_society] = false;
        users[msg.sender].memberships = users[msg.sender].memberships.sub(1);
        Society s = Society(_society);
        s.leave(msg.sender);
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
        users[msg.sender].wallet = msg.sender;
        users[msg.sender].registered = true;
        allUsers.push(users[msg.sender]);
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
