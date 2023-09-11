for (var i = 0; i < 5; ++i){
  (function (index){
    setTimeout(() => {
      console.log(index);
    },1500)
  })(i)
}