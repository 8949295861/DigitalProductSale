// SPDX-License-Identifier: GPL-3.0

// Amended by HashLips
/**
    !Disclaimer!
    These contracts have been used to create tutorials,
    and was created for the purpose to teach people
    how to create smart contracts on the blockchain.
    please review this code on your own before using any of
    the following code for production.
    HashLips will not be liable in any way if for the use 
    of the code. That being said, the code has been tested 
    to the best of the developers' knowledge to work as intended.
*/

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  bool public paused = false;

  mapping(uint256 => string) tokenMetadataCID; 
  
  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {

  }

  // external
  function mint(address _to,string memory _uri) external onlyOwner 
  {
    uint256 supply = totalSupply();
    require(!paused);
    
    _safeMint(_to, supply + 1);
    tokenMetadataCID[(supply + 1)] = _uri;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    return tokenMetadataCID[tokenId];
    }

    function pause(bool _state) external onlyOwner {
     paused = _state;
    }

}