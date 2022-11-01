//SPDX-License-Indetifier: Unlicense

pragma solidity ^0.8.0;

contract BuyMeCryptoCoffee {
    event NewMessage (
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Message {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }


    address payable owner;

    Message[] message;

    constructor() {
        owner = payable(msg.sender);
    }

    function getMessage() public view returns (Message[] memory) {
        return message;
    }

    function getCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't send message for free");

        message.push(Message(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMessage(msg.sender, block.timestamp, _name, _message);
    }

    function withdraw() public {
            require(owner.send(address(this).balance));
    }

}