const cacheRes = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    console.log(hit)
    return hit || (cache[str] = fn(str));
  }
}
const fn = cacheRes((str) => `${str}123`);
fn(123);
fn(123);//上一次的结果就会被缓存
fn(345);//从新设置缓存