export interface IErrorOfMachine {
  code: string,
  errorText: string,
}

export interface IErrorList {
  listOfErrors: Array<IErrorOfMachine>
}
