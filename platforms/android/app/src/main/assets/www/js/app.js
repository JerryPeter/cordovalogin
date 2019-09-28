$( document ).ready(function() {
    // -- TESTING DATABASE ---
    var db = null;

    window.sqlitePlugin.echoTest(function() {
        console.log('ECHO test OK');
    });

    window.sqlitePlugin.selfTest(function() {
        console.log('SELF test OK');
    });    

    db = (window.cordova.platformId === 'browser') ?
        window.openDatabase('MyDatabase', '1.0', 'Data', 2*1024*1024) :
        window.sqlitePlugin.openDatabase({name: 'MyDatabase.db', location: 'default'});

    db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
    });

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
      }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
      }, function() {
        console.log('Populated database OK');
    });    

    var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
    myDB.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS codesundar (id integer primary key, title text, desc text)', [],
        function(tx, result) {
            alert("Table created successfully");
        },
        function(error) {
            alert("Error occurred while creating the table.");
        });
    });

    var title="sundaravel";
    var desc="phonegap freelancer";

    myDB.transaction(function(transaction) {
    var executeQuery = "INSERT INTO codesundar (title, desc) VALUES (?,?)";
    transaction.executeSql(executeQuery, [title,desc]
        , function(tx, result) {
        alert('Inserted');
    },
        function(error){
            alert('Error occurred');
        });
    });

    myDB.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM codesundar', [], function (tx, results) {
        var len = results.rows.length, i;
        $("#rowCount").append(len);
        for (i = 0; i < len; i++){
            $("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>");
        }
        }, null);
    }); 

    var id=1;
    var title="jerry.peter";
    var desc="diganti datanya";
    myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE codesundar SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
        //On Success
        function(tx, result) {alert('Updated successfully');},
        //On Error
        function(error){alert('Something went Wrong');});
    });    
    
    
    //-- END TESTING DATABASE

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