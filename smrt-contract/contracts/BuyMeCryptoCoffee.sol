//SPDX-License-Indetifier: Unlicensed

pragma solidity ^0.8.0;

contract BuyMeCryptoCoffee {
    event NewMemo (
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }


    address payable owner;

    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't send message for free");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withdraw() public {
            require(owner.send(address(this).balance));
    }

}