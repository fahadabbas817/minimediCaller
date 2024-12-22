from agents.trainer_agent import TrainerAgent
from agents.human_bot_agent import HumanBotAgent
from agents.feedback_report_agent import FeedbackReportGenerator

# Initialize agents
trainer_agent = TrainerAgent()
human_bot_agent = HumanBotAgent()
feedback_generator = FeedbackReportGenerator()

# Step 1: Generate a scenario prompt
feedback_reports = [{"session_id": 1, "issues": ["slow response time", "missed protocol steps"]}]
scenario_request = trainer_agent.process_request(feedback_reports)
scenario_prompt = scenario_request["scenario_prompt"]

print("Scenario:", scenario_prompt)

# Step 2: Start the conversation
print("\nStarting conversation...\n")
print("Bot:", human_bot_agent.initialize_conversation(scenario_prompt))

# Step 3: Engage in conversation
while True:
    user_input = input("Distressed Caller: ")
    if user_input.lower() in ["quit", "exit"]:
        print("\nEnding conversation...\n")
        break

    bot_response = human_bot_agent.get_bot_response(user_input)
    print("Bot:", bot_response)

# Step 4: Retrieve full conversation logs
conversation_logs = human_bot_agent.get_conversation_logs()


# Debug logs before sending to feedback generator
print("\nDEBUG: Conversation Logs Before Feedback Generation:\n", conversation_logs)

# Generate feedback report
feedback_report = feedback_generator.generate_feedback(conversation_logs)

# Display feedback report
print("\nFeedback Report:\n")
print(feedback_report["feedback_report"])
