# Baby Word of the Day - Alexa Skill
This is a tutorial on how to create a simple Alexa 

#Pre-Requests
* Node.js (> v4.3)
* Register for an AWS Account
* Register for an Amazon Developer Account
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

# Steps for setting up Environment for Alexa skills
1. Request Visual Studio Code from [MyTec](https://mytech.ge.com/products-and-services/software/detail?id=12520&type=Windows&source=visual%20studio%20code)
2. Download & Install [Visual Studio Code](https://code.visualstudio.com/docs/?dv=win)
3. Request Node.JS from [MyTec](https://mytech.ge.com/products-and-services/software/detail?id=11946&type=Windows&source=node.js)
4. Install [Node.JS](https://nodejs.org/en/download/)
5. Sign up with Amazon web services account: [Link](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)
6. Sign up for an Amazon developer account: [Link](https://www.amazon.com/ap/register?openid.pape.max_auth_age=1&openid.return_to=https%3A%2F%2Fdeveloper.amazon.com%2Fap_login%2F68747470733A2F2F646576656C6F7065722E616D617A6F6E2E636F6D2F686F6D652E68746D6C.html&prevRID=HF6T96GCBJW1BYHNRNMH&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=mas_dev_portal&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=amzn_developer_portal&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0)
7. Set proxies by typing: 
  - "npm config https_proxy http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80"
  - "npm config proxy http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80"
  - "npm config https-proxy http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80"
7. Install Amazon web command from console "npm install -g ask-cli"
8. Tutorial on setting up credentials for AWS: [Link](https://developer.amazon.com/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html)
9. Initialize the Amazon command line  "ask init" Here is where we will take the Access key and Secret key from step 5. This allows us to deploy to the lambda functions from the CLI
10. We can create a default project by typing [ask new -n "baby word of the day"]
11. We can set up with a template by typing [ask new --template -n "ge tutorial"] This will give a list of different templates you can choose from
12. If you clone this project you will need to go lambda/custom and in the command line run "npm install". This pulls in all the dependent packages defined in package.json

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
* During game play we can create session attributes. These can be used to keep game states. This requires the use of DynamoDB from Amazon web services
* Here is a good link overview of an intent:[Link](https://youtu.be/ymixpC53c-s)

# Deploying your skill
Once you are ready to push your skill to the cloud, from the command line type "ask deploy". This will package up all your files in a zip, and push it the cloud. It will also update your lambda function.

If you are using stored attributes to save data between sessions make sure you do the next step:
Once deployed, additional permissions need to be added to the AWS IAM role being used by the skill since it is persisting data in Amazon DynamoDB.  Navigate to the [AWS IAM console](https://console.aws.amazon.com/iam/home#/roles).

> _Note: We are adding the full access policy here for convenience.  For a production skill, you should use a more targeted policy restricting access to just the required resources.  Refer to the [DynamoDB documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/access-control-overview.html) for more details._

1. Locate the role for your skill (by default, it is named ```ask-lambda-<your skill name>```).
1. Click on the role, then click **Attach Policy**.
1. Search for **AmazonDynamoDBFullAccess** and click the check box next to it.
1. Click **Attach Policy**.

# Testing your skill
After you have deployed your skill, you can go do your [Alexa developer console](https://developer.amazon.com/alexa/console/ask), select skill, and then go to the Test tab. Here you can type or speak using a microphone to test you skill. You can also use the ask CLI interface you can do this by using [ask simulate -l en-US -t "Open of baby word of the day"] 

# Debugging your skill
This can be a little tricky to debug your alexa skill since its not obvious to where the console it. In Testing your skill section we talked about feeding input into your app and there is a small amount of return info but probably not enough. The easiest way I found is to drop console.log's into your code, run the simulator, and then read the logs after it has been tested. You can find the logs on [Amazon Web Services CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)
