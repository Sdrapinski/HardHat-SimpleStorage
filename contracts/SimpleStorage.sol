// SPDX-License-Identifier: MIT
pragma solidity 0.8.9; // wersja solidity

contract SimpleStorage {
    // typy: boolean uint int address bytes
    uint256 public favNoumber; //default 0 storage variable
    // People public person = People({favouriteNumber:2,name:"Szymon"});

    mapping(string => uint256) public nameToFavouriteNumber;

    struct People {
        uint256 favouriteNumber;
        string name;
    }
    //array
    People[] public people; //dynamiczna

    //People[3] public people2;//statyczna

    function store(uint256 _favouriteNumber) public virtual {
        favNoumber = _favouriteNumber;
        retrive();
    }

    // odwołanie sie do funkcji view / pure jest free chyba ze robisz to w funkcji ktora zurzywa gas
    //view pure nie modyfikują stanu blockchainu
    function retrive() public view returns (uint256) {
        return favNoumber;
    }

    // calldata,memory,storage
    // array struct i mapping potrzebuja slowa memory
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        //People memory newPerson = People({favouriteNumber:_favoriteNumber,name:_name}); to to samo
        People memory newPerson = People(_favoriteNumber, _name);
        people.push(newPerson);
        nameToFavouriteNumber[_name] = _favoriteNumber;
    }
}
