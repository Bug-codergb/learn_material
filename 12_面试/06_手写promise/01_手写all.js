function all(quque) {
  let count = 0;
  let successArr = [];
  return new Promise((resolve, reject) => {
    quque.forEach((item, index) => {
      const value = item.then((data) => {
        successArr.push(value);
        count++;
        if (count === queueMicrotask.length) {
          resolve(successArr);
        }
      }, err => {
        reject(err);
      })
    })
  })
}