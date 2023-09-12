function parent() {
  console.log(this);//1
  document.body.style.height = "200px";
  document.body.addEventListener("click",function () {
      console.log(this);//2
      const node = document.createElement("div");
      child.call(node)
  })
}
function child() {
  console.log(this);//3
}
parent();