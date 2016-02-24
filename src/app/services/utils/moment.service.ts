
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




  // class CacheStoreUtilService implements ICacheStoreUtilService {
  //   public static $inject = [
  //     'localStorageService'
  //   ];

  //   public storage: any = {};

  //   public cookie: ICacheStoreUtilCookieService;
  //   public localStorage: ICacheStoreUtilLocalStorageService;

  //   constructor(private localStorageService: angular.local.storage.ILocalStorageService) {
  //     this.cookie = new CacheStoreUtilCookieService(this.localStorageService);
  //     this.localStorage = new CacheStoreUtilLocalStorageService(this.localStorageService);
  //   }

  //   public has(key: string): boolean {
  //     return !!this.get(key);
  //   }

  //   public get(key: string): any {
  //     return this.storage[key];
  //   }

  //   public set(key: string, value: any): void {
  //     this.storage[key] = value;
  //   }

  //   public clear(key: string): void {
  //     delete this.storage[key];
  //   }

  // }

  // class CacheStoreUtilCookieService implements ICacheStoreUtilCookieService {
  //   constructor(private localStorageService: angular.local.storage.ILocalStorageService) {
  //   }

  //   public has(key: string): boolean {
  //     return !!this.get(key);
  //   }

  //   public get(key: string): any {
  //     return this.localStorageService.cookie.get(key);
  //   }

  //   public set(key: string, value: any): void {
  //     this.localStorageService.cookie.set(key, value);
  //   }

  //   public clear(key: string): void {
  //     this.localStorageService.cookie.remove(key);
  //   }

  //   public clearAll(): void {
  //     this.localStorageService.cookie.clearAll();
  //   }

  // }

  // class CacheStoreUtilLocalStorageService implements ICacheStoreUtilLocalStorageService {
  //   constructor(private localStorageService: angular.local.storage.ILocalStorageService) {
  //   }

  //   public has(key: string): boolean {
  //     return !!this.get(key);
  //   }

  //   public get(key: string): any {
  //     return this.localStorageService.get(key);
  //   }

  //   public set(key: string, value: any): void {
  //     this.localStorageService.set(key, value);
  //   }

  //   public clear(key: string): void {
  //     this.localStorageService.remove(key);
  //   }
  // }

    // export interface ICacheStoreUtilService {
  //   cookie: ICacheStoreUtilCookieService;
  //   localStorage: ICacheStoreUtilLocalStorageService;

  //   has(key: string): boolean;
  //   get(key: string): any;
  //   set(key: string, value: any): void;
  //   clear(key: string): void;
  // }

  // export interface ICacheStoreUtilCookieService {
  //   get(key: string): any;
  //   set(key: string, value: any): void;
  //   clear(key: string): void;
  //   clearAll(): void;
  // }

  // export interface ICacheStoreUtilLocalStorageService {
  //   has(key: string): boolean;
  //   get(key: string): any;
  //   set(key: string, value: any): void;
  //   clear(key: string): void;
  // }

