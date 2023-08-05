from apikey import OPENAI_API_KEY
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
)
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

chat = ChatOpenAI(openai_api_key=OPENAI_API_KEY, streaming=True, callbacks=[StreamingStdOutCallbackHandler()], temperature=0)
resp = chat([HumanMessage(content="Write me a song about sparkling water.")])

print(resp)

# # Flask backend

# from flask import Flask, request, Response
# from langchain.callbacks import StreamingStdOutCallbackHandler
# from langchain.llms import OpenAI

# app = Flask(__name__)
# llm = OpenAI(streaming=True)

# @app.route('/chat', methods=['POST']) 
# def chat():
#   text = request.json['text']
  
#   def stream(token):
#     text = {'id': id, 'text': token}
#     yield f'data: {json.dumps(text)}\n\n'

#   id = 0
#   return Response(llm.generate(text, callback=StreamingStdOutCallbackHandler(stream)),
#                   mimetype='text/event-stream')

# if __name__ == '__main__':
#   app.run()