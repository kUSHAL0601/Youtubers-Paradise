from flask import *
from sqlalchemy import *
from sqlalchemy.exc import *
from app import *
from app.user.models import *
from .models import *
import youtube_dl

mod_gallery = Blueprint('gallery', __name__)


@mod_gallery.route('/addVideo', methods=['POST'])
@requires_auth
def add_video():
    try:
        username = request.form.get('username')
        video_id = request.form.get('video_id')
        name = request.form.get('name')
        channelname = request.form.get('channelname')
        date = request.form.get('date')
        desc = request.form.get('desc')
        profile_img = request.form.get('profile_img')
        profile = request.form.get('profile')
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 200
    userlist=User.query.filter(User.username==username).all()
    if(userlist==[]):
        return jsonify(success=False,message="This user doesn't exsist"), 200
    for user in userlist:
        if(user.id!=(session['user_id'])):
            return jsonify(success=False,message="Do not mess with others account"), 200
    gallerylist=Gallery.query.filter(Gallery.user_id==session['user_id']).all()
    for vid in gallerylist:
        if(vid.name==name or vid.video_id==video_id):
            return jsonify(success=False,message="Video Already There"), 200
    u = Gallery(str(name),session['user_id'],str(video_id),str(date),str(desc),str(profile_img),str(profile),str(channelname))
    #return jsonify(str(u.name)+' '+str(u.video_id)+' '+str(u.user_id))
    db.session.add(u)
    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False, message="This video already exists"), 200

    return jsonify(success=True)

@mod_gallery.route('/allVideo', methods=['GET'])
@requires_auth
def get_all_video():
#    if 'user_id' not in session:
#        return jsonify(success=False,message="Authorization required")
    try:
        username = request.args.get('username')
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 200
    userlist=User.query.filter(User.username==username).all()
    if(userlist==[]):
        return jsonify(success=False,message="This user doesn't exsist"), 200
    for user in userlist:
        if(user.id!=session['user_id']):
            return jsonify(success=False,message="Do not mess with others account"), 200
    videos=Gallery.query.filter(Gallery.user_id==session['user_id'])
    listofvideos=[]
    for i in videos:
        listofvideos.append(i.to_dict())
    return jsonify(success=True,list=listofvideos)

@mod_gallery.route('/deleteVideo', methods=['POST'])
@requires_auth
def del_video():
#    if 'user_id' not in session:
#       return jsonify(success=False,message="Authorization required"),200
    try:
        username = request.form.get('username')
        name = request.form.get('name')
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 200
    userlist=User.query.filter(User.username==username).all()
    if(userlist==[]):
        return jsonify(success=False,message="This user doesn't exsist"), 200
    for user in userlist:
        if(user.id!=(session['user_id'])):
            return jsonify(success=False,message="Do not mess with others account"), 200
    u=Gallery.query.filter(and_(Gallery.user_id==session['user_id'],Gallery.name==name)).first()
    db.session.delete(u)
    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False, message="This video already exists"), 200

    return jsonify(success=True)

@mod_gallery.route('/getid', methods=['GET'])
@requires_auth
def get_id():
    #if 'user_id' not in session:
    #    return jsonify(success=False,message="Authorization required"),200
    try:
        name = request.args.get('name')
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 200
    u=Gallery.query.filter(and_(Gallery.user_id==session['user_id'],Gallery.name==name)).first()
    return jsonify(success=True,id=u.video_id)
@mod_gallery.route('/getResponse',methods=['POST'])
@requires_auth
def get_details():
	try:
		username = request.form['username']
		video_id = request.form['video_id']
	except KeyError as e:
		return jsonify(success=False,message='%s not sent in request' % e.args),200
	user=User.query.filter(User.username==username).all()
	if len(user)==0:
		return jsonify(success=False,message='No Such User Exist'),200
	user=user[0]
	video=Gallery.query.filter(and_(Gallery.video_id==video_id,Gallery.user_id==user.id)).first()
	if video is None:
		return jsonify(success=False,message='No Such Video Exist'),200
	return jsonify(video.to_dict())

@mod_gallery.route('/downloadVideo', methods=['POST'])
@requires_auth
def download_video():
#    if 'user_id' not in session:
#       return jsonify(success=False,message="Authorization required"),200
    try:
        vid = request.form.get('vid')
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 200

    ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s.%(ext)s'})
    with ydl:
        result = ydl.extract_info(
            'https://youtu.be/'+vid,
            download=True
        )
    return jsonify(success=True)