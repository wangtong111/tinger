function sendRequest(data,cb){

    var xhr = cc.loader.getXMLHttpRequest();
    // xhr.open("POST", "http://192.168.1.102:8000",true);
    xhr.open("POST", "http://47.95.243.203:8000",true);
    // xhr.open("GET","http://192.168.1.123:8000/",true);
    // xhr.open("POST", "http://httpbin.org/post",true);
    // set Content-type "text/plain;charset=UTF-8" to post plain text
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        cc.log(xhr.readyState);
        cc.log(xhr.status);
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;
            cc.log("title:" + httpStatus + ", response:\n" + response);
            if(response != null && response != "{}") {
                cc.log("有数据");

                var cbdata = JSON.parse(response);
                cb(cbdata);
                return;
            }

            cb();
        }
    };

    // var data = {name: "tingting" ,sex : "meal",id:"20117091500",password :"123456"};
    cc.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data));
}