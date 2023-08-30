const arr = [2, 3, 1, 4, 23];
arr.forEach((item, index) => {
  if (index === 2) {
    throw new Error("error")
    return;
  }
  console.log(item)
})