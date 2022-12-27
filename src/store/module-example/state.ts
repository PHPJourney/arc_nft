export interface accountInfoInterface {
  sk: any;
  addr: string;
  Amount: number;
}
export interface ExampleStateInterface {
  prop: boolean;
  accountInfo: accountInfoInterface;
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    accountInfo: {
      sk: '',
      addr: '',
      Amount: 0
    }
  }
}

export default state;
