$.ajax({
    url:'http://127.0.0.1:8080/viewlogin',
    method:'GET',
    data:{},
    success:function(response)
    {
	if(response.success!=true)
	{
	    window.location = "http://127.0.0.1:8080/";
	}
	
    },
    error: function(response)
    {
	window.location = "http://127.0.0.1:8080/";
    },
});
function usernamefill()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    var x=response['user'].username;
	    uname=response['user'].username;
	    x=String(x);
	    var y=x.length;
	    if(y<12)
	    {
		for(i=0;i<=12-y;i++)
		{
		    x+='&nbsp;';
		}
	    }
	    document.getElementById('username_head').innerHTML=x;
	},
	error:function (){
	},
    });

}
usernamefill();


$(document).on('click','#myModal',function(){
    hide2();
});
var r=0,c=0,flag=0,flag1=0,flagx="",uname;
var gallery = [];
$(document).ready(function(){
    var url = $("#cartoonVideo").attr('src');
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });
});

/*function f(url)
  {
  a = document.getElementById("mb");
  for(var i=0; i<(gallery.length); i++)
  {
  if(gallery[i] == url)
  break;
  }
  var x = "";
  var chk = document.getElementById("check").checked;
  if(chk)
  x = loopvid(url);
  var addn = "<table><tr><td><div id=\"nextdiv\"><img src=\"righttingu.png\" id=\"next\" onclick=\"prevcall("+i+")\"></img></div></td><td><iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+url+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3" + x + "\" " + "frameborder=\"0\" allowfullscreen></iframe></td><td style=\"text-align:right\"><div id=\"prevdiv\"><img src=\"lefttingu.png\" id=\"prev\" onclick=\"nextcall("+i+")\"></img></div></td></tr></table>";
  //   //console.log(addn);
  a.innerHTML = addn;
  if(i == 0)
  document.getElementById("nextdiv").innerHTML = "";
  if(i == ((gallery.length)-1))
  document.getElementById("prevdiv").innerHTML = "";
  flag1=0;
  return;
  }
*/
function f(url, response)
{
    a = document.getElementById("mb");
    for(var i=0; i<(gallery.length); i++)
    {
	if(gallery[i] == url)
	    break;
    }
    var x = "";
    if(url!="")
    {
	var chkboxid = url + "check";
	var chk = document.getElementById(chkboxid).checked;
	if(chk)
	    x = loopvid(url);
    }
    if((i == 0) && (i!=((gallery.length)-1)))
    {
	addn = "<table><tr><td><div id=\"nextdiv\"></div></td><td><iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+url+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3" + x + "\" " + "frameborder=\"0\" allowfullscreen></iframe></td><td style=\"text-align:right\"><div id=\"prevdiv\"><img src=\"../static/images/lefttingu.png\" id=\"prev\" onclick=\"nextcall("+i+")\"></img></div></td></tr></table>";
    }
    else if((i == ((gallery.length)-1)) && (i!=0))
    {
	addn = "<table><tr><td><div id=\"nextdiv\"><img src=\"../static/images/righttingu.png\" id=\"next\" onclick=\"prevcall("+i+")\"></img></div></td><td><iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+url+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3" + x + "\" " + "frameborder=\"0\" allowfullscreen></iframe></td><td style=\"text-align:right\"><div id=\"prevdiv\"></div></td></tr></table>";
    }
    else if (((i == ((gallery.length)-1)) && (i==0))||(url==""))
    {
	addn = "<table><tr><td><div id=\"nextdiv\"></div></td><td><iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+url+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3" + x + "\" " + "frameborder=\"0\" allowfullscreen></iframe></td><td style=\"text-align:right\"><div id=\"prevdiv\"></div></td></tr></table>";
    }
    else
    {
	addn = "<table><tr><td><div id=\"nextdiv\"><img src=\"../static/images/righttingu.png\" id=\"next\" onclick=\"prevcall("+i+")\"></img></div></td><td><iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+url+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3" + x + "\" " + "frameborder=\"0\" allowfullscreen></iframe></td><td style=\"text-align:right\"><div id=\"prevdiv\"><img src=\"../static/images/lefttingu.png\" id=\"prev\" onclick=\"nextcall("+i+")\"></img></div></td></tr></table>";
    }
    if(response!='')
    {
	////console.log("Consider this: ",response);
	response['name'] = response['name'];
	var des="<div style=\"color:black; background-color:#cccccc; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:30px;\"><p><table style=\"width:100%;\><tr><td style=\"width:50%;\"><a class=\"cp\" href=\"" + response['profile'] + "\"><img style=\"padding-right:15px;\" src=\"" + response['profile_img'] + "\"></img>" + response['name'] + "</a></td><td style=\"text-align:right; width:50%;\">" + response['date'] + "</td></tr></table></p><div style=\"text-align:center;\"><button onclick=\"showm();\" id=\"more\">VIEW DESCRIPTION</button></div><br/><div id = \"descr\" style=\"overflow:scroll;height:300px;\"><p style=\"class:bro;\">" + response['desc'] + "</p></div><div style=\"text-align:center;\"><button onclick=\"showl();\" id=\"less\">HIDE DESCRIPTION</button></div></div>";
	a.innerHTML = addn + des;
    }
    else
    {
	a.innerHTML = addn;
    }
    flag1=0;
    return;
}

function pl_all()
{
    $.ajax({
	url:'http://127.0.0.1:8080/getPlaylist',
	method:'POST',
	data:{name:flagx,username:uname},
	success:function(response)
	{
	    ////console.log(response);
	    f_pl(response);
	},
	error: function(response)
	{
	    console.log("plall");
	    alert('Playlist already exsists')
	},
    });


}

function f_pl(list)
{
    a = document.getElementById("mb");
    //gallery=list;
    ////console.log(list[0]);
    var x = "&playlist=";
    for(var i=1;i<list.length;i++)
    {
    	//////console.log(list[i]);
	x+=list[i];
	if(i!=list.length-1)
	    x+=',';
    }
    ////console.log(x);
    var addn = "<iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"" + "http://www.youtube.com/embed/"+list[0]+"?&autoplay=1&cc_load_policy=1&rel=0&showinfo=0&version=3"+x+"\"" + "frameborder=\"0\"></iframe>";
    //   ////console.log(addn);
    a.innerHTML = addn;
    $('#hding').text(flagx);
    flag1=0;
    return;
}

function prevcall(i)
{
    if(i == 0)
	return;
    else
	webscrop(String(gallery[i-1]));
    flag1=1;
    return;
}

function nextcall(i)
{
    if(i == ((gallery.length)-1))
	return;
    else
	webscrop(String(gallery[i+1]));
    flag1=1;
    return ;
}

function hide()
{
    f('','');
    $('#myModal').innerHTML = '';
    document.getElementById("nextdiv").innerHTML = "";
    document.getElementById("prevdiv").innerHTML = "";
}
function hide2()
{
    //////console.log(flag)
    if(flag==0)
    {
	f('','');
    }
    //////console.log('Hide 2 called');
    flag=0;
    //   document.getElementById('check').checked=false;
}
function splicetitle(title)
{
    title = String(title);
    title = title.slice(7,-18);
    title = title;
    return title;
}
function showm()
{
    $('#less').show();
    $('#descr').show();
    $('#more').hide();
}
function showl()
{
    $('#less').hide();
    $("#descr").hide();
    $('#more').show();
}

function isDuplicate(url)
{
    var i=0,flag = 0;
    for(i=0; i<(gallery.length); i++)
    {
	if(gallery[i] == url)
	    return 1;
    }
    return 0;
}

function loopvid(url)
{
    var newurl = "&playlist="+url+"&loop=1";
    return newurl;
}

function getId(x)
{
    var j,str="";
    if(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?\\?v=))([\w\-]+)(\S+)?$/.test(x))
    {
	for(var i=0;i<x.length;i++)
	{
	    if(x[i]=='='){j=i+1;break;}
	}
	for(var i=j;i<x.length;i++)
	{
	    if(x[i]=='&')
		return str;
	    str+=x[i];
	}
	return str;
    }
    else if(/^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube\.com)(\/(?:(embed|v))?)\/(\S+)?$/.test(x))
    {
	var a = x.search("/v/");
	var b = x.search("/embed/")
	if(a!=-1)
	{
	    
	    for(i=(a+3);i<x.length;i++)
	    {
		if(x[i]=='?')
		    return str;
		str += x[i];
	    }
	    return str;
	}
	else if(b!=-1)
	{
	    for(i=(b+7);i<x.length;i++)
	    {
		if(x[i]=='?')
		    return str;
		str += x[i];
		
	    }
	    return str;
	}
	else
	    return false;
    }
    else if(/^((?:https?:)?\/\/)?(youtu\.be)\/(\S+)?$/.test(x))
    {
	var a = x.search(".be/");
	if(a!=-1)
	{
	    for(i=(a+4);i<x.length;i++)
	    {
		if(x[i]=='?')
		    return str;
		str += x[i];
		
	    }
	    return str;
	}
	else
	    return false;
    }
    else
	return false;
}


/*function h() 
  {
  
  $.ajax({
  url:'http://127.0.0.1:8080/viewlogin',
  method:'GET',
  data:{},
  success:function(response)
  {
  //console.log(response);
  ////console.log(response.user['name']);
  //console.log(response.user['username']);
  ////console.log(x); 
  var x=$('#add_us_url').val();
  var str="";
  op = getId(x);
  str=op;
  //console.log(str);
  if(getId(x))
  {
  if (document.getElementById('chk_nm').checked)
  {
  addVideo($('#cstm_nm').val(),response.user['username'],str);
  }
  else
  {
  addVideo(Custom_name,response.user['username'],str);
  }
  }
  },
  error: function(response)
  {
  window.location = "http://127.0.0.1:8080/";
  },
  });
  };*/

function h() 
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{ 
	    var x=$('#add_us_url').val();
    	    var str="";
    	    op = getId(x);
    	    str=op;
	    usr_name = response.user['username'];
    	    if(getId(x))
    	    {	
		$.ajax({
		    url:'http://127.0.0.1:8080/getdetails',
		    method:'POST',
		    data:{
			url:x
		    },
		    success:function(resp)
		    {
			//console.log(resp);
			if (document.getElementById('chk_nm').checked)
    			{
			    var nm = $('#cstm_nm').val();
			    //console.log("RIGHT");
			    resp['title'] = nm;
    			    addVideo(resp,response.user['username'],str);
			    //names.push(nm);
    			}
    			else
    			{
			    //console.log("WRONG");
			    //console.log(resp['title']);
			    resp['title'] = splicetitle(resp['title']);
    			    addVideo(resp,response.user['username'],str);
    			}
		    },
		    error:function(response)
		    {
			//console.log("Nope");
		    },
		});
		
    	    }
	    else
	    {
		window.alert("Error: Please enter a valid YouTube URL.");
	    }
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });
};


function h1(name) 
{
    ////console.log(name);
    
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    h2(name,response.user['username']);
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });
};

function h2(name,username)
{
    $('#play_all').hide();
    ////console.log(name+'x'+username)
    $.ajax({
	url:'http://127.0.0.1:8080/getPlaylist',
	method:'POST',
	data:{name:name,username:username},
	success:function(response)
	{

	    flagx=name;gallery=[];
	    document.getElementById('myTable').innerHTML='';
	    r=0;c=0;
	    //console.log(response);
	    $('#pl_hd').text(name);
	    $('#pl_hd').show();
	    if(response[0]!="")
	    {
		for(i=0;i<response.length;i++)
		{
		    //gallery=[];
		    addImg(response[i]);
		}
		if(response.length>1)
		{
		    $('#play_all').show();
		}
	    }
	},
	error: function(response)
	{
	    console.log("h2");
	    alert('Playlist already exsists')
	},
    });


}

function ar()
{
    ////console.log('ar called');
    if(flag1==0)
    {
	flag=1;
    }
};

function add_playlist()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    add_playlist1($('#pl_nm').val(),response.user['username'])
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });

}
function add_playlist1(name,username)
{
    console.log("Hanan");
    $.ajax({
	url:'http://127.0.0.1:8080/create',
	method:'POST',
	data:{name:name,username:username},
	success:function(response)
	{
	    ////console.log(response);
	    var modal = document.getElementById('myMdal');
    	    modal.style.display = "none";
	    
	    document.getElementById('allPl').innerHTML+="<a  class=\"innerElements3\" id=\""+name+"\" "+"onclick=\"h1(\'"+String(name)+"\')\""+">"+name+"</a>";
	},
	error:function(response)
	{
	    console.log("addpl1");
	    alert('Playlist already exists')
	},
    });
    clearipfield(['pl_nm']);
}

function clearipfield(array)
{
    for(var i=0; i<(array.length); i++)
    {
	var elem = document.getElementById(array[i]);
	elem.value = '';
    }
    return;
}

function rem_playlist()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    rem_playlist1($('#rm_nm').val(),response.user['username'])
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });

}
function rem_playlist1(name,username)
{
    $.ajax({
	url:'http://127.0.0.1:8080/remove',
	method:'POST',
	data:{name:name,username:username},
	success:function(response)
	{
	    //console.log(response);
	    var modal3 = document.getElementById('myMdal3');
	    modal3.style.display = "none";
	    document.getElementById('add_vid').checked=false;
	    document.getElementById('rem_vid').checked=false;
	    document.getElementById('us_nm').checked=false;
	    document.getElementById('us_url').checked=false;
	    add_playlist_ini();
	    if(flagx==name)
	    {
		document.getElementById('myTable').innerHTML='';
		r=0;c=0;
		$('#play_all').hide();
		$('#pl_hd').hide();
	    }

	},
	error:function(response)
	{
	    alert('Playlist doesn\'t exsists')
	},
    });

}

function add_playlist_ini()
{
    document.getElementById('allPl').innerHTML='';
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    add_playlist_ini1(response.user['username'])
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });

}

function add_playlist_ini1(username)
{
    $.ajax({
	url:'http://127.0.0.1:8080/getAllPlaylist',
	method:'POST',
	data:{username:username},
	success:function(response)
	{
	    for(var i=0;i<response.length;i++)
	    {	
		//console.log(response[i]);
		document.getElementById('allPl').innerHTML+="<a  class=\"innerElements3\" id=\""+response[i]+"\" "+"onclick=\"h1(\'"+String(response[i])+"\')\""+">"+response[i]+"</a>";
	    }
	},
	error: function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

}
add_playlist_ini();
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("bd").style.marginLeft = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $('#menu').hide();
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("bd").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    $('#menu').show();
}
function openNav1() {
    document.getElementById("mySidenav3").style.width = "300px";
    document.getElementById("bd").style.marginRight = "200px";
    
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $('#pl').hide();
}

function closeNav1() {
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("bd").style.marginRight = "0";
    document.body.style.backgroundColor = "white";
    $('#pl').show();
}

function addpopup()
{
    //console.log('POPUP OPENED');
}
var modal = document.getElementById('myMdal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("clse")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

var modal1 = document.getElementById('myMdal1');
var btn1 = document.getElementById("myBtn1");
var span1 = document.getElementsByClassName("clse1")[0];
btn1.onclick = function() {
    modal1.style.display = "block";
}
span1.onclick = function() {
    modal1.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
};

var modal3 = document.getElementById('myMdal3');
var btn2 = document.getElementById("myBtn2");
var span3 = document.getElementsByClassName("clse3")[0];
btn2.onclick = function() {
    modal3.style.display = "block";
}
span3.onclick = function() {
    modal3.style.display = "none";
    document.getElementById('add_vid').checked=false;
    document.getElementById('rem_vid').checked=false;
    document.getElementById('us_nm').checked=false;
    document.getElementById('us_url').checked=false;

}
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
};

/*function addVideo(nm,usernm,vidid)
  {
  add_vid_nm1(nm);
  $.ajax({
  url:'http://127.0.0.1:8080/addVideo',
  method:'POST',
  data:{name:nm,username:usernm,video_id:vidid},
  success:function(response)
  {
  //add_vid_nm1(nm);
  },
  error:function(response)
  {
  //console.log(response);
  },
  });
  closeNav();
  var modal = document.getElementById('myMdal');
  modal.style.display="none";

  }*/
function addVideo(response,usernm,vidid)
{
    add_vid2(vidid,$('#add_us_plnm').val(),usernm);
    $.ajax({
	url:'http://127.0.0.1:8080/addVideo',
	method:'POST',
	data:{
	    username:usernm,
	    video_id:vidid,
	    name:response['title'],
	    channelname:response['name'],
	    date:response['date'],
	    desc:response['desc'],
	    profile_img:response['profile_img'],
	    profile:response['profile'],
	},
	success:function(response)
	{
	    //addImg(vidid);
	},
	error:function(response)
	{
	    //console.log(response);
	},
    });
    closeNav();
    var modal = document.getElementById('myMdal');
    modal.style.display="none";

}


function edit()
{
    //console.log("Edit enetered");
    if (document.getElementById('add_vid').checked)
    {
	if (document.getElementById('us_nm').checked)
	{
	    add_vid_nm();
	} 
	else
	{
	    h();
	}
    }
    else if(document.getElementById('rem_vid').checked) 
    {
	rem_vid();
    }
    else
    {
	alert('Please select something');
    }
}

function add_vid_nm1(name)
{
    console.log("Add nm1");

    $.ajax({
	url:'http://127.0.0.1:8080/getid',
	method:'GET',
	data:{name:name},
	success:function(response)
	{
	    //console.log(response.id);
	    add_vid1(response.id);
	},
	error:function(response)
	{
	    //alert('Playlist alrsheady exsists')
	},
    });

    
}



function add_vid_nm()
{
    console.log("Add nm");

    $.ajax({
	url:'http://127.0.0.1:8080/getid',
	method:'GET',
	data:{name:$('#add_us_nm').val()},
	success:function(response)
	{
	    //console.log(response.id);
	    add_vid1(response.id);
	},
	error:function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

    
}

function add_vid1(id)
{
    console.log("Add nm1");

    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    add_vid2(id,$('#add_us_plnm').val(),response.user['username']);
	},
	error: function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

    
}

function add_vid2(id,name,username)
{
    console.log("Add nm2");

    $.ajax({
	url:'http://127.0.0.1:8080/addvideo',
	method:'POST',
	data:{username:username,name:name,video_id:id},
	success:function(response)
	{
	    var modal1 = document.getElementById('myMdal1');
	    modal1.style.display = "none";
	    //console.log(response);
	    //location.reload();
	    if(flagx==name)
	    {
		document.getElementById('myTable').innerHTML='';
		r=0;c=0;
		$('#play_all').hide();
		console.log("addvid2");
		h1(name);
	    }
	    location.reload();
	},
	error: function(response)
	{
	    alert('Video/Playlist doesn\'t exist');
	},
    });
    clearipfield(['add_us_plnm','add_us_url','add_us_nm','cstm_nm']);
}


function rem_vid()
{

    $.ajax({
	url:'http://127.0.0.1:8080/getid',
	method:'GET',
	data:{name:$('#rem_us_nm').val()},
	success:function(response)
	{
	    //console.log(response.id);
	    rem_vid1(response.id);
	},
	error:function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

    
}

function rem_vid1(id)
{

    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    rem_vid2(id,$('#rem_us_plnm').val(),response.user['username']);
	},
	error: function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

    
}

function rem_vid2(id,name,username)
{

    $.ajax({
	url:'http://127.0.0.1:8080/remvideo',
	method:'POST',
	data:{username:username,name:name,video_id:id},
	success:function(response)
	{
	    var modal1 = document.getElementById('myMdal1');
	    modal1.style.display = "none";
	    
	    //console.log(response);
	    if(flagx==name)
	    {
		//location.reload();
		$('#pl_nm').hide();
		$('#myTable').innerHTML='';
		$('#'+name).trigger('click');
	    }
	    location.reload();
	},
	error: function(response)
	{
	    alert('Video/Playlist doen\'t exsist');
	},
    });
    clearipfield(['rem_us_plnm','rem_us_nm']);
}

function chck()
{
    if (document.getElementById('chk_nm').checked) 
    {
	$('#Custom_name').show();
    }
    else {
	$('#Custom_name').hide();
    }
};

function chck1()
{
    if (document.getElementById('add_vid').checked) 
    {
  	document.getElementById('us_nm').checked=false;
	document.getElementById('us_url').checked=false;

	$('#add_vid_pl').show();
	$('#rem_vid_pl').hide();
	document.getElementById('rem_vid').checked=false;
	$('#add_us_nm_inp').hide();
	$('#add_us_url_inp').hide();

    }
    else {
	$('#add_vid_pl').hide();
    }
};
function chck2()
{
    if (document.getElementById('rem_vid').checked) 
    {
	$('#add_vid_pl').hide();
	$('#rem_vid_pl').show();
	document.getElementById('add_vid').checked=false;

    }
    else {
	$('#rem_vid_pl').hide();
	
    }
};

function chck3()
{
    if (document.getElementById('us_url').checked) 
    {
	$('#add_us_url_inp').show();
	$('#add_us_nm_inp').hide();
	document.getElementById('us_nm').checked=false;

    }
    else {
	$('#add_us_url_inp').hide();
    }
};

function chck4()
{
    if (document.getElementById('us_nm').checked) 
    {
	$('#add_us_url_inp').hide();
	$('#add_us_nm_inp').show();
	document.getElementById('us_url').checked=false;

    }
    else {
	$('#add_us_nm_inp').hide();
    }
};
document.getElementById('chk_nm').checked=false;
$('#Custom_name').hide();

document.getElementById('add_vid').checked=false;
document.getElementById('rem_vid').checked=false;
document.getElementById('us_nm').checked=false;
document.getElementById('us_url').checked=false;
$('#add_vid_pl').hide();
$('#rem_vid_pl').hide();
$('#add_us_nm_inp').hide();
$('#add_us_url_inp').hide();

/*function addImg(str) 
  {
  document.getElementById('warning').innerHTML = "";
  y="<br /><a href=\"#myModal\" data-toggle=\"modal\"><img id=\""+str+"\" src=\"http://img.youtube.com/vi/"+str+"/0.jpg\" width=\"350\" height=\"250\" class=\"thumbnail\"></img></a>";
  var table = document.getElementById('myTable');
  gallery.push(str);
  
  var opn = "<div class=\"slideThree\"><input type=\"checkbox\" value=\"None\" class=\"w3check\" id=\"check\" style=\"margin-left:15px; margin-right:10px;\" name=\"check\" style=\"padding:10px;\" /><label for=\"slideThree\" class=\"classname\">Loop</label></div>";
  if((c%3)==0)
  {
  if(r!=0)
  var row = table.insertRow();
  else
  var row = table.insertRow(0);
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  var cell3 = row.insertCell();
  cell1.innerHTML = y + opn;
  c++;
  r++;
  }
  else
  {
  var currrow = table.rows[r-1];
  var currcell = currrow.cells[c];
  currcell.innerHTML = y + opn;
  if(c%3!=2)
  c++;
  else
  c=0;
  }
  
  document.getElementById(str).addEventListener("click", function() {
  f(str);});
  }*/
function addImg(str) 
{
    if(!isDuplicate(str))
    {
	document.getElementById('warning').innerHTML = "";
	y="<br /><a href=\"#myModal\" data-toggle=\"modal\"><img id=\""+str+"\" src=\"http://img.youtube.com/vi/"+str+"/0.jpg\" width=\"350\" height=\"250\" class=\"thumbnail\"></img></a>";
	var table = document.getElementById("myTable");
	gallery.push(str);
	
	var opn = "<table style=\"width:100%\"><tr><td style=\"width:25%\"><div class=\"slideThree\" style=\"padding-left:0px;\"><input type=\"checkbox\" value=\"None\" class=\"w3check\" id=\""+ str + "check\" style=\"margin-left:15px; margin-right:10px;\" name=\"check\" style=\"padding:10px;\" /><label for=\"slideThree\" class=\"classname\">Loop</label></div></td></tr></table>";
	//console.log(opn);
	if((c%3)==0)
	{
	    if(r!=0)
		var row = table.insertRow();
	    else
		var row = table.insertRow(0);
	    var cell1 = row.insertCell();
	    var cell2 = row.insertCell();
	    var cell3 = row.insertCell();
	    cell1.innerHTML = y + opn;
	    c++;
	    r++;
	}
	else
	{
	    var currrow = table.rows[r-1];
	    var currcell = currrow.cells[c];
	    currcell.innerHTML = y + opn;
	    if(c%3!=2)
		c++;
	    else
		c=0;
	}
	
	document.getElementById(str).addEventListener("click", function() {
	    webscrop(str);});
    }
    else
    {
	//window.alert("Error: This video has already been added to the gallery.");
    }
}
function webscrop(str)
{
    for(var i=0; i<(gallery.length); i++)
    {
    	if(gallery[i] == str)
    	    break;
    }
    //console.log(i);
    //console.log(str);
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(resp)
	{ 
	    usr_name = resp.user['username'];
	    $.ajax({
		url:'http://127.0.0.1:8080/getResponse',
		method:'POST',
		data:{video_id: str, username: usr_name},
		success:function(response)
		{
		    //console.log("Now consider this: ", response);
		    document.getElementById('hding').innerHTML = response['name'];
		    res = {};
		    res['name'] = response['channelname'];
		    res['date'] = response['date'];
		    res['desc'] = response['desc'];
		    res['profile_img'] = response['profile_img'];
		    res['profile'] = response['profile'];
		    res['title'] = response['name'];
		    f(str, res);
		    showl();
		},
		error: function(response)
		{
		    //console.log(response);
		},
	    });
	},
	error: function(response)
	{
	    //console.log("Still wrong");
	},
    });
}


function logout()
{
    $.ajax({
	url:'http://127.0.0.1:8080/logout',
	method:'POST',
	data:{},
	success:function(response)
	{
	    ////console.log("response");
	    if(response.success==true)
	    {
		window.location = "http://127.0.0.1:8080/";
	    }
	    
	},
	error: function(response)
	{
	    alert('Try again');
	},
    });

}


function dashboard_redirect()
{
    $.ajax({
	url:'http://127.0.0.1:8080/plsredirecttodash',
	method:'POST',
	data:{},
	success:function(response)
	{
	    window.location='http://127.0.0.1:8080/dashboard';

	},
	error: function(response)
	{
	    alert('Try again');
	},
    });



}

$('#play_all').hide();
