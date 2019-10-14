if __name__ == "__main__":
    from portfolio_data import PortfolioData
else:
    # Need this in ordet to import right when testing
    from app.portfolio_data import PortfolioData

from flask import Flask, request, g, render_template, session, redirect, url_for
import os

app = Flask(__name__)
key = 'very secret string'
app.secret_key = key

with app.app_context():
    data = PortfolioData()


@app.teardown_appcontext
def close_connection(exception):
    data.close_connection()


def my_render(template, **kwargs):
  return render_template(template, user = '', **kwargs)


@app.route('/update_server', methods=['POST'])
def webhook():
  if request.method == 'POST':
    os.system('/home/Andreasgdp/My-Portfolio/git_pull.sh')
    return 'Updated PythonAnywhere successfully', 200
  else:
    return 'Wrong event type', 400

@app.route('/')
@app.route('/login')
def index():
  return my_render('index.html', title = 'homepage')

if __name__ == "__main__":
  with app.app_context():
    data = PortfolioData()

  app.run(debug=True)