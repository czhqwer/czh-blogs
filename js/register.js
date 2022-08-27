$(function () {
    $('#register_btn').click(function () {
        var phone = $('#register_phone').val();
        var email = $('#register_email').val();
        var userName = $('#register_name').val();
        var nickname = $('#register_nickname').val();
        var password = $('#register_password').val() == $('#register_repassword').val() ? $('#register_password').val() : "";

        //js 正则表达语法:
        //    / /g  : 正则表达式对象

        // ^1  以1开头
        //  \d 数字 0-9 数字中一个
        //  {10}  重复个数   \d{10} 表示10个数字
        // $  以xx结束
        //  [3456789]  代码 3 4 5 6 7 8 9 中一个数

        //   /^1[3456789]\d{9}$/


        // if (/^1\d{10}$/g.test(phone)) {
        if(phone != '') {
            $.get(domainUrl + "/users/checkPhone", {userTelephoneNumber: phone},
                function (data) {
                    console.log(data);
                    if (data) {
                        // $('#inputPassword').next().text('').hide()
                        // $('.login-box').hide()
                        // $('.signup-box').show()
                        // $("#phone").val(val);
                        console.log("12312");
                        regist(phone,email,userName,nickname,password);
                    } else {
                        $('#register_phone').next().text('手机号码已注册.').show()
                    }
                })
        } else {
            // $('#register_phone').next().text('手机号码格式不正确').show()
            popup("手机号码格式不正确");
        }
    });
   function regist(phone,email,userName,nickname,password) {
    console.log("this User:"+ phone+email+userName+nickname+password)
    $("#register_form").ajaxSubmit({
        url: domainUrl + "/users/register",
        type: "POST",
        data: {
            userTelephoneNumber: phone,
            userEmail: email,
            userName: userName,
            userNickname: nickname,
            userPassword: password
        },
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                location.href = "/login.html";
            } else {
                popup(data.msg);
            }
        }
    })
   }
    
});