// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVault {
    IERC20 public immutable token;
    uint public totalShares;
    mapping(address => uint) public shareBalances;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function mintShares(address _to, uint _amount) private {
        totalShares += _amount;
        shareBalances[_to] += _amount;
    }

    function burnShares(address _from, uint _amount) private {
        totalShares -= _amount;
        shareBalances[_from] -= _amount;
    }

    function depositTokens(uint _amount) external {
        uint shares;
        if (totalShares == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalShares) / token.balanceOf(address(this));
        }

        mintShares(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function withdrawTokens(uint _shares) external {
        uint amount = (_shares * token.balanceOf(address(this))) / totalShares;
        burnShares(msg.sender, _shares);
        token.transfer(msg.sender, amount);
    }
}
