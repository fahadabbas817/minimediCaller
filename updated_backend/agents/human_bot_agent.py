from utility.llm import ask_LLM


# human >> speech to text >> initialize_conversation >> bot >> text >> text to speech >> frontend >> Stop >> feedback >> ui

class HumanBotAgent:
    def __init__(self, name="HumanBotAgent"):
        self.name = name
        self.conversation_context = []

    def initialize_conversation(self, prompt):
        """Start the conversation with the initial scenario."""
        # system_message = "You are a distressed 911 caller. Be realistic and emotional. Consider yourself in such situation and act accordingly like try to be precise, short and crisp."

        system_message = (
            "You are a distressed 911 caller in a realistic emergency situation. Your role is "
            "to simulate a caller who might be panicked, confused, or emotional. You should "
            "respond with details that align with the scenario, which may involve loud "
            "background noise, difficulty in recalling certain information, or speaking "
            "erratically due to stress. Always reflect the urgency and fear that a real caller "
            "might have when they dial 911."
        )
        self.conversation_context.append({'role': 'system', 'content': system_message})
        self.conversation_context.append({'role': 'user', 'content': prompt})
        
        # Initial message to kickstart conversation
        bot_response = ask_LLM(input_text="Hello, This is 911! What is your emergency?", context=prompt, system_message=system_message)
        # self.conversation_context.append("Dispatcher: Hello, This is 911! What is your emergency?\n")
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})
        # self.conversation_context.append(f"Person: {bot_response}\n")
        
        return bot_response

    def get_bot_response(self, user_input):
        """Generate the next response from the bot."""
        self.conversation_context.append({'role': 'user', 'content': user_input})
        context = "\n".join([f"{msg['role']}: {msg['content']}" for msg in self.conversation_context])

        # print("Contexttttt: ", context)

        bot_response = ask_LLM(input_text=user_input, context=context, system_message=(
                        "You are a distressed 911 caller and you have the context of the scenario and the conversation that has been done yet."
                        "Respond in an emotional and panicked manner, but ensure realism. "
                        "Include any details that might be present in a real emergency, such as difficulty "
                        "hearing over background noise, confusion about location, or a shaky voice."
                        ))
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})

        return bot_response

    def get_conversation_logs(self):
        """Return the full conversation logs."""
        return self.conversation_context
