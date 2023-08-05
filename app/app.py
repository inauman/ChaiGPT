from apikey import OPENAI_API_KEY
from langchain.llms import OpenAI
from flask import Flask, Response, request, stream_with_context
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from flask_cors import CORS
import json, time, openai
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

app = Flask(__name__)
CORS(app)
openai.api_key=OPENAI_API_KEY
def send_messages(messages):
    # A new system message
    system_message = [{"role": "system", "content": "You are an AI that communicates in Markdown."}]
    messages = system_message + messages
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        stream=True
    )

@app.route('/api/chaty', methods=['POST'])
def chaty():
  messages = request.json['messages']
  def event_stream():
      for line in send_messages(messages=messages):
          text = line.choices[0].delta.get('content', '')
          if len(text): 
              yield text

  return Response(event_stream(), mimetype='text/event-stream')

# Flask app - ChatOpenAI (Streaming not supported yet. Only stream to console but not to the browser)
# llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY, streaming=True, verbose=False, callbacks=[StreamingStdOutCallbackHandler()], temperature=0)

# def mend_messages(question):
#     return llm([HumanMessage(content=question)])

# @app.route('/api/chatx', methods=['GET', 'POST'])
# def chatx():
#   question = request.json['message']
#   def generate():
#     for line in mend_messages(question):
#       print(line)
#       text = line[1]
#       yield text
#     return Response(generate(), mimetype='text/event-stream')
#   # def generate():
#   #   for chunk in llm([HumanMessage(content=question)]):
#   #     yield chunk
 
#   return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
  app.run(debug=True, threaded=True)