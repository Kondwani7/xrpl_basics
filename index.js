console.log("Xrpl blockchain basics");
//import xrpl
const xrpl = require('xrpl');

async function main() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    //fund wallet
    const fund_result = await client.fundWallet()
    const test_wallet = fund_result.wallet
    console.log(fund_result);
    //generate wallet keys
    const test_wallet2 = xrpl.Wallet.generate()
    console.log(test_wallet2);
    //query the xrp ledger
    const response = await client.request({
        "command":"account_info",
        "account": test_wallet.address,
        "ledger_index":"validated"
    })
    console.log(response)
    //listen to events
   // Listen to ledger close events

    client.disconnect()
}

main();