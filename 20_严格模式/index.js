"use strict"
let obj={};
Object.defineProperty(obj,"name",{
  configurable:false,
  writable:true,
  enumerable:true,
  value:"gb"
})
delete obj.name;
