from pprint import pformat

from agents.trainer_agent import TrainerAgent
from agents.human_bot_agent import HumanBotAgent
from agents.feedback_report_agent import FeedbackReportGenerator
from services.sql_connection import sql_connect

conn = sql_connect()
cursor = conn.cursor()

# Initialize agents
trainer_agent = TrainerAgent()
human_bot_agent = HumanBotAgent()
feedback_generator = FeedbackReportGenerator()

# Step 1: Generate a scenario prompt
# feedback_reports = [{"session_id": 1, "issues": ["slow response time", "missed protocol steps"]}]
email = "new@gmail.com"
cursor.execute("SELECT feedback_generated FROM metadata WHERE email = ?", (email,))
result = cursor.fetchone()
if result:
    feedback_reports = result[0]  # Assuming feedback_generated is the first column in the SELECT query
else:
    feedback_reports = None  # Handle case where no record is found

# Use the feedback_reports variable in your code
scenario_request = trainer_agent.process_request(emergency_type="Road rage accident", feedback_reports=feedback_reports)
scenario_prompt = scenario_request["scenario_prompt"]

print("Scenario:", scenario_prompt)

# Step 2: Start the conversation
print("\nStarting conversation...\n")
print("Bot:", human_bot_agent.initialize_conversation(scenario_prompt))

# Step 3: Engage in conversation
while True:
    user_input = input("Dispatcher: ")
    if user_input.lower() in ["quit", "exit", "bye"]:
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

insert_query = """
INSERT INTO metadata (email, conversation_logs, feedback_generated)
VALUES (?, ?, ?);
"""
cursor.execute(insert_query, (email, str(conversation_logs), str(feedback_report)))
conn.commit()
print("Data inserted successfully.")

# Display feedback report
print("\nFeedback Report:\n")
print(feedback_report["feedback_report"])