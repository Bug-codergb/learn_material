main(){
  var names=["李银河","王小波"];
  var gender={"男","女"};
  var access={
    "id":"1001",
    "name":"coder",
    "sex":"male"
  };
  names.add("妮妮");
  gender.add("male");
  print(names.length);
  print(gender.length);
  print(access.length);
  print(names[0]);
  print(access.values);
  print(access.keys);
  print(access.hashCode);
  print(access.cast());
  print(access.containsKey("id"));
  print(access.entries);
  print("--------------------------------------");
  List<String> person=["hehe","哈哈","哈哈","new"];
  List<String> newPerson=Set<String>.from(person).toList();
  print(newPerson);
}