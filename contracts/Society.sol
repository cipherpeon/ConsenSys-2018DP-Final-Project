pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Society {

    using SafeMath for uint;

    string public name;
    string public location;
    address public admin;
    string public socialLink;
    uint public memberships;
    mapping(address => bool) public isMember;

    constructor(string _name, string _location, address _admin, string _socialLink) public {
        name = _name;
        location = _location;
        admin = _admin;
        socialLink = _socialLink;
        memberships = 1;
        isMember[_admin] = true;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyMembers() {
        require(isMember[msg.sender]);
        _;
    }

    modifier onlyNonMembers() {
        require(!isMember[msg.sender]);
        _;
    }

    /*
    Setters
    */

    function setName(string _name) external onlyAdmin returns (bool) {
        name = _name;
        return true;
    }

    function setLocation(string _location) external onlyAdmin returns (bool) {
        location = _location;
        return true;
    }

    function setAdmin(address _admin) external onlyAdmin returns (bool) {
        admin = _admin;
        return true;
    }

    function setSocialLink(string _socialLink) external onlyAdmin returns (bool) {
        socialLink = _socialLink;
        return true;
    }

    /*
    Utilities
    */

    function userIsMember(address _user) external view returns (bool) {
        return isMember[_user];
    }

    function join(address _user) external onlyNonMembers returns (bool) {
        memberships = memberships.add(1);
        isMember[_user] = true;
        return true;
    }

    function leave(address _user) external onlyMembers returns (bool) {
        memberships = memberships.sub(1);
        isMember[_user] = false;
        return true;
    }

    function () external payable {}

}
