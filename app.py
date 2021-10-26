from flask import Flask, render_template, redirect, url_for, session, request
import os
import spotipy, time
from spotipy.oauth2 import SpotifyOAuth
from secrets import *

app = Flask(__name__) 


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sorter')
def sorter():
    return render_template('sorter.html')

@app.route('/results')
def results():
    return render_template('results.html')


app.secret_key = os.environ['SECRET_KEY']
app.config['SESSION_COOKIE_NAME'] = 'RankMee Cookie'
TOKEN_INFO = 'token_info'

clientid = os.environ['CLIENT_ID']
clientsecret = os.environ['CLIENT_SECRET']

@app.route('/SpotifyLogin')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info 
    return redirect(url_for('spotifyranks', _external=True))

@app.route('/spotifyranks')
def spotifyranks():
    try:
        token_info = get_token()
    except:
        print('user not logged in')
        return redirect(url_for('login', _external=True))
    
    sp = spotipy.Spotify(auth=token_info['access_token'])

    def top10():
        names = []
        for item in items:
            name = str(item["name"])
            names.append(name)
        global top_list
        top_list = names

    items = sp.current_user_top_artists(limit=5, offset=0, time_range='long_term')['items']
    top10()
    artists_long = top_list
    items = sp.current_user_top_artists(limit=5, offset=0, time_range='medium_term')['items']
    top10()
    artists_medium = top_list
    items = sp.current_user_top_artists(limit=5, offset=0, time_range='short_term')['items']
    top10()
    artists_short = top_list
    items = sp.current_user_top_tracks(limit=5, offset=0, time_range='long_term')['items']
    top10()
    songs_long = top_list
    items = sp.current_user_top_tracks(limit=5, offset=0, time_range='medium_term')['items']
    top10()
    songs_medium = top_list
    items = sp.current_user_top_tracks(limit=5, offset=0, time_range='short_term')['items']
    top10()
    songs_short = top_list

    data = {"artists_long": artists_long, "artists_medium": artists_medium, "artists_short": artists_short, "songs_long": songs_long, "songs_medium": songs_medium, "songs_short": songs_short}

    return render_template('spotifyranks.html', data=data)


def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise 'exception'
    now = int(time.time())
    is_expired = token_info['expires_at'] - now <60
    if (is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info
    

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = clientid,
        client_secret = clientsecret,
        redirect_uri = url_for('redirectPage', _external=True),
        scope = 'user-library-read user-top-read'
    )


if __name__ == '__main__':
    app.run(debug=False) 