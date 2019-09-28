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
                
                //---- Simpan data ke local DB 
                var db = openDatabase('userInfo', '1.0', 'Database User Information', 2 * 1024 * 1024);  

                db.transaction(function (tx) {   
                    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)'); 
                    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")'); 
                    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")'); 
                });

                db.transaction(function (tx) { 
                    tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) { 
                       var len = results.rows.length, i; 
                       msg = "<p>Found rows: " + len + "</p>"; 
                       // document.querySelector('#status').innerHTML +=  msg; 
                   
                       for (i = 0; i < len; i++) { 
                          alert(results.rows.item(i).log ); 
                       } 
                   
                    }, null); 
                 });    
                 // -- END SIMPAN KEDALAM DATABASE            

                $(location).attr('href', 'dashboard.html');       					    
            } else {
                
                alert ("Login Failed : [ " + data.message + " ]");       					    
            }
        }
        });              
      });     
});