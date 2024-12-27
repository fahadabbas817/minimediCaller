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

        # system_message = (
        #     "You are a senior 911 training coordinator tasked with generating highly realistic, "
        #     "challenging 911 call scenarios for dispatcher practice. You must incorporate common "
        #     "dispatcher mistakes from past sessions into new scenarios to ensure continuous "
        #     "improvement."
        # )
        system_message = (
            "You are an expert training agent for 911 dispatchers. Your role is to create realistic and challenging training scenarios "
            "for a large language model that will simulate distressed callers in emergency situations. The generated scenarios should "
            "be detailed and incorporate feedback from previous training sessions to address areas where dispatchers need improvement. "
            "Focus on crafting scenarios with enough complexity to test the trainee's ability to handle difficult callers, gather critical "
            "information efficiently, and respond effectively under pressure. Emphasize verifying location details and handling emotional distress."
        )

        if feedback_reports:
            # Create a summary of feedback reports
            # feedback_summary = "\n".join([f"Session {r['session_id']}: {', '.join(r['issues'])}" for r in feedback_reports])
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios. Consider these issues done by dispatchers from past sessions:\n{feedback_summary}"
            input_text = f"""
                Generate a realistic and detailed 911 call scenario for the "{emergency_type}" type of emergency based on the following past feedback:
                - {feedback_reports}

                ## Scenario Requirements:
                1. The caller is a MALE CALLER who is in a realistic setting with potential challenges (e.g., loud background noise, language barriers, or emotional distress).
                2. The scenario emphasizes the importance of verifying location details (address, caller's phone number) early in the call.
                3. The caller exhibits signs of panic, confusion, or distress, adding complexity to the interaction.
                4. The situation involves a critical medical or emergency condition (e.g., choking, severe injury, fire, or unconsciousness) requiring the dispatcher to ask clarifying follow-up questions.
                5. Include rich contextual details (e.g., time of day, environment, weather, background events) to enhance the trainee's understanding of urgency and complexity.

                ## Past Feedback Integration:
                - Focus on addressing issues identified in previous feedback sessions to highlight specific improvement areas for the dispatcher:
                {feedback_reports}

                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario: str | A short, crisp and precise, narrative describing the incident or accident or emergency or the situation that prompts the call."

                """

        
        else:

            # Use LLM to create a scenario prompt
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios."
            input_text = f"""
                Generate a realistic and detailed 911 call scenario for the "{emergency_type}" type of emergency.

                ## Scenario Requirements:
                1. The caller is in a realistic setting with potential challenges (e.g., loud background noise, language barriers, or emotional distress).
                2. The scenario emphasizes the importance of verifying location details (address, caller's phone number) early in the call.
                3. The caller exhibits signs of panic, confusion, or distress, adding complexity to the interaction.
                4. The situation involves a critical medical or emergency condition (e.g., choking, severe injury, fire, or unconsciousness) requiring the dispatcher to ask clarifying follow-up questions.
                5. Include rich contextual details (e.g., time of day, environment, weather, background events) to enhance the trainee's understanding of urgency and complexity.


                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario: str | A short, crisp and precise, narrative describing the incident or accident or emergency or the situation that prompts the call."

                """

        scenario_prompt = ask_LLM(input_text=input_text, system_message=system_message, temperature=0.7)

        return {"scenario_prompt": scenario_prompt}
