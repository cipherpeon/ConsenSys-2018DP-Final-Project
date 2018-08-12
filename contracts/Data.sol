pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
import "./Society.sol";

/** @title Societhy Data */
contract Data is Pausable {

    using SafeMath for uint;

    struct User {
        address wallet;
        bool registered;
        string name;
        mapping(address => bool) memberOf;
        uint memberships;
    }

    mapping(address => User) public users;
    mapping(string => Society[]) societiesInLocation;
    User[] public allUsers;
    Society[] public allSocieties;

    uint public numberOfSocieties;
    uint public numberOfUsers;
    uint public totalDonations;

    event NewUserAdded();
    event NewSocietyAdded();

    /*
    Getters
    */

    /**
     * @dev Getter for user name
     * @param  _user Address to identify user
     * @return _name Identified user's name
     */
    function userGetName(address _user) public view returns (string _name) {
        _name = users[_user].name;
    }

    /**
     * @dev Getter for user registration status
     * @param  _user Address to identify user
     * @return _registered Identified user's registration status
     */
    function userIsRegistered(address _user) public view returns (bool _registered) {
        _registered = users[_user].registered;
    }

    /**
     * @dev Getter for user existence
     * @param  _user Address to identify user
     * @return _exists Identified user's existence
     */
    function userExists(address _user) public view returns (bool _exists) {
        _exists = users[_user].registered;
    }

    /**
     * @dev Getter for user membership status
     * @param  _user Address to identify user
     * @param  _society Address to identify society
     * @return _isMemberOf Identified user's membership status of identified society
     */
    function userIsMemberOf(address _user, address _society) private view returns (bool _isMemberOf) {
        _isMemberOf = users[_user].memberOf[_society];
    }

    /**
     * @dev Getter for list of societies user is member of
     * @param  _user Address to identify user
     * @return {address[]} List of addresses identifying societies the identified user is member of
     */
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

    /**
     * @dev Getter for list of members that belong to a society
     * @param  _society Address to identify society
     * @return {address[]} List of addresses identifying users the identified society has
     */
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

    /**
     * @dev Getter for list of societies that are in an identified location
     * @param  _location String to identify location
     * @return _inLocation List of addresses identifying societies in the identified location
     */
    function getSocietiesInLocation(string _location) public view returns (Society[] _inLocation) {
        _inLocation = societiesInLocation[_location];
    }

    /*
    Society utilities
    */

    /**
     * @dev Creates a new society
     * @param  _name String for new society name
     * @param  _location String for new society location
     * @param  _name String for new society's social link
     * @return _society New society contract address
     */
    function createSociety(string _name, string _location, string _socialLink) public whenNotPaused returns (Society _society) {
        require(userExists(msg.sender));
        _society = new Society(_name, _location, msg.sender, _socialLink);
        allSocieties.push(_society);
        societiesInLocation[_location].push(_society);
        users[msg.sender].memberOf[_society] = true;
        users[msg.sender].memberships = users[msg.sender].memberships.add(1);
        newSocietyAdded();
    }

    /**
     * @dev Allows user to join an existing society
     * @param  _society Address to identify society
     * @return {bool} Success
     */
    function joinSociety(address _society) public whenNotPaused returns (bool) {
        require(userExists(msg.sender));
        users[msg.sender].memberOf[_society] = true;
        users[msg.sender].memberships = users[msg.sender].memberships.add(1);
        Society s = Society(_society);
        s.join(msg.sender);
        return true;
    }

    /**
     * @dev Allows user to leave an existing society
     * @param  _society Address to identify society
     * @return {bool} Success
     */
    function leaveSociety(address _society) whenNotPaused public returns (bool) {
        require(userExists(msg.sender));
        users[msg.sender].memberOf[_society] = false;
        users[msg.sender].memberships = users[msg.sender].memberships.sub(1);
        Society s = Society(_society);
        s.leave(msg.sender);
        return true;
    }

    /**
     * @dev Allows user to donate to an existing society they're a member of
     * @param  _society Address to identify society
     * @return {bool} Success
     */
    function makeDonation(address _society) public whenNotPaused payable returns (bool) {
        require(userExists(msg.sender) && users[msg.sender].memberOf[_society]);
        _society.transfer(msg.value);
        totalDonations = totalDonations.add(msg.value);
        return true;
    }

    /*
    User utilities
    */

    /**
     * @dev Registers a new user
     * @param _name String for new user name
     * @return {bool} Success
     */
    function addNewUser(string _name) public whenNotPaused returns (bool) {
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

    /**
     * @dev Logs a new society being added
     */
    function newSocietyAdded() private {
        numberOfSocieties = numberOfSocieties.add(1);
        emit NewSocietyAdded();
    }

    /**
     * @dev Logs a new user being registered
     */
    function newUserAdded() private {
        numberOfUsers = numberOfUsers.add(1);
        emit NewUserAdded();
    }

}
