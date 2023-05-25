const express = require('express');
const cors =  require('cors'); 
const CoinMarketCap = require('coinmarketcap-api')
const {ethers} = require("ethers")
const {axios} = require("axios")
const { Alchemy, Network } = require("alchemy-sdk");


const app = express()
app.use(cors())
app.use(express.json())
const config = {
    apiKey: "", // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network

}
const alchemy = new Alchemy(config);

async function priceFeed(){
    const coinApi = '*******-***-***-****-*****'//Replace with yur api
    const client = new CoinMarketCap(coinApi)
    const eth = await client.getQuotes({id:'1027', convert:"NGN"})
    const price = eth['data']['1027']['quote']['NGN']['price']
    return price;
}   
app.get("/ethPrice",(req,res)=>{
    async function getPrice(){
        const price = await priceFeed()
        res.send({ price })
        console.log(price.toString())
    }
    getPrice()
});

app.get('/block/:TxHash', (req,res)=>{
    async function getTxbyHash(){
        const { TxHash } = req.params;
        const TxbyHash = await alchemy.transact.getTransaction(TxHash)
        const gasPrice = TxbyHash.gasPrice.toString()
        const value = TxbyHash.value.toString()
        res.send({TxbyHash:TxbyHash, gasPrice:gasPrice,value:value})    
    }getTxbyHash()
})

const port = 8000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!.`)
})
