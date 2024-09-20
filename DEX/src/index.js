const express  = require("express");

const app = express();

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000;

app.use(express.json());

app.post("/buy-asset", (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthquantity = ETH_BALANCE - quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthquantity;
    const paidamount = updatedUsdcBalance - USDC_BALANCE;
    
    ETH_BALANCE = updatedEthquantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You paid ${paidamount} for ${quantity} ETH`
    })
})

app.post("/sell-asset", (req, res) => {
    const quantity =  req.body.quantity;
    const updatedEthquantity = ETH_BALANCE + quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthquantity;
    const gottenamount = USDC_BALANCE - updatedUsdcBalance;

    ETH_BALANCE = updatedEthquantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You got ${gottenamount} for ${quantity} ETH`
    })
})

app.listen(3000)