from flask import *
from sqlalchemy.exc import *
from sqlalchemy import *
from app import *
from app.user.models import *
from app.gallery.models import *
from .models import *
from .webScraping import *

mod_playlist = Blueprint('Playlist',__name__)

@mod_playlist.route('/getdetails',methods=['POST'])
@requires_auth
def details():
	url=request.form.get('url')
	ans=crt(url)
	return jsonify(ans)

@mod_playlist.route('/create',methods=['POST'])
@requires_auth
def create_playlist():
	try:
		username=request.form.get('username')
		name=request.form.get('name')
	except KeyError as e:
		return jsonify(success=False,message="%s not sent in request" % e.args), 200
	u=User.query.filter(User.username==username).all()
	if(len(u)==0):
		return jsonify(success=False,message="No such User Exists"),200
	chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name==name)).all()
	if(len(chk) >0):
		print("Inside dupli check")
		return jsonify(success=False,message='Playlist already exists'),200
	newlist=Playlist(name,username)
	db.session.add(newlist)
	try:
		db.session.commit()
		print("inside Try...After Commit")
	except:
		return jsonify(success=False,message='Some Random Shit Happened'),200
		
	return jsonify(success=True,message='Playlist Created'),200

@mod_playlist.route('/remove',methods=['POST'])
@requires_auth
def remove_playlist():
    print("Back-end bolayu")
    try:
        username=request.form.get('username')
        name=request.form.get('name')
    except KeyError as e:
        return jsonify(success=False,message="%s not sent in request" % e.args), 400
    u=User.query.filter(User.username==username).all()
    if(len(u)==0):
        return jsonify(success=False,message="No such User Exists"),400
    chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name==name)).first()
    if chk is None:
        print("Inside existence check")
        return jsonify(success=False,message=' No Such Playlist exists'),400
    db.session.delete(chk)
    try:
        db.session.commit()
    except:
        return jsonify(success=False,message='Some Random Shit Happened'),400
    return jsonify(success=True ,message='Playlist Deleted')  ,200  

@mod_playlist.route('/addvideo',methods=['POST'])
@requires_auth
def add_video():
    try:
        username=str(request.form.get('username'))
        name=str(request.form.get('name'))
        video_id=str(request.form.get('video_id'))
        print(username+" "+name+" "+video_id)
    except KeyError as e:
        return jsonify(success=False,message="%s not sent in request" % e.args), 400
    u=User.query.filter(User.username==username).all()
    if(len(u)==0):
        return jsonify(success=False,message="No such User Exists"),400
    chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name==name)).first()
    if chk is None:
        print("Inside existence check")
        return jsonify(success=False,message='No Such Playlist exists'),400
    cur_videos=chk.video_id
    print(cur_videos)
    cur_videos=cur_videos.strip(',')
    print(cur_videos)
    temp=cur_videos.split(',')
    print(temp)
    if video_id in temp:
        return jsonify(success=False,message='Video Already exists'),400
    temp.append(video_id)
    cur_videos=','.join(temp)
    #print(cur_videos)
    chk.video_id=cur_videos
    print(chk.video_id)
    try:
        db.session.commit()
    except:
        return jsonify(success=False,message='Commit Error'),400
    return jsonify(success=True,message='Video Added',details=str(chk.video_id)),200

@mod_playlist.route('/remvideo',methods=['POST'])
@requires_auth
def rem_video():
    try:
        username=str(request.form.get('username'))
        name=str(request.form.get('name'))
        video_id=str(request.form.get('video_id'))
        print(username+" "+name+" "+video_id)
    except KeyError as e:
        return jsonify(success=False,message="%s not sent in request" % e.args),400
    u=User.query.filter(User.username==username).all()
    if(len(u)==0):
        return jsonify(success=False,message="No such User Exists"),400
    chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name==name)).first()
    if chk is None:
        print("Inside existence check")
        return jsonify(success=False,message='No Such Playlist exists'),400
    cur_videos=chk.video_id
    print(cur_videos)
    cur_videos=cur_videos.strip(',')
    print(cur_videos)
    temp=cur_videos.split(',')
    print(temp)
    if video_id not in temp:
        return jsonify(success=False,message='No Such Video exists'),400
    temp.remove(video_id)
    cur_videos=','.join(temp)
    chk.video_id=cur_videos
    print(chk.video_id)
    try:
        db.session.commit()
    except:
        return jsonify(success=False,message='Commit Error'),400
    return jsonify(success=True,message='Video Deleted',details=str(chk.video_id)),200

@mod_playlist.route('/addrecent',methods=['POST'])
@requires_auth
def add_recent():
    try:
        username=str(request.form.get('username'))
        video_id=str(request.form.get('video_id'))
        print(username+" "+video_id)
    except KeyError as e:
        return jsonify(success=False,message="%s not sent in request" % e.args), 400
    u=User.query.filter(User.username==username).all()
    if(len(u)==0):
        return jsonify(success=False,message="No such User Exists"),400
    if video_id=='' or video_id==' ':
    	return jsonify(success=True),200
    chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name=='Recently Played')).first()
    cur_videos=chk.video_id
    print(cur_videos)
    cur_videos=cur_videos.strip(',')
    print(cur_videos)
    temp=cur_videos.split(',')
    print(temp)
    if video_id in temp:
        temp.remove(video_id)
        temp.insert(0,video_id)
    else:
    	temp.insert(0,video_id)
    cur_videos=','.join(temp)
    chk.video_id=cur_videos
    print(chk.video_id)
    try:
        db.session.commit()
    except:
        return jsonify(success=False,message='Commit Error'),400
    return jsonify(success=True,message='Video Added To Recent',details=temp),200
@mod_playlist.route('/getAllPlaylist',methods=['POST'])
@requires_auth
def get_all_playlist():
	try:
		username=str(request.form['username'])
	except KeyError as e:
		return jsonify(success=False,message="%s not sent in request" % e.args),400
	ans=[]
	all_play= Playlist.query.filter(Playlist.username==username).all()
	for i in all_play:
		print(i.name)
		ans.append(str(i.name))
	return jsonify(ans)

@mod_playlist.route('/getPlaylist',methods=['POST'])
@requires_auth
def get_playlist():
	try:
		username=request.form.get('username')
		name=request.form.get('name')
	except KeyError as e:
		return jsonify(success=False,message="%s not sent in request" % e.args), 400
	u=User.query.filter(User.username==username).all()
	if(len(u)==0):
		return jsonify(success=False,message="No such User Exists"),400
	chk=Playlist.query.filter(and_(Playlist.username==username,Playlist.name==name)).first()
	if chk is None:
		print("Inside dupli check")
		return jsonify(success=False,message='No Such Playlist exists'),400
	temp=chk.video_id.strip(',').split(',')
	return jsonify(temp)
