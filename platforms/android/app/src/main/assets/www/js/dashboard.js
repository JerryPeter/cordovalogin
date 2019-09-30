$(document).ready(function(){
    // accountInfo.createDatabase();
    var storage = window.localStorage;
    var photo = "https://ces.ciputragroup.com/webapps/Ciputra/public/app/hrd/uploads/personal/foto/" + storage.getItem("photo"); 


    $("#sidebar").load("template/sidebar.html");
    $("#page-header").load("template/header.html");
    $("#page-footer").load("template/footer.html");

    // Load data kedalam layout
    $("#employee_name").text(storage.getItem("employee_name"));
    $("#employee_nik").text(storage.getItem("employee_nik"));
    $("#employee_name_hader").text(storage.getItem("employee_nik"));
    $("#pic_profile").attr("src", photo);    
  });
  