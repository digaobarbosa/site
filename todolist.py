from flask import Flask,render_template
from flask_login import LoginManager

from database import db_session
from werkzeug.contrib.fixers import ProxyFix
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/login')
def todoapp():
    return render_template('todo.html')

@app.route('/life')
def life():
    return render_template('life.html')
@app.route('/contact')
def contact():
    return render_template('contact.html')

from todolist.models import User



@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


app.wsgi_app = ProxyFix(app.wsgi_app)
if __name__ == '__main__':
    app.run(debug=True)
