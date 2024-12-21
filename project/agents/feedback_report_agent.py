
from utils.llm import ask_LLM

class FeedbackReportGenerator:
    def __init__(self, name="FeedbackReportGenerator"):
        self.name = name

    def generate_feedback(self, conversation_logs):
        """
        Generate a feedback report based on conversation logs.

        Args:
            conversation_logs (list): List of messages exchanged during the conversation.

        Returns:
            dict: Contains the feedback report summary and detailed analysis.
        """
        # Verify the structure of conversation logs
        print("\nDEBUG: Conversation Logs Passed to Feedback Generator:\n", conversation_logs)
        
        # Format logs into a readable format for the LLM
        formatted_logs = "\n".join(
            [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_logs]
        )
        
        # Input prompt for the LLM
        input_text = (
            f"Analyze the following 911 dispatcher conversation logs:\n\n{formatted_logs}\n\n"
            "Provide a detailed feedback report with:\n"
            "- Positive aspects.\n"
            "- Areas for improvement.\n"
            "- Specific examples from the conversation.\n"
            "- Suggestions for improvement."
        )
        system_message = "You are an expert trainer analyzing 911 dispatcher conversations."

        # Generate feedback report using the LLM
        try:
            feedback_report = ask_LLM(input_text=input_text, system_message=system_message)
            return {"feedback_report": feedback_report}
        except Exception as e:
            print(f"Error in FeedbackReportGenerator: {e}")
            return {"feedback_report": "An error occurred while generating feedback."}
