from flask_socketio import SocketIO, emit, join_room, leave_room
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://snack-m5nc.onrender.com",
        "https://snack-m5nc.onrender.com"
    ]
else:
    origins = "*"

# Create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('chat')
def handle_chat(data):
    emit('chat', data, broadcast=True)
