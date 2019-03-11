# Baby Word of the Day - Alexa Skill
This is a tutorial on how to create a simple Alexa using all within the web browser

# Pre-Requests
* Register for an AWS Account
* Register for an Amazon Developer Account

# Breaking down components to an Alexa skill
An alexa skill is made up of the following components
1. Skill Invocation Name - what the user will call to open up skill
1. Intents - How user interacts
1. Slots - Passing info in interactions

## Intents
* Basically how to handle the actions a user would require for the skill.
* Alexa has basic intents that be used to help build the skill. Examples would be; Help, Stop, Cancel 
* Each intent has an utterance. Utterance is a phrase that the user would say to invoke the intents 
* Minimum must support LaunchRequest, IntentRequest, SessionEndRequest
* Intents get define in the interaction model and the details are implemented in the code
* During game play we can create session attributes. These can be used to keep game states. This requires the use of DynamoDB from Amazon web services
* Here is a good link overview of an intent:[Link](https://youtu.be/ymixpC53c-s)

## Slots
* Slots - Sometimes there will be utterances that you might want to capture a word in order to do any lookups. For example, if you were to want to know the weather at a certain location. The utterance could be "tell me the weather in St.Pete". We use slots for this and the utterance would look like "tell me the weather in {city}". We define what type this slot would be and in this case it would be a AMAZON.US_CITY
If there is not a predefined slot we can create our own or use AMAZON.LITERAL. Or we can create our own type where we define the slot kind which is recommended. There is a lot of different slot types: https://developer.amazon.com/docs/custom-skills/slot-type-reference.html

Quick video going over a skill [Link](https://youtu.be/1pvR4aqwGhg)

# Backend code
<TODO>

# Setup for stored attributes(persistent data) 
If you are using stored attributes to save data between sessions make sure you do the next step:
Once deployed, additional permissions need to be added to the AWS IAM role being used by the skill since it is persisting data in Amazon DynamoDB.  Navigate to the [AWS IAM console](https://console.aws.amazon.com/iam/home#/roles).

> _Note: We are adding the full access policy here for convenience.  For a production skill, you should use a more targeted policy restricting access to just the required resources.  Refer to the [DynamoDB documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/access-control-overview.html) for more details._

1. Locate the role for your skill (by default, it is named ```ask-lambda-<your skill name>```).
1. Click on the role, then click **Attach Policy**.
1. Search for **AmazonDynamoDBFullAccess** and click the check box next to it.
1. Click **Attach Policy**.

# Testing your skill
After you have deployed your skill, you can go do your [Alexa developer console](https://developer.amazon.com/alexa/console/ask), select skill, and then go to the Test tab. Here you can type or speak using a microphone to test you skill. 

# Debugging your skill
This can be a little tricky to debug your alexa skill since its not obvious to where the console it. In Testing your skill section we talked about feeding input into your app and there is a small amount of return info but probably not enough. The easiest way I found is to drop console.log's into your code, run the simulator, and then read the logs after it has been tested. You can find the logs on [Amazon Web Services CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)
