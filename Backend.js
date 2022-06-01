var Web3 = require("web3");
var fs = require('fs');
const path = require('path');
var cronJob = require('cron').CronJob;
const config = require('./config.json');
const DigitalProductSale = require('./DigitalProductSale.json');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const SaleCOntractAddress = config.SaleCOntractAddress;

const web3ETH = new Web3(new Web3.providers.HttpProvider(config.connectionURL));

const SWAP_INSTANCE = new web3ETH.eth.Contract(DigitalProductSale,SaleCOntractAddress);
 
var cronJ1 = new cronJob("*/1 * * * *", async function () {
    checkPending()
}, undefined, true, "GMT");

async function checkPending() {
    fs.readFile(path.resolve(__dirname, './ProductBlock.json'), async (err, blockData) => {
        if (err) {
            console.log(err);
            return;
        }

        blockData = JSON.parse(blockData);
        let lastcheckBlock = blockData["lastblock"];
        const latest = await web3ETH.eth.getBlockNumber();
        console.log(lastcheckBlock,latest)
        blockData["lastblock"] = latest;
         
        SWAP_INSTANCE.getPastEvents({},
        {
            fromBlock: lastcheckBlock,
            toBlock: latest // You can also specify 'latest'          
        })
        .then(async function (resp) {
            for (let i = 0; i < resp.length; i++) {
                if (resp[i].event === "BuyProduct") {
                    console.log("TokenTransfer emitted");
                    
                    console.log(resp[i].returnValues[0],resp[i].returnValues[1]);
                    console.log(resp[i].transactionHash);
                    createdb(resp[i].transactionHash,resp[i].returnValues[0],resp[i].returnValues[1],resp[i].returnValues[2],resp[i].returnValues[3]);
                }
            }
            fs.writeFile(path.resolve(__dirname, './ProductBlock.json'), JSON.stringify(blockData), (err) => {
                if (err);
                console.log(err);
            });
        })
        .catch((err) => console.error(err));
    });
}

async function createdb(buyAddress , tokenAddress, productIds, amount)
{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("UserRecord");
        
        var myobj = [{buyAddress:buyAddress, tokenAddress:tokenAddress, productIds:productIds, amount:amount}];

            dbo.collection("TransactionDetails").insertMany(myobj, function(err, res) {
                if (err) throw err;
                console.log(myobj)
                console.log("data inserted!",res);
                console.log("data inserted" ,res.insertedCount);
            });
    });
}

cronJ1.start();