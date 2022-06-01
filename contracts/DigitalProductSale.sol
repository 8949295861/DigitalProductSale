//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./NFT.sol";

contract DigitalProductSale is Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private productIds;

    address nftContractAddress;
    address devWallet;

    struct Product
    {
        address tokenAddress;
        string uri;
        uint256 amount;
        bool saleStatus;
    }

    mapping(uint256=>Product) saleProductStored;

    modifier isSaleContinue(
        uint256 _productIds
    )
    {
        require(saleProductStored[_productIds].saleStatus,"product not exist");
        _;
    }
    
    event SaleProduct(address tokenAddress, string uri, uint256 amount);
    event BuyProduct(address buyerAddress ,address  tokenAddress, uint256 productIds, uint256 amount);

    constructor(
        address _nftContractAddress,
        address _devWallet
    )
    {
        nftContractAddress = _nftContractAddress;
        devWallet = _devWallet;
    }

    function saleDigitalProduct(
       address _tokenAddress,
       string memory _uri,
       uint256 _amount 
    ) external 
      onlyOwner
    {
        productIds.increment();
        uint256 newProductId = productIds.current();

        saleProductStored[newProductId] = Product(_tokenAddress,_uri,_amount,true);
        emit SaleProduct(_tokenAddress, _uri, _amount);
    }

    function buyDigitalProduct(
        address _tokenAddress,
        uint256 _productIds,
        uint256 _amount
    ) external 
      isSaleContinue(_productIds)
    {
        
        require(_amount>=saleProductStored[_productIds].amount,"amount is less");

        require(_tokenAddress == saleProductStored[_productIds].tokenAddress,
            "not same token address");
        
        require(IERC20(_tokenAddress).transferFrom(msg.sender, devWallet,
           _amount),"allowance not enough");

        string memory uri = saleProductStored[_productIds].uri;

        NFT(nftContractAddress).mint(msg.sender, uri);
        emit BuyProduct(msg.sender , _tokenAddress, _productIds, _amount);
    }

    function saleExist(
        uint256 _productIds 
    ) external
      view
      returns(
        bool
    )
    {
       return saleProductStored[_productIds].saleStatus;
    }

    function getProductDetails(
        uint256 _productIds
    ) external
      view
      returns(
        Product memory
    )
    {
       return saleProductStored[_productIds];
    }

}