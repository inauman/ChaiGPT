from flask import Flask, jsonify, request
from chatbot import process_message
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    # Get user input from request body
    user_input = request.json.get('user_input')
    
    # Get the bot response from process_message function for title and output

    [title, bot_response] = process_message(user_input)

    return jsonify({
        "title": title,
        "message": bot_response
    })

    # return jsonify({
    #     'user_input': user_input,
    #     'bot_response': bot_response
    # })

if __name__ == '__main__':
    app.run(debug=True)