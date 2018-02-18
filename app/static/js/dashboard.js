var unm,flagn=0;
var ldflag=0;
$( document ).ready(function() {
    //    location.reload();
    loadwl();
    loadfav();
});
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
	add_playlistini('Recently Played',response['user'].username);
	add_playlistini('Watch Later',response['user'].username);
	add_playlistini('Favourites',response['user'].username);
	unm=response['user'].username;
    },
    error: function(response)
    {
	window.location = "http://127.0.0.1:8080/";
    },
});
function dashboard_redirect()
{
    $.ajax({
	url:'http://127.0.0.1:8080/reloadDone',
	method:'POST',
	data:{},
	success:function(response)
	{
	    location.reload();

	},
	error: function(response)
	{
	    alert('Please reload the page');
	},
    });



}

function loadwl()
{
    //$('#play_all').hide();
    ////console.log(name+'x'+username)
    $.ajax({
	url:'http://127.0.0.1:8080/getPlaylist',
	method:'POST',
	data:{name:'Watch Later',username:unm},
	success:function(response)
	{
	    console.log(response);
	    /*flagx=name;gallery=[];
	      document.getElementById('myTable').innerHTML='';
	      r=0;c=0;
	      //console.log(response);
	      $('#pl_hd').text(name);
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
	      }*/
	    for(i=0;i<response.length;i++)
	    {
		change(response[i]);
	    }
	    
	},
	error: function(response)
	{
	    //				alert('Playlist already exsists')
	},
    });


}
function loadfav()
{
    $.ajax({
	url:'http://127.0.0.1:8080/getPlaylist',
	method:'POST',
	data:{name:'Favourites',username:unm},
	success:function(response)
	{
	    //console.log(response);
	    for(i=0;i<response.length;i++)
	    {
		//console.log(response);
		//flagn=1;
		//$('#'+response[i]+'fav').trigger('click');
		change_fav(response[i]);
	    }
	    
	},
	error: function(response)
	{
	    //				alert('Playlist already exsists')
	},
    });
}

function add_playlistini(name,username)
{
    $.ajax({
	url:'http://127.0.0.1:8080/create',
	method:'POST',
	data:{name:name,username:username},
	success:function(response)
	{
	    ////console.log(response);
	    var modal = document.getElementById('myMdal');
    	    modal.style.display = "none";

	    //document.getElementById('allPl').innerHTML+="<a  class=\"innerElements3\" id=\""+name+"\" "+"onclick=\"h1(\'"+String(name)+"\')\""+">"+name+"</a>";
	},
	error:function(response)
	{
	    //alert('Playlist already exsists')
	},
    });

}
function add_fav(id)
{
    //console.log("Add nm2");

    $.ajax({
	url:'http://127.0.0.1:8080/addvideo',
	method:'POST',
	data:{username:unm,name:'Favourites',video_id:id},
	success:function(response)
	{
	    console.log(response);
	    console.log("added");
	    //location.reload();
	    /*	if(flagx==name)
		{
		document.getElementById('myTable').innerHTML='';
		r=0;c=0;
		$('#play_all').hide();
		h1(name);
		}*/

	},
	error: function(response)
	{
	    //alert('Video/Playlist doen\'t exsist');
	    if(flagn!=0)
	    {rem_fav(id);}
	},
    });

}

function add_wl(id)
{
    //console.log("Add nm2");
    console.log(id);
    $.ajax({
	url:'http://127.0.0.1:8080/addvideo',
	method:'POST',
	data:{username:unm,name:'Watch Later',video_id:id},
	success:function(response)
	{
	    //console.log(response);
	    //location.reload();
	    /*	if(flagx==name)
		{
		document.getElementById('myTable').innerHTML='';
		r=0;c=0;
		$('#play_all').hide();
		h1(name);
		}*/

	},
	error: function(response)
	{
	    //alert('Video/Playlist doen\'t exsist');
	},
    });

}

function rem_fav(id)
{

    $.ajax({
	url:'http://127.0.0.1:8080/remvideo',
	method:'POST',
	data:{username:unm,name:'Favourites',video_id:id},
	success:function(response)
	{
	    //console.log(response);
	    //location.reload();
	    /*if(flagx==name)
	      {
	      document.getElementById('myTable').innerHTML='';
	      r=0;c=0;
	      h1(name);
	      }*/

	},
	error: function(response)
	{
	    //add_fav(id);
	    //alert('Video/Playlist doen\'t exsist');
	},
    });

}

function rem_wl(id)
{

    $.ajax({
	url:'http://127.0.0.1:8080/remvideo',
	method:'POST',
	data:{username:unm,name:'Watch Later',video_id:id},
	success:function(response)
	{
	    //console.log(response);
	    //location.reload();
	    /*if(flagx==name)
	      {
	      document.getElementById('myTable').innerHTML='';
	      r=0;c=0;
	      h1(name);
	      }*/

	},
	error: function(response)
	{
	    //alert('Video/Playlist doen\'t exsist');
	},
    });

}

$(document).on('click','#myModal',function(){
    hide2();
});
var r=0,c=0,flag=0,flag1=0;
var gallery = [];
var usr_name;
$(document).ready(function(){
    var url = $("#cartoonVideo").attr('src');
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });
});


function webscrop(str)
{
    add_recent(str);
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
		    response['name'] = response['name'].toUpperCase();
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

function splicetitle(title)
{
    title = String(title);
    title = title.slice(7,-18);
    title = title;
    return title;
}
function add_recent(id)
{
    //console.log("Add recent");

    $.ajax({
	url:'http://127.0.0.1:8080/addrecent',
	method:'POST',
	data:{username:unm,name:'Recently Played',video_id:id},
	success:function(response)
	{
	    //console.log(response);
	    //location.reload();
	    /*						if(flagx==name)
							{
							document.getElementById('myTable').innerHTML='';
							r=0;c=0;
							$('#play_all').hide();
							h1(name);
							}
	    */
	},
	error: function(response)
	{
	    //				alert('Video/Playlist doen\'t exsist');
	},
    });

}

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
	//console.log("Consider this: ",response);
	response['name'] = response['name'];
	var des="<div style=\"color:black; background-color:#cccccc; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:30px;\"><p><table style=\"width:100%;\><tr><td style=\"width:50%;\"><a class=\"cp\" href=\"" + response['profile'] + "\"><img style=\"padding-right:15px;\" src=\"" + response['profile_img'] + "\"></img>" + response['name'] + "</a></td><td style=\"text-align:right; width:50%;\">" + response['date'] + "</td></tr></table></p><div style=\"text-align:center;\"><button onclick=\"showm();\" id=\"more\">VIEW DESCRIPTION</button></div><br/><div id = \"descr\" style=\"overflow:scroll;height:300px;\"><p style=\"class:bro;\">" + response['desc'] + "</p></div><div style=\"text-align:center;\"><button onclick=\"showl();\" id=\"less\">HIDE DESCRIPTION</button></div></div>";
	a.innerHTML = addn +"<br><center><button style='background-color:black;padding: 15px 32px;border-radius: 12px;' onclick=download(\""+url+"\")>DOWNLOAD</button></center><br>" + des;    }
    else
    {
	a.innerHTML = addn;
    }
    flag1=0;
    return;
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
    if(flag==0)
    {
	f('','');
    }
    flag=0;
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

function changef1(str)
{
    	add_fav(str);
    console.log("Called");
    var divid = str + "div2";
    var imgdiv = document.getElementById(divid);
    var favid = str + "favc";
    imgdiv.innerHTML = "<img src=\"../static/images/favc.png\" style=\"width:18px; height:18px; margin: 3px 10px 7px 10px; cursor:pointer;\" id=\"" + favid + "\" onclick=\"changef2('" + str + "')\" ></img> \
								<span style=\"padding-top:20px; margin-top:20px;\">Star</span>";
    return;
}

function change_fav(str)
{
	//add_fav(str);
    console.log("Called");
    var divid = str + "div2";
    var imgdiv = document.getElementById(divid);
    var favid = str + "favc";
    imgdiv.innerHTML = "<img src=\"../static/images/favc.png\" style=\"width:18px; height:18px; margin: 3px 10px 7px 10px; cursor:pointer;\" id=\"" + favid + "\" onclick=\"changef2('" + str + "')\" ></img> \
								<span style=\"padding-top:20px; margin-top:20px;\">Star</span>";
    return;
}

function changef2(str)
{
    rem_fav(str);
    var divid = str + "div2";
    var imgdiv = document.getElementById(divid);
    var favid = str + "favu";
    imgdiv.innerHTML = "<img src=\"../static/images/favu.png\" style=\"width:18px; height:18px; margin: 3px 10px 7px 10px; cursor:pointer;\" id=\"" + favid + "\" onclick=\"changef1('" + str + "')\" ></img> \
								<span style=\"padding-top:20px; margin-top:20px;\">Star</span>";
    return;
}

function change1(str)
{
    add_wl(str);
    //console.log("YEYEYYAEYAY");
    //console.log("This is the string:",str);
    var divid = str + "div";
    var imgdiv = document.getElementById(divid);
    imgdiv.innerHTML = "";
    var wlid = str + "wlclicked";
    var x = "onclick=\"change2('" + str + "')";
    //console.log("PLZZZZ:",x);
    imgdiv.innerHTML = "<img src=\"../static/images/wl2click.png\" style=\"width:16px; height:16px; cursor:pointer; margin: 5px 3px 5px 11px;\" id=\"" + wlid + "\" onclick=\"change2('" + str + "')\"></img> \
						<span style=\"padding-top:20px; margin-top:20px; position:relative; top:2px\">Later</span>";
    return;
}
function change(str)
{
    //add_wl(str);
    ////console.log("YEYEYYAEYAY");
    //console.log("This is the string:",str);
    var divid = str + "div";
    var imgdiv = document.getElementById(divid);
    console.log(divid,imgdiv);
    imgdiv.innerHTML = "";
    var wlid = str + "wlclicked";
    var x = "onclick=\"change2('" + str + "')";
    //console.log("PLZZZZ:",x);
    imgdiv.innerHTML = "<img src=\"../static/images/wl2click.png\" style=\"width:16px; height:16px; cursor:pointer; margin: 5px 3px 5px 11px;\" id=\"" + wlid + "\" onclick=\"change2('" + str + "')\"></img> \
						<span style=\"padding-top:20px; margin-top:20px; position:relative; top:2px\">Later</span>";
    return;
}


function change2(str)
{
    rem_wl(str);
    var divid = str + "div";
    var imgdiv = document.getElementById(divid);
    imgdiv.innerHTML = "";
    var wlid = str + "wlnormal";
    imgdiv.innerHTML = "<img src=\"../static/images/w21.jpg\" style=\"width:16px; height:16px; cursor:pointer; margin: 5px 3px 5px 11px;\" id=\"" + wlid + "\" onclick=\"change1('" + str + "')\"></img> \
						<span style=\"padding-top:20px; margin-top:20px; position:relative; top:2px\">Later</span>";
    return;
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

function h() 
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{ 
	    var x=$('#url').val();
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
			    clearipfield(['cstm_nm','url']);
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


function ar()
{
    if(flag1==0)
    {
	flag=1;
    }
};


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
function addpopup()
{
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

var modal2 = document.getElementById('myMdal2');
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("clse2")[0];
btn2.onclick = function() {
    modal2.style.display = "block";
}
span2.onclick = function() {
    modal2.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
};



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
    if (document.getElementById('chk_edit_urnm').checked) 
    {
	$('#edit_usrname').show();
    }
    else {
	$('#edit_usrname').hide();
    }
};
function chck2()
{
    if (document.getElementById('chk_edit_psswd').checked) 
    {
	$('#edit_psswd').show();
    }
    else {
	$('#edit_psswd').hide();
    }
};

document.getElementById('chk_nm').checked=false;
$('#Custom_name').hide();
document.getElementById('chk_edit_urnm').checked=false;
$('#edit_usrname').hide();
document.getElementById('chk_edit_psswd').checked=false;
$('#edit_psswd').hide();

function addImg(str) 
{
    if(!isDuplicate(str))
    {
	document.getElementById('warning').innerHTML = "";
	y="<br /><a href=\"#myModal\" data-toggle=\"modal\"><img id=\""+str+"\" src=\"http://img.youtube.com/vi/"+str+"/0.jpg\" width=\"350\" height=\"250\" class=\"thumbnail\"></img></a>";
	var table = document.getElementById("myTable");
	gallery.push(str);
	
		var opn = "<table style=\"width:85%\"> \
					<tr> \
						<td style=\"width:33%; padding-left:0px; padding-right:0px\"> \
						 	<div class=\"slideThree\" style=\"padding-left:0px; padding-right:0px; font-weight:bold; margin-left:0px\"> \
						 		<input type=\"checkbox\" value=\"None\" class=\"w3check\" id=\""+ str + "check\" style=\"margin-left:15px; margin-right:4px; padding:10px; position:relative; top:1px;\" name=\"check\" /> \
						 		<label for=\"slideThree\" class=\"classname\" style=\"position: relative; top: 3px; font-weight:bold\">Loop</label> \
						 	</div> \
						 </td> \
						 <td style=\"width:33%; padding:15px 0px\"> \
						 	<div class=\"slideThree\" style=\"width:95px; color:white; font-weight:bold; margin: 12px 0px\" id=\"" + str + "div2\"> \
						 		<img src=\"../static/images/favu.png\" style=\"width:18px; height:18px; margin: 3px 10px 7px 10px; cursor:pointer;\" id=\"" + str + "favu\" onclick=\"changef1('" + str + "')\" ></img> \
								<span style=\"padding-top:20px; margin-top:20px;\">Star</span> \
						 	</div> \
						 </td> \
						<td style=\"width:33%; padding:15px 0px\"> \
							<div class=\"slideThree\" style=\"width:97px; color:white; font-weight:bold; margin: 20px 0px\" id=\"" + str + "div\"> \
								<img src=\"../static/images/w21.jpg\" style=\"width:16px; height:16px; cursor:pointer; margin: 5px 3px 5px 11px;\" id=\"" + str + "wlnormal\" onclick=\"change1('" + str + "')\"> \
								</img> \
								<span style=\"padding-top:20px; margin-top:20px; position:relative; top:2px\">Later</span> \
							</div> \
						</td> \
					</tr> \
				</table>";
	
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
	window.alert("Error: This video has already been added to the gallery.");
    }
}
function logout()
{
    $.ajax({
	url:'http://127.0.0.1:8080/logout',
	method:'POST',
	data:{},
	success:function(response)
	{
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
function addVideo(response,usernm,vidid)
{
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
	    location.reload();
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
function loadAllVideo(username)
{
    $.ajax({
	url:'http://127.0.0.1:8080/allVideo',
	method:'GET',
	data:{username:username},
	success:function(response)
	{
	    for(i=0;i<response.list.length;i++)
		addImg(response.list[i]['video_id']);
	},
	error:function(response)
	{
	    //console.log(response);
	},
    });	
}
function arbritary()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	data:{},
	success:function(response)
	{
	    loadAllVideo(response.user['username']);
	},
	error: function(response)
	{
	    window.location = "http://127.0.0.1:8080/";
	},
    });
}
arbritary();


function edit()
{
    if(document.getElementById('chk_edit_urnm').checked)
    {
	updatename();
    }
    if(document.getElementById('chk_edit_psswd').checked)
    {
	updatepwd();
    }


}



function updatename()
{
    var name = $('#edit_nm').val();
    var uname = $('#edit_usrnm').val()
    if(name=='')
    {
	alert("Name Field Cannot Be Null")
	return;
    }
    if(uname=='')
    {
	alert("User Name Field Cannot Be Null")
	return;
    }	
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    updatename1(name,uname,response['user'].id);
	},
	error:function (){
	    alert("Not Logged In");
	    return -1;
	},
    });
}
function updatename1(name,uname,id)
{
    $.ajax({
	url:'http://127.0.0.1:8080/edit/name',
	method:'POST',
	data:{name:name,username:uname,uid:id},
	success:function(response)
	{
	    var hdr = document.getElementById('username_head');
	    var y= uname.length;
	    var x = uname;
	    if(y<12)
	    {
		for(i=0;i<=12-y;i++)
		{
		    x+='&nbsp;';
		}
	    }
	    hdr.innerHTML=x;
	    //console.log(response.message);
	},
	error:function(response)
	{
	    alert("Name/Username update failed");
	},
    });
    location.reload();
    clearipfield(['edit_nm','edit_usrnm']);
}
function updatepwd()
{
    
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    //console.log(response['user'].id);
	    updatepwd1(response['user'].id);
	},
	error:function (){
	    alert("Not Logged In");
	    return -1;
	},
    });
    
}
function updatepwd1(id)
{
    pwd=$('#new_passwd').val();
    cpwd=$('#conf_passwd').val();
    if(pwd!=cpwd)
    {
	alert("Confirm Password Doesn't Match");
	return;
    }
    if(validatePassword(pwd))
    {
	$.ajax({
	    url:'http://127.0.0.1:8080/edit/password',
	    method:'POST',
	    data:{old:$('#old_psswd').val(),new:$('#new_passwd').val(),cnew:$('#conf_passwd').val(),uid:id},
	    success:function(response)
	    {
		//console.log(response.message);
	    },
	    error:function(response)
	    {
		alert("Password update failed");
		////console.log("Update Failed");
	    },
	});
    }
    
    location.reload();
    clearipfield(['old_psswd','new_passwd','conf_passwd']);
};
function validatePassword(pwd)
{
    errors = [];
    if (pwd.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (pwd.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (pwd.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one numeric digit."); 
    }
    if(pwd.search(/[$_@#]/) <0)
    {
    	errors.push("Your password must contain at least one special character among $,#,@,_");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}
function playlist_redirect()
{
    /*$.ajax({
      url:'http://127.0.0.1:8080/playlists',
      method:'POST',
      data:{},
      success:function(response)
      {
      },
      error: function(response)
      {
      alert('Try again');
      },
      });
    */
    window.location='http://127.0.0.1:8080/playlists';

};

function remove()
{
    
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    remove1(response['user'].username);
	},
	error:function (){
	    alert("Not Logged In");
	    return -1;
	},
    });
    
}


function remove1(uname)
{
    $.ajax({
	url:'http://127.0.0.1:8080/deleteVideo',
	method:'POST',
	data:{name:$('#del_name').val(),username:uname},
	success:function(response)
	{
	    //console.log(response);
	    location.reload();
	},
	error:function(response)
	{
	    alert('Remove Failed');
	},
    });
    clearipfield(['del_name']);
}
function usernamefill()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    var x=response['user'].username;
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
function download(id)
{
	alert("Download started. Will be available in home folder of app with name "+id);
    $.ajax({
	url:'http://127.0.0.1:8080/downloadVideo',
	method:'POST',
	data:{vid:id},
	success:function(response)
	{
		ldflag=1;
	    console.log(response);
	    ldflag=0;
	},
	error:function(response)
	{
	    alert('Download Failed');
	    ldflag=0;
	},
    });
}
usernamefill();
$body = $("body");

$(document).on({
    ajaxStart: function() { if(ldflag==0)$body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});
