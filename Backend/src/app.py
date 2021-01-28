from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:hola1234@localhost/reactflask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    email = db.Column(db.String(70), unique=True)
    password =db.Column(db.String(70))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

db.create_all()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('id','name', 'email', 'password')
        load_instance=True

user_schema = UserSchema()
users_schema = UserSchema(many=True)


# routes
@app.route('/users', methods=['POST'])
def createUser():

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    new_user = User(name, email, password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

@app.route('/users', methods=['GET'])
def getUser():

    all_users = User.query.all()
    result = users_schema.dump(all_users)

    return users_schema.jsonify(result)

@app.route('/users/<id>', methods=['GET'])
def getUsers(id):
    
    user_id = User.query.get(id)
    return user_schema.jsonify(user_id)

@app.route('/users/<id>', methods=['PUT'])
def deleteUser(id):
    
    user = User.query.get(id)

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    user.name = name
    user.email = email
    user.password = password

    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/users/<id>', methods=['DELETE'])
def updateUser(id):
    
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)
