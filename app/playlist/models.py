from flask_sqlalchemy import SQLAlchemy
from app import db

class Playlist(db.Model):
    __tablename__ = 'playlist'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    username = db.Column(db.String(225))
    video_id = db.Column(db.String)

    def __init__(self, name, username):
        self.name = str(name)
        self.username = str(username)
        self.video_id=''

    def to_dict(self):
        return 
        {
            'id' : self.id,
            'name': self.name,
            'username': self.username,
            'video_id':self.video_id,
        }

    def __repr__(self):
        return "User<%d> %s" % (self.id, self.name)
