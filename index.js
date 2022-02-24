console.log("Xrpl blockchain basics");
//import xrpl
const xrpl = require('xrpl');

async function main() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    //fund wallet
    const fund_result = await client.fundWallet()
    const test_wallet = fund_result.wallet
    //console.log(fund_result);
    //generate wallet keys
    const test_wallet2 = xrpl.Wallet.generate()
    //console.log(test_wallet2);
    //query the xrp ledger
    const response = await client.request({
        "command":"account_info",
        "account": test_wallet.address,
        "ledger_index":"validated"
    })
    console.log(response)
    //send xrpl
    const wallet = xrpl.Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9")
    //get wallet address: rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH
    console.log(wallet.address)
    //prepare transaction for payment
    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account" : wallet.address,
        "Amount": xrpl.xrpToDrops("22"),
        "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
    })

    const max_ledger = prepared.LastLedgerSequence
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)
    //sign/authorize our prepared transaction
    const signed = wallet.sign(prepared)
    /*
    console.log("SIGN TRANSACTION")
    console.log("Identifying hash", signed.hash)
    console.log("Signed blobb", signed.tx_blob)*/
    client.disconnect()
}

main();