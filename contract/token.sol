// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts@5.1.0/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts@5.1.0/access/Ownable.sol";

contract Dalas is ERC20, Ownable, ERC20Permit{
    // Events
    event TokensMinted(address indexed to, uint256 amount);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20("Dalas", "DKL") {
        _mint(msg.sender, initialSupply *10 ** decimals());
        emit Transfer(address(0), msg.sender, initialSupply *10 ** decimals());
    }

    // Mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

}