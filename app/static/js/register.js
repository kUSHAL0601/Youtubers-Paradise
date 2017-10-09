function register()
	{
		var pwd=$('#r_pwd').val();
		var cpwd=$('#r_cpwd').val();
		if(pwd!=cpwd)
		{
			alert("Enter Confirm Password Properly");
		}
		else
		{
			$.ajax({
				url:'http://127.0.0.1:8080/register',
				method:'POST',
				data:{name:$('#r_nm').val(),username:$('#r_name').val(),password:$('#r_pwd').val()},
				success:function(response)
				{
					if(response.success==true)
					{
						window.location = "http://127.0.0.1:8080/dashboard";
					}
					else
					{
						alert("Invalid credentials");
					}
				},
				error:function(response)
				{
					alert("Error");
				},
			});
		}
	}
function f()
{
	window.location="http://127.0.0.1:8080/login"
}
