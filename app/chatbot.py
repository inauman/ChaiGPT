from langchain import OpenAI, ConversationChain, LLMChain, PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from apikey import OPENAI_API_KEY

def process_message(user_message):
    template = """
    {history}
    Human: {human_input}
    Assistant:"""

    

    prompt = PromptTemplate(input_variables=["history", "human_input"], template=template)
    memory=ConversationBufferWindowMemory(k=20)
    chatgpt_chain = LLMChain(
        llm=OpenAI(openai_api_key=OPENAI_API_KEY, temperature=0),
        prompt=prompt,
        verbose=False,
        memory=memory,
    )
    bot_response = chatgpt_chain.predict(human_input=user_message)
    
    summary = memory.load_memory_variables({})['history']

    # Generate prompt
    prompt = f"Summarize this in 3-4 words: {summary}"
    # Generate title from summary
    result = OpenAI(openai_api_key=OPENAI_API_KEY).generate(
    prompts=[prompt], max_tokens=5)

    title = result.generations[0][0].text.strip()

    return title, bot_response

if __name__ == '__main__':
    process_message("Hello!")