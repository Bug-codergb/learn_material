var data = [];

for (var i = 0; i < 3; i++){//这里的i从头到尾只有一个所以function执行的时候是最后的i的值3
  data[i] = function (){
  console.log(i);
  };
}
data[0]();//3
data[1]();//3
data[2]();//3

