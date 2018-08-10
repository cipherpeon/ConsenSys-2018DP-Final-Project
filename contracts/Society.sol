pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Society {

    using SafeMath for uint;

    string public name;
    string public location;
    address public admin;
    address public newAdmin;
    address[] public members;
    mapping(address => bool) public isMember;
    Event[] public events;
    bytes32 public logoHash;

    struct Event {
        string name;
        string description;
        string place;
        string time;
        string date;
        string organiser;
        address[] attendees;
    }

    constructor(string _name, string _location, address _admin, bytes32 _logoHash) public {
        name = _name;
        location = _location;
        admin = _admin;
        logoHash = _logoHash;

        members.push(_admin);
        isMember[_admin] = true;
    }

    /*
    Setters
    */

    function setName(string _name) external returns (bool) {
        name = _name;
        return true;
    }

    function setLocation(string _location) external returns (bool) {
        location = _location;
        return true;
    }

    function setAdmin(address _admin) external returns (bool) {
        admin = _admin;
        return true;
    }

    function setNewAdmin(address _newAdmin) external returns (bool) {
        newAdmin = _newAdmin;
        return true;
    }

    function setLogoHash(bytes32 _logoHash) external returns (bool) {
        logoHash = _logoHash;
        return true;
    }

    /*
    Utilities
    */

    function proposeNewAdmin(address _newAdmin) external returns (bool) {
        require(msg.sender == admin);
        newAdmin = _newAdmin;
        return true;
    }

    function acceptNewAdmin() external returns (bool) {
        require(msg.sender == newAdmin);
        admin = newAdmin;
        newAdmin = address(0);
        return true;
    }

    function join() external returns (bool) {
        members.push(msg.sender);
        isMember[msg.sender] = true;
        return true;
    }

}
