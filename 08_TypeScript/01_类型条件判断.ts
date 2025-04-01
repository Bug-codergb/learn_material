interface IUser{
  name:string;
  age:number
}
interface ISchool{
  address:string
}
let user:IUser={
  name:"foo",
  age:12
}
let school:ISchool={
  address:"哈尔滨"
}
function getName(obj:IUser|ISchool,flag:boolean){
  return obj[flag ? 'name':'address']
}
getName(user,true);