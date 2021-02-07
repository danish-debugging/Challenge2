 
const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();
let day = 0;



function addHumanText(text) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  chatContainer.appendChild(chatBox);
  return chatContainer;
}

function addBotText(text) {
  const chatContainer1 = document.createElement("div");
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("darker");
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "Sorry, I did not understand that.";
    if(message.includes('who are you' || "What's Your Name")){
       speech.text = "Hello, I am Savy, Greetings from HexTech";
    }
    if (message.includes('how are you')) 
    {
      speech.text = "I am fine, Thanks.";
    }
     if(message.includes('What are you doing in response for covid19' || 'What\'s your top priority')){
       speech.text = "Our priority is to safeguard senoior-citizens and frontline workers in the pandemic"
     }

    if (message.includes('fine')) {
      speech.text = "Nice to hear that. How can I assist you today?";
    }
     if(message.includes('thank you' || 'thank you so much')){
       speech.text = "You are Most welcome";
     }
     if (message.includes('book an appointment' || 'please book an appointment' || 'Can you Book an Appointment'))
     {
      let month = monthFunc();
      let s = "Sure, Please tell me the date of your availability in "+month +" Note - start with only number like \" 8 or 25 \"";
        console.log(month);
         speech.text = s;
     } 
     if (!(isNaN(message)))
     {
       day = parseInt(message);
      if(checkDate(parseInt(message)))
      {
        speech.text = "Appointment on "+message+" " +monthFunc() +" Also, Please tell me your time Note - speak with this format like \"11 hours 30 minutes\"";
      }
     }
     if (is_timeString(message))
     {
      speech.text = "Appointment Confirmed on " +day+"th of "+monthFunc()+" at "+message ; 
     }


     


    speech.volume = 1.3;
    speech.rate = 1.0;
    speech.pitch = 1.0;
    window.speechSynthesis.speak(speech);
    var element = document.getElementById("container");
    element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log('Voice activated');
};

let monthFunc = () => { 
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var d = new Date();
  var n = month[d.getMonth()];
  return n;
};

function is_timeString(str)
{
 regexp = /^(2[0-3]|[01]?[0-9]) hours ([0-5]?[0-9]) minutes$/;
  
  if (regexp.test(str))
  {
      return true;
  }
  else
  {
    return false;
  }
}

let checkDate = (number) => {
var d = new Date();
current = d.getDate();
return (number>current)?true:false;
};

recorder.onresult = (event) => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  var element = document.getElementById("container");
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

voice.addEventListener('click', () =>{
  recorder.start();
  console.log("Activated")
});