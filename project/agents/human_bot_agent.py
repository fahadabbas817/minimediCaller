from utility.llm import ask_LLM


# human >> speech to text >> initialize_conversation >> bot >> text >> text to speech >> frontend >> Stop >> feedback >> ui

class HumanBotAgent:
    def __init__(self, name="HumanBotAgent"):
        self.name = name
        self.conversation_context = []

    def initialize_conversation(self, prompt):
        """Start the conversation with the initial scenario."""
        system_message = "You are a distressed 911 caller. Be realistic and emotional."
        self.conversation_context.append({'role': 'system', 'content': system_message})
        self.conversation_context.append({'role': 'user', 'content': prompt})
        
        # Initial message to kickstart conversation
        bot_response = ask_LLM(input_text="Hello, This is 911! What is your emergency?", context=prompt, system_message=system_message)
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})
        
        return bot_response

    def get_bot_response(self, user_input):
        """Generate the next response from the bot."""
        self.conversation_context.append({'role': 'user', 'content': user_input})
        context = "\n".join([f"{msg['role']}: {msg['content']}" for msg in self.conversation_context])

        bot_response = ask_LLM(input_text=user_input, context=context, system_message="You are a distressed 911 caller.")
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})

        return bot_response

    def get_conversation_logs(self):
        """Return the full conversation logs."""
        return self.conversation_context
