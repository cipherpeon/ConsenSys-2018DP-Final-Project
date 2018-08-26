# Societhy
Final Project for the ConsenSys 2018 Developer Program

## A decentralised meetup platform
Societhy provides a way for Ethereum enthusiasts to create a local meetup, without
paying any subscription costs for hosting it. You can create a meetup which is called a society,
and assign it a location, a name, and a link to the groups preferred social platform (Telegram etc).
You can also explore existing societies by location, and if there is one you would like to be a part
of you can join in and event donate to it. You have the ability to leave at any time as well.

## How to set it up locally

Ensure that you have `npm` and `truffle` installed

1. Clone this repo
2. Run `npm install`
3. Start up `ganache-cli`
4. Run `truffle console --network ganachecli`
- In the console, run `migrate --reset`
5. Run `npm start`
6. Sign into Metamask and use the `Localhost 8545` network

## How to use online

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby

## Tests

Javascript tests have been written for each contract, and are run with `truffle test`.
Explanations of tests have been included as comments in the test files.

## User Stories

Here are some example user interaction flows

### I've just heard about Societhy, and want to see if there's a society near me

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby
3. You are prompted to register, and after you have registered you can continue to your Profile page
4. Since you have not joined or created any societies the Profile page is minimal
5. To find a local society, you head to the Explore page
6. You choose your location (e.g United Kingdom)
7. You can scroll through the results and see what societies are on the platform

### I've signed up to Societhy and there is no society that suits me, I'm going to create one!

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby
3. You are welcomed back as an existing user, click continue to the Profile page
4. You proceed to the Create page
5. You enter your new society name, choose the location (e.g United Kingdom) and provide a social link (e.g Telegram join link)
6. You click create and pay the gas fee (the only fee you need to pay!)

### I registered for Societhy a while back but there weren't any societies that interested me. I recently met X and they told me they just made a society and gave me the contract address, I want to join!

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby
3. You are welcomed back as an existing user, click continue to the Profile page
4. You proceed to the Manage page
5. You enter (probably paste) the contract address into the search bar and click Go
6. The society shows up in the results and you click Join

### After joining a society and getting the social link, we organised a meetup and I met everybody IRL. It was great fun and I want to donate to the organisers!

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby
3. You are welcomed back as an existing user, click continue to the Profile page
4. On the Profile page you see the society you want to donate to and you copy the contract address
5. You proceed to the Donate page
6. You enter (probably paste) the contract address you want to donate to in the input box
7. You enter the amount of ETH you want to donate and click Go

### I'm a society admin and I've received donations from the lovely members. I'd like to withdraw them so I can pay for beers at the next meetup!

1. Visit https://societhy.herokuapp.com
2. Ensure you are logged into MetaMask and on Rinkeby
3. You are welcomed back as an existing user, click continue to the Profile page
4. On the Profile page you see the society you're an admin of and you copy the contract address
5. You proceed to the Manage page
6. You enter (probably paste) the contract address you're the admin of and want to withdraw from and click Go
7. The society shows up in the results and you click Withdraw
