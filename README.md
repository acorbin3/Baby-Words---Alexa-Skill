# Baby Word of the Day - Alexa Skill
This is a tutorial on how to create a simple Alexa 

# Steps for setting up Environment for Alexa skills
1. Download & Install Visual Studio Code: https://code.visualstudio.com/docs/?dv=win
2. Install nodejs: https://nodejs.org/en/download/
3. Sign up with Amazon web services account: [Link](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)
4. Sign up for an Amazon developer account: [Link](https://www.amazon.com/ap/register?openid.pape.max_auth_age=1&openid.return_to=https%3A%2F%2Fdeveloper.amazon.com%2Fap_login%2F68747470733A2F2F646576656C6F7065722E616D617A6F6E2E636F6D2F686F6D652E68746D6C.html&prevRID=HF6T96GCBJW1BYHNRNMH&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=mas_dev_portal&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=amzn_developer_portal&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0)
5. Tutorial on setting up credentials for AWS: [Link](https://developer.amazon.com/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html)
6. Install Amazon web command from console "npm install -g ask-cli"
7. Initialize the Amazon command line  "ask init" Here is where we will take the Access key and Secret key from step 5. This allows us to deploy to the lambda functions from the CLI
8. We can create a default project by typing [ask new -n "baby word of the day"]
9. We can set up with a template by typing [ask new --template -n "ge tutorial"] This will give a list of different templates you can choose from

# Breaking down components to an Alexa skill
## Models
* JSON model used to define the skill invocation name, all the intents(user interactions), and utterances 
* Utterance is a phrase that the user would say to invoke the intents 
* Slots - Sometimes there will be utterances that you might want to capture a word in order to do any lookups. For example, if you were to want to know the weather at a certain location. The utterance could be "tell me the weather in St.Pete". We use slots for this and the utterance would look like "tell me the weather in {city}". We define what type this slot would be and in this case it would be a AMAZON.US_CITY
If there is not a predefined slot we can create our own or use AMAZON.LITERAL. Or we can create our own type where we define the slot kind which is recommended. There is a lot of different slot types: https://developer.amazon.com/docs/custom-skills/slot-type-reference.html

## Intents
* Basically how to handle the actions a user would require for the skill.
* Alexa has basic intents that be used to help build the skill. Examples would be; Help, Yes, No,  
* Minimum must support LaunchRequest, IntentRequest, SessionEndRequest
* Intents get define in the code
* During game play we can create session attributes. These can be used to keep game states
* Here is a good link overview of an intent:[Link](https://youtu.be/ymixpC53c-s)