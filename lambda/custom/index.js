/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

const Alexa = require('ask-sdk');

const SKILL_NAME = 'baby word of the day';
const FALLBACK_MESSAGE = "The ${SKILL_NAME} skill can't help you with that. Would you like a new baby word of the day or would you like to quit?";
const FALLBACK_REPROMPT = 'Say yes for a new baby word or no to quit.';


//DONE 8/29/2018 - Ask for baby's birthday so we can judge what words to use
//DONE 8/29/2018 - If they so no, we need to save this and never ask again
//DONE 8/29/2018 - If they say yes we need to store the date
//DONE 8/29/2018 - exit, thanks for playing

//DONE 8/30/2018 - give the baby word
//DONE 8/30/2018 - word with description
//DONE 8/30/2018 - Word in a sentence

//DONE 8/30/2018 - count how many baby words
//TODO - Intent for how many baby words has been completed
//TODO - come up with a way to know which baby words have already be complete.
const WORD = 0
const DESC = 1
const SEN  = 2
//[Baby word, description, sentence]
const babyInfo = [
  ["banana.", "A banana is yellow fruit that grows on a tree.", "The monkey climbed the tree to pick the banana for lunch."],
  ["banana", "A yellow fruit that grows on a tree", "The monkey climbed the tree to pick the banana for lunch."]
]

async function saveAttributes(attributesManager){
  await attributesManager.savePersistentAttributes();
}

function getBabyResponse(sessionAttributes, attributesManager, responseBuilder){
  
  if(!sessionAttributes.birthdateStored){
    const i = Math.floor(Math.random() * babyInfo.length)
    console.log(babyInfo + " i" + i)
    const speechOutput = "Baby word of the day is " + babyInfo[i][WORD] + " The description is, " + babyInfo[i][DESC] + " Here is how you use it in a sentence " + babyInfo[i][SEN]     
    sessionAttributes.wordsPlayed += 1
    attributesManager.setPersistentAttributes(sessionAttributes);
    saveAttributes(attributesManager)

    return responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
  //TODO pick word based on age
  else{
    sessionAttributes.wordsPlayed += 1
    attributesManager.setPersistentAttributes(sessionAttributes);
    saveAttributes(attributesManager)
    
    const i = Math.floor(Math.random() * babyInfo.length)
    console.log(babyInfo + " i" + i)
    const speechOutput = "Baby word of the day is " + babyInfo[i][WORD] + " The description is, " + babyInfo[i][DESC] + " Here is how you use it in a sentence " + babyInfo[i][SEN]     
    
    return responseBuilder
      .speak(speechOutput)
      .getResponse();
  }

}

const LaunchRequest = {
  canHandle(handlerInput) {
    console.log( "CHecking for LaunchRequest Intent")
    // launch requests as well as any new session, as games are not saved in progress, which makes
    // no one shots a reasonable idea except for help, and the welcome message provides some help.
    return handlerInput.requestEnvelope.session.new || handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const sessionAttributes = await attributesManager.getPersistentAttributes() || {};
    if (Object.keys(sessionAttributes).length === 0) {
      sessionAttributes.endedSessionCount = 0;
      sessionAttributes.wordsPlayed = 0;
      sessionAttributes.gameState = 'ENDED';
      sessionAttributes.birthdate = "YYYY-MM-DD";
      sessionAttributes.birthdateStored = false;
      sessionAttributes.requestedNotToEnterBirthdate = false;
    }

    attributesManager.setSessionAttributes(sessionAttributes);

    var speechOutput = ''
    var reprompt = '';
    if(sessionAttributes.birthdateStored){
      return getBabyResponse(sessionAttributes, attributesManager, responseBuilder)
    }
    else if(!sessionAttributes.birthdateStored && !sessionAttributes.requestedNotToEnterBirthdate){
      speechOutput = "Welcome to Baby Word of the day. To pick the best words we request the babys birthday. Would you like to enter in the birthdate?"
      sessionAttributes.gameState = "ASK_BIRTHDATE"
      reprompt = 'Say yes to enter birthday or no get the baby word of the day.';
      return responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
    }else{
      return getBabyResponse(sessionAttributes, attributesManager, responseBuilder)
    }
    
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Thanks for playing!')
      .getResponse();
  },
};

const SessionEndedRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const HelpIntent = {
  canHandle(handlerInput) {
    console.log( "CHecking for Help Intent")
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechOutput = 'Would you like another baby word or would you like to know how many words you have heard or would you like to set the birthdate?';
    const reprompt = 'Would you like another baby word?';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const YesIntent = {
  canHandle(handlerInput) {
    console.log( "CHecking for Yes Intent")
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if(sessionAttributes.gameState == "ASK_BIRTHDATE"){
      return responseBuilder
      .speak('Whats your babys birthdate?')
      .reprompt('Whats the birthdate?')
      .getResponse();
    }else{
      return getBabyResponse(sessionAttributes, attributesManager, responseBuilder)
    }

    return responseBuilder
      .speak('')
      .reprompt('')
      .getResponse();
  },
};

const NoIntent = {
  canHandle(handlerInput) {
    console.log( "CHecking for No Intent")
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if(sessionAttributes.gameState == "ASK_BIRTHDATE"){
      sessionAttributes.requestedNotToEnterBirthdate  = true
      sessionAttributes.gameState == "NEW_BABY_WORD"
      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();

      return getBabyResponse(sessionAttributes, attributesManager, responseBuilder)
    }else{
      sessionAttributes.endedSessionCount += 1;
      sessionAttributes.gameState = 'ENDED';
      attributesManager.setPersistentAttributes(sessionAttributes);

      await attributesManager.savePersistentAttributes();

      return responseBuilder
      .speak('Ok, thanks for playing!')
      .getResponse();
    }
  },
};

const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    const outputSpeech = 'Say yes for a new word, or no to end the game.';
    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(outputSpeech)
      .getResponse();
  },
};

const BirthdateEnter = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log( "CHecking for BirthdayEnter")
    return request.type === 'IntentRequest' && request.intent.name === 'BirthdateEnter'
  },
  async handle(handlerInput){
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = attributesManager.getSessionAttributes();
    console.log("Get attributes")
    sessionAttributes.birthdateStored = true
    sessionAttributes.birthdate = handlerInput.requestEnvelope.request.intent.slots.birthdate.value
    sessionAttributes.gameState == "NEW_BABY_WORD"
    console.log("Updated session attributes & set birthdate")
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
    
    return getBabyResponse(sessionAttributes, attributesManager, responseBuilder)

  }
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    // handle fallback intent, yes and no when playing a game
    // for yes and no, will only get here if and not caught by the normal intent handler
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.FallbackIntent' ||
       request.intent.name === 'AMAZON.YesIntent' ||
       request.intent.name === 'AMAZON.NoIntent');
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    ExitHandler,
    SessionEndedRequest,
    HelpIntent,
    YesIntent,
    NoIntent,
    BirthdateEnter,
    FallbackHandler,
    UnhandledIntent,
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('Baby-Word-Of-The-Day')
  .withAutoCreateTable(true)
  .lambda();
