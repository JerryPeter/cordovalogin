var accountInfo = {
    db : null,
    createDatabase : function() {
        this.db = window.openDatabase(
            "account.db",
            "1.0",
            "Account Information Database",
            2 * 1024 * 1024
        );
        this.db.transaction(
            function(tx) {
                // Run Statement disini
                tx.executeSql(
                    "create table if not exists account (name text, value text)",
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
                console.log("Create Account Database Completed !!");
            }
        );
    }
}

var accountHandler = {
    addInfo : function (name, value) {
        accountInfo.db.transaction (
            function(tx) {
                // Run Statement disini
                tx.executeSql(
                    "insert into account (name, value) values (?, ?)",
                    [name, value],
                    function (tx, results){
                        console.log("Sukses Add : " + name + " - " + value)
                    },
                    function (tx, error) {
                        console.log("Add Info Error : " + error.message)
                    }
                );
            },
            function (error) {
                console.log("Transaction Error : " + error.message);
            },
            function(){
                console.log("Add Info Completed !!");
            }
        );
    },
    loadInfo : function(callback){
        databaseHandler.db.readTransaction(
            function(tx) {
                // Run Statement disini
                tx.executeSql(
                    "select * from product",
                    [],
                    function (tx, results){
                        callback(results);
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