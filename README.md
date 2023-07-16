# TokenVault Contract

A Simple vault contract, calculating shares to mint on deposit and the amount of tokens to withdraw.

## Overview of working

- User deposit underlying staking token and in return gets shares which acts as their representation.
- Vault will accrue yield on top of the deposited tokens via further lending the tokens to others DeFi protocols.
- User anytime can redeem these shares against it's principal amount plus any yield generated on top of it.

## Code Overview

The `TokenVault` contract is written in Solidity and uses the OpenZeppelin ERC20 contract interface. The following are the public functions of the contract:

### Constructor

The constructor function takes a single parameter, `_token`, which is the address of the ERC20 token that the vault will hold.

### `depositTokens` Function

The `depositTokens` function is called by a user to deposit tokens into the vault. The function calculates the number of shares to mint based on the current total number of shares and the amount of tokens being deposited. The function then mints the shares and transfers the tokens from the user's address to the vault.

### `withdrawTokens` Function

The `withdrawTokens` function is called by a user to withdraw tokens from the vault. The function calculates the amount of tokens to withdraw based on the number of shares being burned and the current balance of the ERC20 token held by the vault. The function then burns the shares and transfers the tokens to the user's address.

### `mintShares` and `burnShares` Functions

The `mintShares` and `burnShares` functions are private functions used to update the total number of shares and the balance of shares held by a particular user.

## License

This code is licensed under the MIT License. See the `LICENSE` file for more information.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
