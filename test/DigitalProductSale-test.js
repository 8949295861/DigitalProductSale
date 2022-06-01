const { expect } = require("chai");
const { ethers } = require("hardhat");

  let contract;
  let contract1;
  let owner;

  beforeEach(async function () {
     
    const Token = await ethers.getContractFactory("SOCIETYCOIN");
    const token = await Token.deploy("0x0B6319DbcBB51f138101A8BA8578Ff7674abc653","1000000000000000000000000000000");
    contract1 = await token.deployed();
       
    const DigitalProductSale = await ethers.getContractFactory("DigitalProductSale");
    const digitalproductsale = await DigitalProductSale.deploy("0x4f530D50F19ffDC996eC19C6C54a033bb7A9200e","0x0B6319DbcBB51f138101A8BA8578Ff7674abc653");
    contract = await digitalproductsale.deployed();
    [owner] = await ethers.getSigners();

  })


// describe("DigitalProductSale", function () {

//   it("Should return the product Id exist or not", async function () {
//     expect(await contract.saleExist(1)).to.equal(false);    
//   });

//   it("Should return the product buy by the user", async function () {
      
//     const setSaleTx = await contract.saleDigitalProduct(contract1.address, "https://gateway.pinata.cloud/ipfs/QmPqa8GoeVSDA3GBZes6UEZKMd4FMszxgzJW7omaiZB5vy", 100000000000000000000n);
//     // wait until the transaction is mined
//     await setSaleTx.wait();

//     console.log(contract.address);
//     const setApproveTx = await contract1.approve(contract.address,1000000000000000000000000000000000n);
//     // wait until the transaction is mined
//     await setApproveTx.wait();

//     expect(await contract.saleExist(1)).to.equal(true);

//     const setbuyTx = await contract.buyDigitalProduct(contract1.address, 1, 100000000000000000000n)
//     // wait until the transaction is mined
//     await setbuyTx.wait();      
//   });
  
//   // it("Should return the product Id created", async function () {
     
//   //   const setGreetingTx = await contract.saleDigitalProduct("0x8Fd594665Be1AF1BB6359E1917706b05506Df259", "https://gateway.pinata.cloud/ipfs/QmPqa8GoeVSDA3GBZes6UEZKMd4FMszxgzJW7omaiZB5vy", 100);
//   //   // wait until the transaction is mined
//   //   await setGreetingTx.wait();
//   //   expect(await contract.saleExist(1)).to.equal(true); 
//   //   console.log(await contract.getProductDetails(1));
//   // //   expect(await contract.getProductDetails(1)).to.eql(["0x8Fd594665Be1AF1BB6359E1917706b05506Df259", "https://gateway.pinata.cloud/ipfs/QmPqa8GoeVSDA3GBZes6UEZKMd4FMszxgzJW7omaiZB5vy",{ "_hex": "0x64","_isBigNumber": true},true]); 
//   //  });
// });
