from flask import Flask, render_template, redirect, url_for, session, request
import os
import spotipy
from secrets import *
from flask_session import Session
import uuid


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

"""
*    Title: Spotipy examples
*    Author: Lamere, Paul
*    Date: Jan 30
*    Code version: 
*    Availability: https://github.com/plamere/spotipy/blob/0a9270f3853774d60210a66da66496684422b559/examples/app.py
"""
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = '.flask_session/'

clientid = os.environ['CLIENT_ID']
clientsecret = os.environ['CLIENT_ID']

Session(app)

caches_folder = '.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)

def session_cache_path():
    return caches_folder + session.get('uuid')


@app.route('/spotifyranks')
def spotifyranks():
    if not session.get('uuid'):
        # Step 1. Visitor is unknown, give random ID
        session['uuid'] = str(uuid.uuid4())

    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-library-read user-top-read', 
                                                client_id=clientid,
                                                client_secret = clientsecret,
                                                redirect_uri=url_for('spotifyranks', _external=True),
                                                cache_handler=cache_handler, 
                                                show_dialog=True)

    if request.args.get("code"):
        # Step 3. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/spotifyranks')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 2. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return redirect(auth_url)

    # Step 4. Signed in, display data
    sp = spotipy.Spotify(auth_manager=auth_manager)

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




if __name__ == '__main__':
    app.run(debug=False) 