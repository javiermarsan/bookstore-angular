export interface ApiError {
  key?: string;
  message: string;
}

export class ApiErrors {
  private _errors: ApiError[] = [];

  get errors(): ApiError[] {
    return this._errors;
  }

  get count(): number {
    return this._errors.length;
  }

  
  static is(value: ApiErrors | any): value is ApiErrors {
    return value instanceof ApiErrors;
  }

  static parse(error: any): ApiErrors {
    if (ApiErrors.is(error)) { 
      return error as ApiErrors; 
    }

    const errors: ApiErrors = new ApiErrors();

    function formatError(value: any): string {
      if (value && value.message) {
        value = value.message;
      }
      return String(value);
    }

    if (error && error.error_description) {
      // auth token error
      // errors.add({ message: 'Username or password incorrect' });
      errors.add({ message: error.error_description });
    }
    else if (error && error.validationErrors && Array.isArray(error.validationErrors)) {
      // { validationErrors: [{property, message}, ...]}
      error.validationErrors.forEach(function(err) {
          const key = err.property;
          const message = err.message;
          errors.add({ key: key, message: message });
      });
    }
    else if (Array.isArray(error)) {
      // array strings
      error.forEach(function (err) {
        const message = this.formatError(err);
        errors.add({ message: message });
      });
    }
    else {
      // string
      const message = formatError(error);
      errors.add({ message: message });
    }

    return errors;
  }

  constructor() { }

  add(error: ApiError) {
    this._errors.push(error);
  }

  clear() {
    this._errors.length = 0;
  }

  iterate(callbackfn: (value: ApiError, index: number, array: ApiError[]) => void, thisArg?: any): void {
    this._errors.forEach(callbackfn, thisArg);
  }
}
