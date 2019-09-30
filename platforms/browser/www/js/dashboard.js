$(document).ready(function(){
    // accountInfo.createDatabase();
    var storage = window.localStorage;
    var timthumb = "https://ces.ciputragroup.com/webapps/Ciputra/public/app/hrd/library/timthumb/timthumb.php?src=";
    var src = "https://ces.ciputragroup.com/webapps/Ciputra/public/app/hrd/uploads/personal/foto/" + storage.getItem("photo"); 
    var photo = timthumb + src + "&h=150&w=150&zc=1";
    console.log(photo);

    $("#sidebar").load("template/sidebar.html");
    $("#page-header").load("template/header.html");
    $("#page-footer").load("template/footer.html");

    // Load data kedalam layout
    $("#employee_name").text(storage.getItem("employee_name"));
    $("#employee_nik").text("NIK : " + storage.getItem("employee_nik"));
    $("#employee_name_hader").text(storage.getItem("employee_name"));
    $("#pic_profile").attr("src", photo);    
    $("#pp").attr("src", photo);  
  });
  