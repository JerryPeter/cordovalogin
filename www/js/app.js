$( document ).ready(function() {
    $("#cmdLogin").on("click",function(e) {

        var _username = $("#username").val();
        var _password = $("#password").val();      
        var _key = "INTRANET";  
        var _url = "http://api.ciputragroup.com/restserver/dbwebsec/auth";

        Codebase.loader('show', 'bg-gd-dusk');
        setTimeout(3000);
        

        $.ajax({
        type: 'GET',
        //url: "https://api.ciputragroup.com/dbwebsec/login.php",
        url: _url,
        data: { username : _username, password : _password, CIPDEV_KEY :_key},
        dataType: "json",
        success: function(data) { 
            Codebase.loader('hide');
            console.log(data);
            if (data.code == 1) {
                alert ("Return data : " + data.user[0]["name"]); 
                alert ("Return data : " + data.employee[0]["employee_name"]);           

                $(location).attr('href', 'dashboard.html');       					    
            } else {
                
                alert ("Login Failed : [ " + data.message + " ]");       					    
            }
        }
        });              
      });     
});