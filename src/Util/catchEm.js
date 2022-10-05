// Clean try catch for async await functions
export function catchEm(promise) {
    return promise.then(data => [null, data])
      .catch(err => [err]);
  }