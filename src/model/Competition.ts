export class Competition {
  constructor(
    private id: string,
    private name: string,
    private date: string,
    private isFinished: boolean
  ) {}

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getDate = () => {
    return this.date;
  };

  public getIsFinished = () => {
    return this.isFinished;
  };
}
