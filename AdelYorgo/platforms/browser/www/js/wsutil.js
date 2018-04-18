var servicePath = "http://localhost:1999/Service.svc/";

function restfulGetCall(met) {
    var response;

    $$.ajax({
        method: 'GET',
        async: false,
        url: servicePath+met,
        dataType: 'json',
        success: function(data, status, xmlRequest) {
            response = data;
        },
        error: function(request, status, error) {
            response = "NOK";
        }
    });

    return response;
}


function restfulPostCall(met,sendData) {

    var response;

    $$.ajax({
        method: 'POST',
        async: false,
        url: servicePath+met,
        data: JSON.stringify(sendData),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data, status, xmlRequest) {
            //  myApp.hidePreloader();
            response = data;
        },
        error: function(request, status, error) {
            //  myApp.hidePreloader();
            response = "Error";
        }

    });

    return response;
}

function login(parola){
    var met="login/"+encodeURIComponent(parola);
    return restfulGetCall(met);
}