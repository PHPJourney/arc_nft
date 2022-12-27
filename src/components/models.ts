export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface accountInfo {
  sk: Uint8Array;
  addr: string;
  Amount: number;
}

export interface Asset {
  id: number;
  unitName: string;
  name: string;
  amount: number;
  creator: string;
  total: number;
  decimal: number;
  frozen: Boolean;
  reserve: string;
  manager: string;
  clawback: string;
  freeze: string;
  metaurl: string;
}