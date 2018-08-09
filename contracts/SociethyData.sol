pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract SociethyData {

    using SafeMath for uint;

    struct Society {
        string name;
        string location;
        address admin;
        address newAdmin;
        address[] members;
        Event[] events;
        bytes32 logoHash;
    }

    struct User {
        string name;
        mapping(string => bool) memberOf;
        uint totalDonations;
    }

    struct Event {
        string name;
        string description;
        string place;
        string time;
        string date;
        string organiser;
        address[] attendees;
    }

    mapping(address => User) public users;
    mapping(string => Society) societies;
    mapping(string => Event) events;

    uint public numberOfSocieties;
    uint public numberOfUsers;
    uint public numberOfEvents;

    event NewUserAdded();
    event NewSocietyAdded();
    event NewEventAdded();

    /*
    Setters
    */

    function societySetName(string _society, string _name) private returns (bool) {
        societies[_society].name = _name;
        return true;
    }

    function societySetLocation(string _society, string _location) private returns (bool) {
        societies[_society].location = _location;
        return true;
    }

    function societySetAdmin(string _society, address _admin) private returns (bool) {
        societies[_society].admin = _admin;
        return true;
    }

    function societySetNewAdmin(string _society, address _newAdmin) private returns (bool) {
        societies[_society].newAdmin = _newAdmin;
        return true;
    }

    function societySetLogoHash(string _society, bytes32 _logoHash) private returns (bool) {
        societies[_society].logoHash = _logoHash;
        return true;
    }

    function userSetName(address _user, string _name) private returns (bool) {
        users[_user].name = _name;
        return true;
    }

    function eventSetName(string _event, string _name) private returns (bool) {
        events[_event].name = _name;
        return true;
    }

    function eventSetDescription(string _event, string _description) private returns (bool) {
        events[_event].description = _description;
        return true;
    }

    function eventSetPlace(string _event, string _place) private returns (bool) {
        events[_event].place = _place;
        return true;
    }

    function eventSetTime(string _event, string _time) private returns (bool) {
        events[_event].time = _time;
        return true;
    }

    function eventSetDate(string _event, string _date) private returns (bool) {
        events[_event].date = _date;
        return true;
    }

    function eventSetOrganiser(string _event, string _organiser) private returns (bool) {
        events[_event].organiser = _organiser;
        return true;
    }

    /*
    Getters
    */

    function societyGetName(string _society) public view returns (string) {
        return societies[_society].name;
    }

    function societyGetLocation(string _society) public view returns (string) {
        return societies[_society].location;
    }

    function societyGetAdmin(string _society) public view returns (address) {
        return societies[_society].admin;
    }

    function societyGetNewAdmin(string _society) public view returns (address) {
        return societies[_society].newAdmin;
    }

    function societyGetLogoHash(string _society) public view returns (bytes32) {
        return societies[_society].logoHash;
    }

    function userGetName(address _user) public view returns (string) {
        return users[_user].name;
    }

    function userGetTotalDonations(address _user) public view returns (uint) {
        return users[_user].totalDonations;
    }

    function eventGetName(string _event) public view returns (string) {
        return events[_event].name;
    }

    function eventGetDescription(string _event) public view returns (string) {
        return events[_event].description;
    }

    function eventGetPlace(string _event) public view returns (string) {
        return events[_event].place;
    }

    function eventGetTime(string _event) public view returns (string) {
        return events[_event].time;
    }

    function eventGetDate(string _event) public view returns (string) {
        return events[_event].date;
    }

    function eventGetOrganiser(string _event) public view returns (string) {
        return events[_event].organiser;
    }

    function eventGetAttendees(string _event) public view returns (address[]) {
        return events[_event].attendees;
    }

    /*
    Society utilities
    */

    function societyExists(string _society) public view returns (bool) {
        return bytes(societyGetName(_society)).length != 0;
    }

    function addNewSociety(string _society, string _name, string _location, bytes32 _logoHash) public returns (bool) {
        require(!societyExists(_society));
        societySetName(_society, _name);
        societySetLocation(_society, _location);
        societySetAdmin(_society, msg.sender);
        societySetLogoHash(_society, _logoHash);
        newSocietyAdded();
        return true;
    }

    function proposeNewAdmin(string _society, address _newAdmin) public returns (bool) {
        require(msg.sender == societyGetAdmin(_society));
        societySetNewAdmin(_society, _newAdmin);
        return true;
    }

    function acceptNewAdmin(string _society) public returns (bool) {
        require(msg.sender == societyGetNewAdmin(_society));
        societySetAdmin(_society, societyGetNewAdmin(_society));
        societySetNewAdmin(_society, 0x0);
        return true;
    }

    /*
    User utilities
    */

    function userExists(address _user) public view returns (bool) {
        return bytes(userGetName(_user)).length != 0;
    }

    function userMakeMemberOf(address _user, string _society) private returns (bool) {
        users[_user].memberOf[_society] = true;
        societies[_society].members.push(_user);
        return true;
    }

    function userAddDonation(address _user, uint _donation) private returns (bool) {
        users[_user].totalDonations = users[_user].totalDonations.add(_donation);
        return true;
    }

    function userIsMemberOf(address _user, string _society) private view returns (bool) {
        return users[_user].memberOf[_society];
    }

    function addNewUser(string _name) public returns (bool) {
        require(!userExists(msg.sender));
        userSetName(msg.sender, _name);
        newUserAdded();
        return true;
    }

    function makeMeMemberOf(string _society) public returns (bool) {
        require(!userIsMemberOf(msg.sender, _society));
        userMakeMemberOf(msg.sender, _society);
        return true;
    }

    /*
    Event utilities
    */

    function eventExists(string _event) public view returns (bool) {
        return bytes(eventGetName(_event)).length != 0;
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

    function newEventAdded() private returns (bool) {
        numberOfEvents = numberOfEvents.add(1);
        emit NewEventAdded();
        return true;
    }

}
