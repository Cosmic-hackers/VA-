document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        speak("Hello, I am Omnix, your virtual assistant created by Siddu. How can I assist you today?");
    }, 1000); // Introduces itself 1 second after page loads
});

function speak(text) {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "en-US"; // Ensure it speaks in English
    window.speechSynthesis.speak(speech);
}

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let listeningText = document.querySelector("#listening");

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onstart = () => {
    listeningText.style.display = "block"; // Show "Listening..."
    btn.style.display = "none"; // Hide the button
};

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.toLowerCase().trim();
    
    listeningText.style.display = "none"; // Hide "Listening..." text
    btn.style.display = "flex"; // Show the button back
    
    // **Update Button Text to Display the Spoken Message**
    btn.innerText = transcript;  

    takeCommand(transcript);
};

// Start recognition on button click
btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, how can I assist you today?");
    } else if (message.includes("who are you")) {
        speak("I am Omnix, your virtual assistant created by Siddu. I can help you with various tasks.");
    } else if (message.includes("how are you")) {
        speak("I'm doing great, thank you for asking! How can I assist you?");
    } else if (message.includes("what can you do")) {
        speak("I can help you with reminders, alarms, battery status, and general queries.");
    } 
 else if (message.includes("what can you do")) {
            speak("I can open websites, search for information, provide news updates, assist with tech queries, set alarms, and much more. Just ask!");
        } else if (message.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://youtube.com", "_blank");
        } else if (message.includes("search youtube for")) {
            let query = message.replace("search youtube for", "").trim();
            speak(`Searching YouTube for ${query}...`);
            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        } else if (message.includes("what is the time")) {
            let currentTime = new Date().toLocaleTimeString();
            speak(`The current time is ${currentTime}`);
        } else if (message.includes("what is the date")) {
            let currentDate = new Date().toLocaleDateString();
            speak(`Today's date is ${currentDate}`);
        } else if (message.includes("open google")) {
            speak("Opening Google...");
            window.open("https://google.com", "_blank");
        } else if (message.includes("search google for")) {
            let query = message.replace("search google for", "").trim();
            speak(`Searching Google for ${query}...`);
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        } else if (message.includes("tell me a joke")) {
            speak("Why don't scientists trust atoms? Because they make up everything!");
        } else if (message.includes("inspire me")) {
            speak("The only way to do great work is to love what you do. - Steve Jobs");
        } else if (message.includes("open cnn")) {
        speak("Opening CNN...");
        window.open("https://cnn.com", "_blank");
    } else if (message.includes("what is the weather")) {
        speak("Fetching weather info...");
        window.open("https://weather.com", "_blank");
    } else if (message.includes("tell me a joke")) {
        speak("Why don't scientists trust atoms? Because they make up everything!");
    } else if (message.includes("inspire me")) {
        speak("The only way to do great work is to love what you do. - Steve Jobs");
    } else if (message.includes("top animes") || message.includes("anime")) {
        speak("Fetching the list of top animes...");
        window.open("https://www.imdb.com/search/title/?genres=animation", "_blank");
    } else if (message.includes("who created you")) {
        speak("I was created by Siddu, a tech enthusiast and developer.");
    } else if (message.includes("who is the founder of cosmos")) {
        speak("The founder of Cosmoss is the one and only, Siddu.");
    } else if (message.includes("search news for")) {
        let query = message.replace("search news for", "").trim();
        speak(`Searching news for ${query}...`);
        window.open(`https://www.google.com/search?q=${query}+news`, "_blank");
    } else if (message.includes("search tech for")) {
        let query = message.replace("search tech for", "").trim();
        speak(`Searching tech news for ${query}...`);
        window.open(`https://www.google.com/search?q=${query}+tech`, "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com", "_blank");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter...");
        window.open("https://twitter.com", "_blank");
    } 
    else if (message.includes("best anime to watch")) {
        speak("Some of the best anime to watch are Attack on Titan, One Piece, Jujutsu Kaisen, Demon Slayer, and Fullmetal Alchemist Brotherhood.");
    }
    else if (message.includes("best romance anime")) {
        speak("Some of the best romance anime are Clannad, Your Lie in April, Toradora, Kimi no Na wa, and Horimiya.");
    }
    else if (message.includes("best action anime")) {
        speak("Top action anime include One Piece, Attack on Titan, Jujutsu Kaisen, Hunter x Hunter, and My Hero Academia.");
    }
    else if (message.includes("anime websites")) {
        speak("Popular anime streaming websites are Crunchyroll, Funimation, 9Anime, Gogoanime, and Netflix. Do you want me to open one?");
    }


    else if (message.match(/\b(who\s+is\s+naruto|what\s+is\s+naruto|how\s+is\s+naruto|tell\s+me\s+about\s+naruto|explain\s+naruto|describe\s+naruto)\b/i)) {
        speak("Naruto is a legendary anime following Naruto Uzumaki, a young ninja seeking recognition and aiming to become Hokage. Would you like to know about the Akatsuki, Jutsu, or Naruto's friends?");
    }
    
    else if (message.match(/\b(who\s+is\s+sasuke|what\s+is\s+sasuke|how\s+is\s+sasuke|tell\s+me\s+about\s+sasuke|explain\s+sasuke|describe\s+sasuke)\b/i)) {
        speak("Sasuke Uchiha is one of the last surviving members of the Uchiha clan. He seeks revenge against his brother, Itachi, and later becomes Naruto's rival. Do you want to hear about his Sharingan abilities?");
    }
    
    else if (message.match(/\b(who\s+is\s+one\s+piece|what\s+is\s+one\s+piece|how\s+is\s+one\s+piece|tell\s+me\s+about\s+one\s+piece|explain\s+one\s+piece|describe\s+one\s+piece)\b/i)) {
        speak("One Piece follows Monkey D. Luffy and his crew in search of the legendary One Piece treasure. Would you like to know about Luffy’s Devil Fruit or the Yonko?");
    }
    
    else if (message.match(/\b(who\s+is\s+eren|what\s+is\s+eren|how\s+is\s+eren|tell\s+me\s+about\s+eren|explain\s+eren|describe\s+eren)\b/i)) {
        speak("Attack on Titan is about Eren Yeager and his fight against the Titans threatening humanity. Do you want to know about the Titans or the Survey Corps?");
    }
    
    else if (message.match(/\b(who\s+is\s+light\s+yagami|what\s+is\s+death\s+note|how\s+is\s+death\s+note|tell\s+me\s+about\s+death\s+note|explain\s+death\s+note|describe\s+death\s+note)\b/i)) {
        speak("Death Note follows Light Yagami, who finds a notebook that lets him kill anyone by writing their name in it. Do you want to know about the Shinigami, L, or Kira?");
    }
    
    else if (message.match(/\b(who\s+is\s+tanjiro|what\s+is\s+tanjiro|how\s+is\s+tanjiro|tell\s+me\s+about\s+tanjiro|explain\s+tanjiro|describe\s+tanjiro)\b/i)) {
        speak("Demon Slayer follows Tanjiro Kamado, a young swordsman fighting demons to avenge his family. Would you like to know about the Hashira or the breathing techniques?");
    }
    
    else if (message.match(/\b(who\s+is\s+yuji|what\s+is\s+jujutsu\s+kaisen|how\s+is\s+jujutsu\s+kaisen|tell\s+me\s+about\s+jujutsu\s+kaisen|explain\s+jujutsu\s+kaisen|describe\s+jujutsu\s+kaisen)\b/i)) {
        speak("Jujutsu Kaisen follows Yuji Itadori as he joins the Tokyo Jujutsu High to battle cursed spirits. Want to learn about Gojo Satoru, Sukuna, or the Jujutsu techniques?");
    }
    
    else if (message.match(/\b(who\s+is\s+edward|what\s+is\s+fullmetal\s+alchemist|how\s+is\s+fullmetal\s+alchemist|tell\s+me\s+about\s+fullmetal\s+alchemist|explain\s+fullmetal\s+alchemist|describe\s+fullmetal\s+alchemist)\b/i)) {
        speak("Fullmetal Alchemist Brotherhood follows the Elric brothers, who use alchemy to restore their bodies after a failed experiment. Want to hear about the Philosopher’s Stone or the Homunculi?");
    }
    
    else if (message.match(/\b(who\s+is\s+kaneki|what\s+is\s+tokyo\s+ghoul|how\s+is\s+tokyo\s+ghoul|tell\s+me\s+about\s+tokyo\s+ghoul|explain\s+tokyo\s+ghoul|describe\s+tokyo\s+ghoul)\b/i)) {
        speak("Tokyo Ghoul follows Kaneki, a human who turns into a half-ghoul after a fateful encounter. Do you want to learn about the Ghoul organizations or Kaneki’s transformation?");
    }
    
    else if (message.match(/\b(who\s+is\s+asta|what\s+is\s+black\s+clover|how\s+is\s+black\s+clover|tell\s+me\s+about\s+black\s+clover|explain\s+black\s+clover|describe\s+black\s+clover)\b/i)) {
        speak("Black Clover follows Asta, a boy born without magic in a world where magic is everything. Want to know about the Magic Knights or Asta's anti-magic swords?");
    }
    
    else if (message.match(/\b(who\s+is\s+izuku|what\s+is\s+my\s+hero\s+academia|how\s+is\s+my\s+hero\s+academia|tell\s+me\s+about\s+my\s+hero\s+academia|explain\s+my\s+hero\s+academia|describe\s+my\s+hero\s+academia)\b/i)) {
        speak("My Hero Academia follows Izuku Midoriya, a boy without superpowers who gets the chance to become a hero. Want to know about One for All, All Might, or the Pro Heroes?");
    }
    
    else if (message.match(/\b(who\s+is\s+senku|what\s+is\s+dr\s+stone|how\s+is\s+dr\s+stone|tell\s+me\s+about\s+dr\s+stone|explain\s+dr\s+stone|describe\s+dr\s+stone)\b/i)) {
        speak("Dr. Stone is about Senku, a genius who wakes up in a world where humanity has turned to stone and tries to rebuild civilization using science. Want to hear about his greatest inventions?");
    }
    
    else if (message.match(/\b(who\s+is\s+subaru|what\s+is\s+re\s+zero|how\s+is\s+re\s+zero|tell\s+me\s+about\s+re\s+zero|explain\s+re\s+zero|describe\s+re\s+zero)\b/i)) {
        speak("Re:Zero follows Subaru Natsuki, a guy who keeps dying and restarting from a fixed point in time. Want to learn about the witches, Emilia, or his Return by Death ability?");
    }
    
    else if (message.match(/\b(who\s+is\s+cid|what\s+is\s+eminence\s+in\s+shadow|how\s+is\s+eminence\s+in\s+shadow|tell\s+me\s+about\s+eminence\s+in\s+shadow|explain\s+eminence\s+in\s+shadow|describe\s+eminence\s+in\s+shadow)\b/i)) {
        speak("The Eminence in Shadow follows Cid Kagenou, who pretends to be a side character while secretly leading an underground organization. Do you want to know about Shadow Garden?");
    }
    
    else if (message.match(/\b(who\s+is\s+violet|what\s+is\s+violet\s+evergarden|how\s+is\s+violet\s+evergarden|tell\s+me\s+about\s+violet\s+evergarden|explain\s+violet\s+evergarden|describe\s+violet\s+evergarden)\b/i)) {
        speak("Violet Evergarden is a heartwarming anime about a former soldier who becomes a letter writer to understand emotions. Want to hear about her journey?");
    }
    
    else if (message.match(/\b(who\s+is\s+haruki|what\s+is\s+i\s+want\s+to\s+eat\s+your\s+pancreas|how\s+is\s+i\s+want\s+to\s+eat\s+your\s+pancreas|tell\s+me\s+about\s+i\s+want\s+to\s+eat\s+your\s+pancreas|explain\s+i\s+want\s+to\s+eat\s+your\s+pancreas|describe\s+i\s+want\s+to\s+eat\s+your\s+pancreas)\b/i)) {
        speak("I Want to Eat Your Pancreas is a touching anime film about a high school boy who discovers a secret diary of a terminally ill girl. It's an emotional story about life and death.");
    }
    
    else if (message.match(/\b(who\s+is\s+satoru|what\s+is\s+erased|how\s+is\s+erased|tell\s+me\s+about\s+erased|explain\s+erased|describe\s+erased)\b/i)) {
        speak("Erased follows Satoru, a man who can go back in time to prevent tragedies. When his childhood friend is murdered, he goes back to save her. Want to hear about his journey?");
    }
    else if (message.includes("open crunchyroll")) {
        speak("Opening Crunchyroll...");
        window.open("https://www.crunchyroll.com/", "_blank");
    }
    else if (message.includes("open funimation")) {
        speak("Opening Funimation...");
        window.open("https://www.funimation.com/", "_blank");
    }
    else if (message.includes("open gogoanime")) {
        speak("Opening GoGoAnime...");
        window.open("https://www.gogoanime.pe/", "_blank");
    }
    else if (message.includes("open 9anime")) {
        speak("Opening 9Anime...");
        window.open("https://9anime.to/", "_blank");
    }
    else if (message.includes("open amazon")) {
        speak("Opening Amazon...");
        window.open("https://www.amazon.com/", "_blank");
    } 
    else if (message.includes("open flipkart")) {
        speak("Opening Flipkart...");
        window.open("https://www.flipkart.com/", "_blank");
    } 
    else if (message.includes("open myntra")) {
        speak("Opening Myntra...");
        window.open("https://www.myntra.com/", "_blank");
    } 
    else if (message.includes("open snapdeal")) {
        speak("Opening Snapdeal...");
        window.open("https://www.snapdeal.com/", "_blank");
    } 
    else if (message.includes("open ebay")) {
        speak("Opening eBay...");
        window.open("https://www.ebay.com/", "_blank");
    } 
    else if (message.includes("open ajio")) {
        speak("Opening Ajio...");
        window.open("https://www.ajio.com/", "_blank");
    } 
    else if (message.includes("open meesho")) {
        speak("Opening Meesho...");
        window.open("https://www.meesho.com/", "_blank");
    } 
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/", "_blank");
    } 
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } 

    else if (message.includes("what is your name"))
    {
        speak("my name is Omnix , i'm virtual assistant");
    }
    else if (message.includes("what is python")) {
        speak("Python is a high-level programming language known for its simplicity and readability. It is widely used in web development, AI, and data science.");
    }
    else if (message.includes("what is javascript")) {
        speak("JavaScript is a programming language used to create dynamic and interactive web pages.");
    }
    else if (message.includes("how to learn coding")) {
        speak("You can start learning coding with Python, JavaScript, or C++. Websites like W3Schools, FreeCodeCamp, and Codecademy are great for beginners.");
    }
    else if (message.includes("what is a black hole")) {
        speak("A black hole is a region in space with gravitational pull so strong that nothing, not even light, can escape from it.");
    }
    else if (message.includes("how does gravity work")) {
        speak("Gravity is the force that pulls objects toward each other. The larger the object, the stronger its gravitational pull.");
    }
    else if (message.includes("who was Albert Einstein")) {
        speak("Albert Einstein was a theoretical physicist known for developing the theory of relativity, which transformed modern physics.");
    }
    else if (message.includes("how to stay healthy")) {
        speak("To stay healthy, eat a balanced diet, exercise regularly, drink plenty of water, and get enough sleep.");
    }
    else if (message.includes("best exercises for weight loss")) {
        speak("Some of the best exercises for weight loss include running, cycling, swimming, and high-intensity interval training (HIIT).");
    }
    else if (message.includes("what is intermittent fasting")) {
        speak("Intermittent fasting is an eating pattern where you cycle between periods of eating and fasting. It can help with weight loss and metabolism.");
    }
    else if (message.includes("what is cryptocurrency")) {
        speak("Cryptocurrency is a digital currency that uses blockchain technology for secure transactions. Bitcoin and Ethereum are popular examples.");
    }
    else if (message.includes("best ways to save money")) {
        speak("To save money, create a budget, avoid unnecessary expenses, and invest in high-interest savings accounts.");
    }
    
    else if (message.includes("best places to visit in India")) {
        speak("Some of the best places to visit in India are the Taj Mahal, Jaipur, Goa, Manali, and Kerala.");
    }
    else if (message.includes("how to book cheap flights")) {
        speak("To book cheap flights, use incognito mode while searching, compare prices on multiple websites, and book in advance.");
    }
    else if (message.includes("best travel apps")) {
        speak("Some great travel apps include Google Maps, TripAdvisor, Airbnb, and Skyscanner for flight deals.");
    }
    else if (message.includes("tell me a fun fact")) {
        speak("Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.");
    }
    else if (message.includes("why is the sky blue")) {
        speak("The sky appears blue because molecules in the atmosphere scatter sunlight in all directions, with blue light being scattered the most.");
    }
    else if (message.includes("what is the fastest animal on earth")) {
        speak("The peregrine falcon is the fastest animal on Earth, reaching speeds of over 240 mph during its hunting dives.");
    }
    else if (message.includes("tell me a fun fact")) {
        speak("Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.");
    }
    else if (message.includes("why is the sky blue")) {
        speak("The sky appears blue because molecules in the atmosphere scatter sunlight in all directions, with blue light being scattered the most.");
    }
    else if (message.includes("what is the fastest animal on earth")) {
        speak("The peregrine falcon is the fastest animal on Earth, reaching speeds of over 240 mph during its hunting dives.");
    }
    else if (message.includes("set alarm")) {
        setAlarm(message);
    }
    else if (message.includes("set reminder")) {
        setReminder(message);
    }
           
    else {
            let finalText = "Searching Google for: " + message;
            speak("Sorry, I couldn't understand that. " + finalText);
            window.open("https://www.google.com/search?q=${message}", "_blank");
        }
}  



