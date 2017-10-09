from flask_sqlalchemy import SQLAlchemy
from app import db

class Gallery(db.Model):
    __tablename__ = 'gallery'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
    video_id = db.Column(db.String(255))
    date = db.Column(db.String(255))
    desc = db.Column(db.String(5000))
    profile_img = db.Column(db.String(255))
    profile = db.Column(db.String(255))
    channelname = db.Column(db.String(255)) 
    
    def __init__(self, name, user_id, video_id, date, desc, profile_img,profile, channelname):
        self.name = name
        self.user_id = user_id
        self.video_id = video_id
        self.date=date
        self.desc=desc
        self.profile_img=profile_img
        self.profile=profile
        self.channelname=channelname
    
    def to_dict(self):
        return {
            'id' : self.id,
            'name': self.name,
            'user_id': self.user_id,
            'video_id':self.video_id,
            'date':self.date,
            'desc':self.desc,
            'profile_img':self.profile_img,
            'profile':self.profile,
            'channelname':self.channelname,
        }

    def __repr__(self):
        return "User<%d> %s" % (self.id, self.name)
