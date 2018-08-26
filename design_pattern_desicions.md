# Design Pattern Decisions

> A document called design_pattern_desicions.md that explains why you chose to use the design patterns that you did.

## Required: Implement a circuit breaker / emergency stop

This design patten was required feature for the final project. The way that I implemented this was to use the OpenZeppelin [Pausable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol)
contract. This means that for important functions such as withdrawing money, they can be paused in the case of an error so that the
monetary damage is reduced.

## Further: What other design patterns have you used or not used?

In the Society contract, I have used an [Ownable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)
style design pattern, where only an admin can make certain changes to the contract data. This has a two-fold advantage; it creates
a natural hierarchy as found in traditional meetups, but also restricts the manipulation of the contract state so no bad actors
can make unwanted changes to a society.
