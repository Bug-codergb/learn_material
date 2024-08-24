export interface IConfig{
  url:string;
  method?:"get"|"post"|"delete"|"put",
  params?:Record<string, any>,
  headers?:Record<string, any>
}
function request(config:IConfig){
  const {
    url,
    method="post",
    params,
    headers={
      "Content-Type": "application/json;charset=UTF-8",
    }
  } = config;
  const isGet = method === "get";
  let paramsStr="";
  if(method === "get"){
    const p = new URLSearchParams();
    for(const key in params){
      p.append(key,params[key]);
    }
    paramsStr =`?${p.toString()}`;
  }

  console.log(`${url}${paramsStr}`)
  
}
request({
  url: "/api",
  method: "get",
  params: {
    userId: "11o",
    userName:"guobin"
  }
})
export {
  request
}