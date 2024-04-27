// SPDX-License-Identifier: MIT - Indicates the license under which the contract is distributed
pragma solidity ^0.8.20; // Specifies the compiler version

import "./Math.sol"; // Importing Math library for mathematical operations
import "./Ownable.sol"; // Importing Ownable contract for ownership functionality
import "./Context.sol"; // Importing Context contract for context information

contract PreSale is
    Ownable // Defining the PreSale contract inheriting from Ownable
{
    using Math for uint; // Using Math library for uint operations
    IERC20 public tokenAddress; // Declaring a public variable to hold the token address
    uint public price; // Declaring a public variable to hold the price of tokens
    uint public tokenSold; // Declaring a public variable to hold the total number of tokens sold

    address payable public seller; // Declaring a public variable to hold the address of the seller

    event tokenPurchased(address buyer, uint price, uint tokenValue); // Declaring an event for token purchases

    constructor(IERC20 _tokenAddress, uint _price) {
        // Constructor to initialize contract variables
        tokenAddress = _tokenAddress; // Assigning the token address
        price = _price; // Assigning the token price
        seller = payable(_msgSender()); // Assigning the seller's address
    }

    receive() external payable {
        // Fallback function to receive Ether
        buy(); // Calls the buy function
    }

    function tokenForSale() public view returns (uint) {
        // Function to view the number of tokens available for sale
        return tokenAddress.allowance(seller, address(this)); // Returns the allowance of tokens for the contract
    }

    function buy() public payable returns (bool) {
        require(_msgSender() != address(0), "Null Address not allowed"); // Check if sender address is not null

        // Calculate the token value based on the Ether sent
        uint _tokenValue = msg.value.tryMul(price);

        // Check if the calculated token value is within the available tokens for sale
        require(_tokenValue <= tokenForSale(), "Amount exceeds limit");

        // Update the state by adding the purchased token value to the total tokens sold
        tokenSold += _tokenValue;

        // Transfer Ether from the buyer to the seller
        seller.transfer(msg.value);

        // Transfer tokens from the seller to the buyer
        tokenAddress.transferFrom(seller, _msgSender(), _tokenValue);

        // Emit an event to log the token purchase
        emit tokenPurchased(_msgSender(), price, _tokenValue);

        // Return true upon successful purchase
        return true;
    }

    function setprice(uint _newPrice) public onlyOwner {
        // Function to set a new token price, only accessible by the owner
        price = _newPrice; // Updates the token price
    }

    function updateSeller(address payable _newSeller) public onlyOwner {
        // Function to update the seller's address, only accessible by the owner
        seller = _newSeller; // Updates the seller's address
    }

    function updateTokenAddress(IERC20 _tokenAddress) public onlyOwner {
        // Function to update the token address, only accessible by the owner
        tokenAddress = _tokenAddress; // Updates the token address
    }

    function withdrawToken(
        IERC20 _notEthTokenAddress
    ) public onlyOwner returns (bool) {
        // Function to withdraw non-Ether tokens, only accessible by the owner
        uint tokenBalance = _notEthTokenAddress.balanceOf(address(this)); // Retrieves the token balance of the contract
        _notEthTokenAddress.transfer(seller, tokenBalance); // Transfers tokens to the seller
        return true; // Returns true upon successful withdrawal
    }

    function withdrawFunds() public onlyOwner returns (bool) {
        // Function to withdraw Ether funds, only accessible by the owner
        seller.transfer(address(this).balance); // Transfers Ether balance to the seller
        return true; // Returns true upon successful withdrawal
    }
}
