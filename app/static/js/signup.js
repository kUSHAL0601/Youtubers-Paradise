function validatePassword(p)
{
    errors = [];
    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one numeric digit."); 
    }
    if(p.search(/[$_@#]/) <0)
    {
    	errors.push("Your password must contain at least one special character among $,#,@,_");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}
function validateName(nm)
{
	if (/^[a-zA-Z]+$/.test(nm)==true){
		return true;
	}
	else
	{
		alert("Name can Contain only Alphabets");
		return false;
	}
}
function register()
	{
		var pwd=$('#r_pwd').val();
		var cpwd=$('#r_cpwd').val();
		var nm=$('#r_nm').val();
		var uname=$('#r_name').val();
		if(nm=='')
		{
			alert("Name Field Cannot Be Empty");
			return;
		}
		if(uname =='')
		{
			alert("User-Name Field Cannot Be Empty");
			return;
		}
		if(pwd!=cpwd)
		{
			alert("Enter Confirm Password Properly");
			return;
		}
		if(validatePassword(pwd) && validateName(nm))
		{
			$.ajax({
				url:'http://127.0.0.1:8080/register',
				method:'POST',
				data:{name:$('#r_nm').val(),username:$('#r_name').val(),password:$('#r_pwd').val()},
				success:function(response)
				{
					if(response.success==true)
					{
						login1();
					}
					else
					{
						console.log(response.success);
						alert("Invalid credentials");
					}
				},
			});
		}
	}
function f()
{
	window.location="http://127.0.0.1:8080/login"
}
function login1()
{
	$.ajax({
		url:'http://127.0.0.1:8080/login',
		method:'POST',
		data:{username:$('#r_name').val(),password:$('#r_pwd').val()},
		success:function(response)
			{
				if(response.success==true)
				{
					window.location = "http://127.0.0.1:8080/dashboard";
				}
				else
				{
					alert("Invalid Credentials");
				}
			},
			error: function(response)
		{
			alert("Invalid Credentials");
		},
	});
}
function g()
{
window.location="http://127.0.0.1:8080/signup"
}

$("#r_cpwd").keyup(function(event) {
    if (event.keyCode === 13) {
        register();
    }
});
