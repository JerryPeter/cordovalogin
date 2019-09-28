$( document ).ready(function() {
    // -- TESTING DATABASE ---
    var databaseHandler = {
        db : null,
        createDatabase : function() {
            this.db = window.openDatabase(
                "product.db",
                "1.0",
                "Product Database",
                2 * 1024 * 1024
            );
            this.db.transaction(
                function(tx) {
                    // Run Statement disini
                    tx.executeSql(
                        "create table if not exists product (_id integer primary key, name text, quantity integer)",
                        [],
                        function (tx, results){},
                        function (tx, error) {
                            console.log("Error when create table : " + error.message)
                        }
                    );
                },
                function (error) {
                    console.log("Transaction Error : " + error.message);
                },
                function(){
                    console.log("Create Database Completed !!");
                }
            );
        }
    }

    var productHandler = {
        addProduct : function (name, quantity) {
            databaseHandler.db.transaction (
                function(tx) {
                    // Run Statement disini
                    tx.executeSql(
                        "insert into product (name, quantity) values (?, ?)",
                        [name, quantity],
                        function (tx, results){},
                        function (tx, error) {
                            console.log("Add Product Error : " + error.message)
                        }
                    );
                },
                function (error) {
                    console.log("Transaction Error : " + error.message);
                },
                function(){
                    console.log("Add Product Completed !!");
                }
            );
        },
        loadProduct : function(displayProducts){
            databaseHandler.db.readTransaction(
                function(tx) {
                    // Run Statement disini
                    tx.executeSql(
                        "select * from product",
                        [],
                        function (tx, results){
                            displayProducts(results);
                        },
                        function (tx, error) {
                            console.log("Select Error : " + error.message)
                        }
                    );
                },
                function (error) {
                    console.log("Transaction Error : " + error.message);
                },
                function(){
                    console.log("Add Product Completed !!");
                }
            );
        }
    }



    databaseHandler.createDatabase();

    function addProduct() {
        var name = "Hello";
        var quantity = 2;

        productHandler.addProduct(name, quantity);
    }

    function displayProducts(results){
        var length = results.rows.length;
        console.log (results);
    }

    //-- END TESTING DATABASE
    $("#cmdAdd").on("click",function(e) {
      addProduct();        
    });

    $("#cmdShow").on("click",function(e) {
        productHandler.loadProduct(displayProducts);
    });    

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