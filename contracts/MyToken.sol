// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./vendor/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
      //  console.log("MyToken contract deployed with initial supply:", initialSupply);
    }
}

