from utility.llm import ask_LLM


class TrainerAgent:
    def __init__(self, name="TrainerAgent"):
        self.name = name

    def process_request(self,emergency_type, feedback_reports=None): # input: emergency type
        """
        Generate a scenario prompt based on feedback reports.

        Args:
            feedback_reports (list): List of feedback summaries from previous sessions.

        Returns:
            dict: Contains the generated scenario prompt.
        """
        # system_message = "You are a training agent for 911 dispatchers. Your task is to generate a prompt for a large language model giving him the role of distressed caller who is calling 911 for help."

        system_message = (
            "You are a senior 911 training coordinator tasked with generating highly realistic, "
            "challenging 911 call scenarios for dispatcher practice. You must incorporate common "
            "dispatcher mistakes from past sessions into new scenarios to ensure continuous "
            "improvement."
        )

        if feedback_reports:
            # Create a summary of feedback reports
            # feedback_summary = "\n".join([f"Session {r['session_id']}: {', '.join(r['issues'])}" for r in feedback_reports])
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios. Consider these issues done by dispatchers from past sessions:\n{feedback_summary}"
            input_text = f"""
                Generate a new, detailed 911 call scenario for emergency {emergency_type} that addresses these common mistakes:
                - {feedback_reports}

                ## Scenario Requirements:
                1. The caller is in a realistic setting with potential obstacles (e.g., loud background noise, limited English proficiency, or emotional distress).
                2. The scenario must highlight the importance of verifying location details (address, caller's phone number) early in the call.
                3. The caller should exhibit panic or confusion, making the interaction more challenging.
                4. Include a medical or emergency condition (like choking, chest pain, or unconsciousness) that requires the dispatcher to ask follow-up questions.
                5. Provide enough contextual detail (time of day, environment, background events) that the trainee understands the urgency and complexity.

                Remember to address issues discovered in previous feedback sessions:
                {feedback_reports}

                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario: str | A short, **2-3 paragraph** narrative describing the setting, the caller's emotional state, address and the situation that prompts the call"

                """
        
        else:

            # Use LLM to create a scenario prompt
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios."
            input_text = f"""
                Generate a new, detailed 911 call scenario for emergency {emergency_type}.

                ## Scenario Requirements:
                1. The caller is in a realistic setting with potential obstacles (e.g., loud background noise, limited English proficiency, or emotional distress).
                2. The scenario must highlight the importance of verifying location details (address(important to mention), caller's phone number) early in the call.
                3. The caller should exhibit panic or confusion, making the interaction more challenging.
                4. Include a medical or emergency condition (like choking, chest pain, or unconsciousness) that requires the dispatcher to ask follow-up questions.
                5. Provide enough contextual detail (time of day, environment, background events) that the trainee understands the urgency and complexity.

                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario: str | A short, **2-3 paragraph** narrative describing the setting, the caller's emotional state, address and the situation that prompts the call"

                """

        scenario_prompt = ask_LLM(input_text=input_text, system_message=system_message, temperature=0.5)

        return {"scenario_prompt": scenario_prompt}
