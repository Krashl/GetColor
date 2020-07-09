let flag = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
      if (request.greeting == "hello"){
        flag = true;
        response({info: "ok"});
    } else {
        response({info: flag});
        flag = false;
    }
    response({info: true});
    });