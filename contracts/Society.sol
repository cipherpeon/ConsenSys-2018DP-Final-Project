pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/** @title Society contract */
contract Society {

    using SafeMath for uint;

    string public name;
    string public location;
    address public admin;
    string public socialLink;
    uint public memberships;
    mapping(address => bool) public isMember;

    /**
     * @dev Constructor
     * @param _name String for new society name
     * @param _location String for new society location
     * @param _admin Address for new society admin
     * @param _socialLink String for new society social link
     */
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

    /**
     * @dev Setter for society name
     * @param _name String for updated society name
     * @return {bool} Success
     */
    function setName(string _name) external onlyAdmin returns (bool) {
        name = _name;
        return true;
    }

    /**
     * @dev Setter for society location
     * @param _location String for updated society location
     * @return {bool} Success
     */
    function setLocation(string _location) external onlyAdmin returns (bool) {
        location = _location;
        return true;
    }

    /**
     * @dev Setter for society social link
     * @param _socialLink String for updated society social link
     * @return {bool} Success
     */
    function setSocialLink(string _socialLink) external onlyAdmin returns (bool) {
        socialLink = _socialLink;
        return true;
    }

    /*
    Utilities
    */

    /**
     * @dev Getter for user membership status
     * @param _user Address to identify user
     * @return _isMember Identified user's membership status
     */
    function userIsMember(address _user) external view returns (bool _isMember) {
        _isMember = isMember[_user];
    }

    /**
     * @dev Allows user to join society if they haven't already
     * @param _user Address to identify user
     * @return {bool} Success
     */
    function join(address _user) external onlyNonMembers returns (bool) {
        memberships = memberships.add(1);
        isMember[_user] = true;
        return true;
    }

    /**
     * @dev Allows user to leave society if they are a member
     * @param _user Address to identify user
     * @return {bool} Success
     */
    function leave(address _user) external onlyMembers returns (bool) {
        memberships = memberships.sub(1);
        isMember[_user] = false;
        return true;
    }

    /**
     * @dev Allows contract to be paid
     */
    function () external payable {}

}
