
export class Moment {

  constructor() {
    ;
  }

  public set(key: string): (data: any) => void {
    return (data: any) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
  }

  public has(key: string): any {
    return this.get(key) !== undefined;
  }

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

}

export var momentService = new Moment();
