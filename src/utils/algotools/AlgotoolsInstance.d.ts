declare class algotools {

    algoToken: string;

    algoServer: string;

    algoPort: number;

    algoClient: any;

    contructor(token: string, server: string, port: string);

    createAccount();

    createNft(myAccount: any, unit: string, name: string, url: string, supply: bigint, decimal: number, manager: string, reserve: string, clawback: string, freeze: string);

    importMnemonic(myAccount: any);

    firstTransaction(myAccount: any, value: number, receive: string, remark: string);

    balanceOf(addr: string);
}