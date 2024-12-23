from utility.llm import ask_LLM

# You can define the core dispatcher skills here, at the top level:
core_dispatcher_skills = [
    "Situation Assessment & Triage",
    "Location Confirmation",
    "Communication Skills",
    "Protocol Adherence & Checklist Usage",
    "Time Management & Prioritization",
    "Emotional Intelligence & Caller Management",
    "Technical Proficiency",
    "Adaptive Thinking & Scenario Flexibility",
    "Stress Management",
    "Continuous Feedback & Improvement"
]

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
        print("\nDEBUG: Conversation Logs Passed to Feedback Generator:\n", conversation_logs)
        
        # Format logs into a readable format for the LLM
        formatted_logs = "\n".join(
            [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_logs]
        )

        # Build a string that includes the core dispatcher skills
        skills_text = "\n".join([f"- {skill}" for skill in core_dispatcher_skills])

        # Incorporate the core dispatcher skills into the LLM prompt
        input_text = (
            "Analyze the following 911 dispatcher conversation logs:\n\n"
            f"{formatted_logs}\n\n"
            "You are an expert trainer and must provide a rigorous feedback report, focusing on:\n"
            "1. Positive aspects of how the dispatcher handled the call.\n"
            "2. Critical steps or questions that were missed (location, phone number, victim's condition).\n"
            "3. Communication and empathy: how did the dispatcher handle the caller's emotional state?\n"
            "4. Specific examples with direct quotes from the logs (if available).\n"
            "5. Concrete improvement suggestions, including recommended phrases or actions.\n"
            "6. Overall performance rating (on a scale of 1 to 10, with reasoning).\n\n"
            "Additionally, evaluate the dispatcher’s performance in each of the following skill areas:\n"
            f"{skills_text}\n\n"
            "Ensure you:\n"
            "- Cite at least two direct quotes from the conversation.\n"
            "- Explain why each missed step is important in real emergencies.\n"
            "- Provide at least two areas the dispatcher excelled at.\n"
            "Use specific references to the conversation logs wherever possible."
        )

        system_message = "You are an expert trainer analyzing 911 dispatcher conversations."

        # Generate feedback report using the LLM
        try:
            feedback_report = ask_LLM(input_text=input_text, system_message=system_message)
            return {"feedback_report": feedback_report}
        except Exception as e:
            print(f"Error in FeedbackReportGenerator: {e}")
            return {"feedback_report": "An error occurred while generating feedback."}
