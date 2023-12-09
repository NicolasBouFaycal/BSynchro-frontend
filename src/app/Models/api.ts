export interface UserInfo {
    name: string
    surname: string
    balance: number
    transactions: Transaction[]
  }
  
  export interface Transaction {
    accountID: number
    amount: number
    timestamp: string
  }
  