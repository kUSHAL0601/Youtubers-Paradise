function login()
{
	$.ajax({
		url:'http://127.0.0.1:8080/login',
		method:'POST',
		data:{username:$('#l_name').val(),password:$('#l_pwd').val()},
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

$("#l_pwd").keyup(function(event) {
    if (event.keyCode === 13) {
        login();
    }
});
