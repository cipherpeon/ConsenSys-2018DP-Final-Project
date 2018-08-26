# Avoiding Common Attacks

> A document called avoiding_common_attacks.md that explains what measures you took to ensure that your contracts are not susceptible to common attacks. (Module 9 Lesson 3)

## Required: Explain what measures they’ve taken to ensure that their contracts are not susceptible to common attacks

I have taken sufficient measures to avoid the following common attacks:

### Integer Arithmetic Overflow

To avoid this attack, I used the OpenZeppelin [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol) 
contract when wanting to use mathematical operators on `uint` variables.

### Recursive Calls

To avoid this attack, specifically a re-entrancy attack when transferring funds out of a society contract to the admins account,
I ensured that a) only the admin can call the function, and b) the function is as simple as possible, where there are no state changes
or change of ownership, and there is no flexibility on the amount that can be withdrawn. Using the `transfer` function also
restricts the amount of gas that can be used, whereas using `.call.value()` has no gas restriction and can allow an attacker to
call the function recursively.

### Logic Bugs

By providing unit tests, I was able to ensure important contract logic worked as expected, such as conditionally joining/leaving a society
(see tests for more details)
