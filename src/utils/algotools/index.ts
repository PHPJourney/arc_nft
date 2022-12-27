import algosdk from 'algosdk';

class algotools {

    private algoToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // 64 bit a by sandbox
    private algoServer = 'http://localhost';
    private algoPort = 4001;
    private algoClient:any;

    constructor(token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', server = 'http://localhost', port = 4001) {
        this.algoToken = token;
        this.algoServer = server;
        this.algoPort = port;
        this.algoClient = new algosdk.Algodv2(this.algoToken, this.algoServer, this.algoPort);
    }

    createAccount() {
        try {
            const myAccount = algosdk.generateAccount();
            return myAccount;
        }
        catch (err) {
            console.log('err', err);
            throw err;
        }
    }

    async status() {
        try {
            return await this.algoClient.status().do();
        } catch (err) {
            console.log('err', err);
            throw err;
        }
    }

    exportMnemonic(myAccount:any) {
        try {
            let account_mnemonic = algosdk.secretKeyToMnemonic(myAccount.sk);
            return account_mnemonic;
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async transfer(myAccount:any, value: number, receive = 'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA', remark = 'Hello World') {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee =algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;
            const enc = new TextEncoder();
            const note = enc.encode(remark);
            let amount = Math.pow(10 * value, 6);
            let sender = myAccount.addr;
            let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: receive,
                amount,
                note,
                suggestedParams: params
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            console.log('Transaction %s confirmed in round %s', txId, confirmedTxn['confirmed-round']);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            console.log('Note field:', string);
            const accountInfo = await this.balanceOf(myAccount.addr);
            console.log('Transaction Amount: %d microAlgos', confirmedTxn.txn.txn.amt);
            console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
            console.log("Account balance: %d microAlgos", accountInfo.amount);
            return [accountInfo, confirmedTxn, string];
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async createNft(myAccount: any, unit: string, name: string, url: string, metadata: string, supply: bigint, decimal: number, manager: string, reserve: string, clawback: string, freeze: string) {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;
            const creator = myAccount.addr;
            const defaultFrozen = false;
            const unitName = unit;
            const assetName = name;
            // const url = 'https://4020.io/my/nft/asset/metadata.json';
            const managerAddr = manager; // reconfig and destory Address able to change mutable asset data
            const reserveAddr = reserve; // Address where non-minted assets will reside
            const freezeAddr = freeze; // Address able un/freeze the asset
            const clawbackAddr = clawback; // Address able to remove asset from account
            const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from: creator,
                total: Number(supply),
                decimals: Number(decimal),
                assetName,
                unitName,
                assetURL: url,
                assetMetadataHash: metadata,
                defaultFrozen,
                freeze: freezeAddr,
                manager: managerAddr,
                clawback: clawbackAddr,
                reserve: reserveAddr,
                suggestedParams: params
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            const accountInfo = await this.balanceOf(myAccount.addr);
            return [accountInfo, confirmedTxn, string];
        } catch (err) {
            console.log('err', err);
            throw err;
        }
    }

    async updateNft(myAccount: any, assetIndex: number, clawback: string, manager: string, remark: string, rekeyTo: string, reserve: string, freeze: string) {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;

            const enc = new TextEncoder();
            const note = enc.encode(remark);
            const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
                from: myAccount.addr,
                note,
                assetIndex,
                manager,
                reserve,
                freeze,
                clawback,
                rekeyTo,
                suggestedParams: params,
                strictEmptyAddressChecking: false,
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            console.log('callback', confirmedTxn);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            return [confirmedTxn, string];
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async freezeNft(myAccount: any, assetIndex: number, state: boolean, target: string, remark: string, rekeyTo: string) {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;

            const enc = new TextEncoder();
            const note = enc.encode(remark);
            const txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
                from: myAccount.addr,
                note,
                assetIndex,
                freezeState: state,
                freezeTarget: target,
                rekeyTo,
                suggestedParams: params
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            console.log('callback', confirmedTxn);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            return [confirmedTxn, string];
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async destoryNft(myAccount: any, assetIndex: number, remark: string, rekeyTo: string) {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;

            const enc = new TextEncoder();
            const note = enc.encode(remark);
            const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
                from: myAccount.addr,
                note,
                assetIndex,
                rekeyTo,
                suggestedParams: params
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            console.log('callback', confirmedTxn);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            return [confirmedTxn, string];
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async transferNft(myAccount: any, assetIndex: number, to: string, amount: bigint,remainder: string, target: string, remark: string, rekeyTo: string) {
        try {
            let params = await this.algoClient.getTransactionParams().do();
            params.fee = algosdk.ALGORAND_MIN_TX_FEE;
            params.flagFee = true;

            const enc = new TextEncoder();
            const note = enc.encode(remark);
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: myAccount.addr,
                to,
                amount: Number(amount),
                closeRemainderTo: remainder,
                revocationTarget: target,
                note,
                assetIndex,
                rekeyTo,
                suggestedParams: params
            });
            let signedTxn = txn.signTxn(myAccount.sk);
            let txId = txn.txID().toString();
            await this.algoClient.sendRawTransaction(signedTxn).do();
            let confirmedTxn = await algosdk.waitForConfirmation(this.algoClient, txId, 4);
            console.log('callback', confirmedTxn);
            let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
            return [confirmedTxn, string];
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

    async balanceOf(addr:string) {
        try {
            let accountInfo = await this.algoClient.accountInformation(addr).do();
            return accountInfo;
        }
        catch(err) {
            console.log('err', err);
            throw err;
        }
    }

}

export default algotools;