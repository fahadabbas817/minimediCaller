from utility.llm import ask_LLM

class TrainerAgent:
    def __init__(self, name="TrainerAgent"):
        self.name = name

    def process_request(self, feedback_reports):
        """
        Generate a scenario prompt based on feedback reports.

        Args:
            feedback_reports (list): List of feedback summaries from previous sessions.

        Returns:
            dict: Contains the generated scenario prompt.
        """
        # Create a summary of feedback reports
        feedback_summary = "\n".join([f"Session {r['session_id']}: {', '.join(r['issues'])}" for r in feedback_reports])

        # Use LLM to create a scenario prompt
        system_message = "You are a training agent for 911 dispatchers. Your task is to generate a prompt for a large language model giving him the role of distressed caller who is calling 911 for help."
        input_text = f"Generate a realistic 911 call scenario. Consider these issues from past sessions:\n{feedback_summary}"

        scenario_prompt = ask_LLM(input_text=input_text, system_message=system_message)

        return {"scenario_prompt": scenario_prompt}
