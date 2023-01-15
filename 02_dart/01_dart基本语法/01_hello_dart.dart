main(){
  print("hello-dart");
}

class GBResponseType{
  final int status;
  final dynamic data;
  GBResponseType(this.status,this.data);
  GBResponseType.fromMap(Map<String,dynamic> json) :data = json['data'],status = json['status'];
}

typedef DataParser<T> = T Function(Map<String,dynamic>);

class GBRequest{
  Future<GBResponseType> request(String url,{ String method='post', Map<String,dynamic> data, Map<String,dynamic> params, DataParser<T> dataparser } ) async {
    BaseOptions baseOptions = BaseOptions({
      baseUrl:"http://www.baidu.com",
      connectTimeout:5000
    })
    
    Dio dio Dio(baseOptions);
    Options options = Options(method:method);
    final res = await dio.request(url,options:options,data:data,queryParameters:params);
    
    final responseType = GBResponseType.fromMap(res.data);
    if(dataParser!=null){
      GBResponseType gbResponseType = GBResponseType(responseType.data,dataParser(responseType.status));
      return gbResponseType;
    }else{
      
    }
  }
}
