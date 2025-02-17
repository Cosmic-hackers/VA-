document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        speak("Hello, I am Omnix, your virtual assistant created by team omnix. How can I assist you today?");
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
let Content = document.querySelector("#content");
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

function getBatteryStatus() {
    navigator.getBattery().then(function (battery) {
        let level = Math.round(battery.level * 100);
        speak(`Your battery is at ${level} percent.`);
    });
}

function getCurrentTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    speak(`The time is ${hours} ${minutes} ${period}`);
}
function setReminder(message) {
    let reminderText = message.replace("set reminder", "").trim();
    let reminderTime = prompt("At what time? (HH:MM in 24-hour format)");
    
    if (reminderTime) {
        let [hours, minutes] = reminderTime.split(":").map(Number);
        let now = new Date();
        let reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        let timeDifference = reminderDate - now;
        
        if (timeDifference > 0) {
            localStorage.setItem("reminder", reminderText);
            speak(`Reminder set for ${reminderTime}. I will notify you.`);
            
            setTimeout(() => {
                speak(`Reminder: ${reminderText}`);
                alert(`Reminder: ${reminderText}`);
            }, timeDifference);
        } else {
            speak("The time you entered has already passed.");
        }
    }
}

function setAlarm(message) {
    let alarmTime = prompt("At what time do you want to set the alarm? (HH:MM in 24-hour format)");
    
    if (alarmTime) {
        let [hours, minutes] = alarmTime.split(":").map(Number);
        let now = new Date();
        
        let alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        let checkAlarm = setInterval(() => {
            let currentTime = new Date();
            if (currentTime.getHours() === hours && currentTime.getMinutes() === minutes) {
                speak("Alarm ringing! Wake up!");
                alert("Alarm ringing!");
                clearInterval(checkAlarm);
            }
        }, 1000); // Check every second
        
        speak(`Alarm set for ${alarmTime}`);
    }
}
async function fetchNewsWithSummary() {
    const apiKey="a71a9950d1604334bf38a82b837dfbd9"; // Replace with your API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.articles.length > 0) {
            speak("Here are the latest news updates.");
            
            for (let i = 0; i < 3; i++) {
                let article = data.articles[i];
                let summary = article.description || "No summary available.";
                
                speak(`News ${i + 1}: ${article.title}. Summary: ${summary}`);
            }
        } else {
            speak("I couldn't find any latest news.");
        }

    } catch (error) {
        speak("Sorry, I couldn't fetch the news at the moment.");
        console.error(error);
    }
}
async function fetchNewsByCategory(category) {
    const apiKey = "950d1604334bf38a82b837dfbd9";
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.articles.length > 0) {
            speak(`Here are the latest ${category} news.`);
            
            for (let i = 0; i < 3; i++) {
                let article = data.articles[i];
                speak(`News ${i + 1}: ${article.title}`);
            }
        } else {
            speak(`I couldn't find any latest ${category} news.`);
        }

    } catch (error) {
        speak("Sorry, I couldn't fetch the news at the moment.");
        console.error(error);
    }
}

async function fetchTrendingTopics() {
    const url = "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US";
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    try {
        let response = await fetch(proxy);
        let data = await response.json();

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data.contents, "text/xml");

        let items = xmlDoc.getElementsByTagName("title");
        let trends = [];

        for (let i = 1; i < 6; i++) { // Skip first title as it's general info
            trends.push(items[i].textContent);
        }

        speak("Here are the top trending topics today.");
        trends.forEach((trend, index) => {
            speak(`Trending topic ${index + 1}: ${trend}`);
        });

    } catch (error) {
        speak("Sorry, I couldn't fetch trending topics right now.");
        console.error(error);
    }
}

async function analyzeSentiment(text) {
    const apiUrl = "https://api.textanalysis.com/sentiment"; // Use a real API
    const apiKey="a71a9950d1604334bf38a82b837dfbd9";

    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, apiKey })
        });

        let data = await response.json();
        let sentiment = data.sentiment;

        if (sentiment === "positive") {
            speak("This news sounds positive!");
        } else if (sentiment === "negative") {
            speak("This news sounds negative.");
        } else {
            speak("This news is neutral.");
        }

    } catch (error) {
        speak("I couldn't analyze the sentiment of this news.");
        console.error(error);
    }
}

// Modify news function:
async function fetchNewsWithSentiment() {
    const apiKey="a71a9950d1604334bf38a82b837dfbd9";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.articles.length > 0) {
            speak("Here are the latest news updates with sentiment analysis.");
            
            for (let i = 0; i < 3; i++) {
                let article = data.articles[i];
                let title = article.title;
                
                speak(`News ${i + 1}: ${title}`);
                await analyzeSentiment(title);
            }
        } else {
            speak("I couldn't find any latest news.");
        }

    } catch (error) {
        speak("Sorry, I couldn't fetch the news at the moment.");
        console.error(error);
    }
}
(function(){
    emailjs.init("WwTXXNNkDWaDhKnGC"); // Replace with your EmailJS user ID
})();
function sendEmail() {
    let templateParams = {
        to_name: "Recipient Name",
        from_name: "Omnix Voice Assistant",
        message: "Hello, this is a test email from Omnix Assistant!"
    };

    emailjs.send("service_2n1xghs", "template_h88f9pe", templateParams)
    .then((response) => {
        console.log("Email sent successfully!", response);
        speak("Email has been sent successfully.");
    }, (error) => {
        console.log("Failed to send email.", error);
        speak("I couldn't send the email. Please try again.");
    });
}

// Call sendEmail() when a voice command is detected
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "siddusidharth613@gmal.com",
        pass: "cosmoss@9390291870" // Use App Passwords for security
    }
});

app.post("/send-email", (req, res) => {
    let mailOptions = {
        from: "siddusidharth613@gmail.com",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email.");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully!");
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

function sendEmail() {
    fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: "recipient@example.com",
            subject: "Hello from Omnix",
            message: "This is a test email sent by Omnix Assistant!"
        })
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        speak("Email sent successfully!");
    })
    .catch(error => {
        console.error(error);
        speak("I couldn't send the email. Please check the server.");
    });
}

// **Speech Recognition Setup**


function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, how can I assist you today?");
    } else if (message.includes("who are you")) {
        speak("I am Omnix, your virtual assistant created by team omnix. I can help you with various tasks.");
    } else if (message.includes("how are you")) {
        speak("I'm doing great, thank you for asking! How can I assist you?");
    }
 else if (message.includes("what can you do")) {
            speak("I  can help you with reminders, alarms, battery status, and general queries, open websites, search for information, provide news updates, assist with tech queries, set alarms, and much more. Just ask!");
        } else if (message.includes("open youtube")) {
            speak("Opening YouTube...");
            setTimeout(() => {
                window.open("https://youtube.com", "_blank");
            }, 1000);
        } 
        else if (message.includes("search youtube for")) {
            let query = message.replace("search youtube for", "").trim();
            speak(`Searching YouTube for ${query}...`);
            setTimeout(() => {
                window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
            }, 1000);
        }
        else if (message.includes("send a e-mail to")) {
           let words = message.split(" ");
            let recipient = words[words.indexOf("to") + 1] + "@gmail.com"; // Extract email ID (simplified logic)
           let subject = "Voice Command Email";
            let emailMessage = "This is a test email sent by Omnix Assistant.";
            
           speak(`Sending email to ${recipient}`);
           sendEmail(recipient, subject, emailMessage);
        }
        else if (message.includes("what is the time")) {
            let currentTime = new Date().toLocaleTimeString();
            speak(`The current time is ${currentTime}`);
        } 
        else if (message.includes("what is the date")) {
            let currentDate = new Date().toLocaleDateString();
            speak(`Today's date is ${currentDate}`);
        } 
        else if (message.includes("open google")) {
            speak("Opening Google...");
            setTimeout(() => {
                window.open("https://google.com", "_blank");
            }, 1000);
        } 
        else if (message.includes("search google for")) {
            let query = message.replace("search google for", "").trim();
            speak(`Searching Google for ${query}...`);
            setTimeout(() => {
                window.open(`https://www.google.com/search?q=${query}`, "_blank");
            }, 1000);
        } 
        else if (message.includes("tell me a joke")) {
            speak("Why don't scientists trust atoms? Because they make up everything!");
        } 
        else if (message.includes("inspire me")) {
            speak("The only way to do great work is to love what you do. - Steve Jobs");
        } 
        else if (message.includes("open cnn")) {
            speak("Opening CNN...");
            setTimeout(() => {
                window.open("https://cnn.com", "_blank");
            }, 1000);
        } 
        else if (message.includes("what is the weather")) {
            speak("Fetching weather info...");
            setTimeout(() => {
                window.open("https://weather.com", "_blank");
            }, 1000);
        } 
        else if (message.includes("top animes") || message.includes("anime")) {
            speak("Fetching the list of top animes...");
            setTimeout(() => {
                window.open("https://www.imdb.com/search/title/?genres=animation", "_blank");
            }, 1000);
        } 
        else if (message.includes("who created you")) {
            speak("I was created by team omnix, a tech enthusiast and developer.");
        } 
        else if (message.includes("who is the founder of cosmos")) {
            speak("The founder of Cosmoss is the one and only, Siddu.");
        } 
        else if (message.includes("search news for")) {
            let query = message.replace("search news for", "").trim();
            speak(`Searching news for ${query}...`);
            setTimeout(() => {
                window.open(`https://www.google.com/search?q=${query}+news`, "_blank");
            }, 1000);
        } 
        else if (message.includes("search tech for")) {
            let query = message.replace("search tech for", "").trim();
            speak(`Searching tech news for ${query}...`);
            setTimeout(() => {
                window.open(`https://www.google.com/search?q=${query}+tech`, "_blank");
            }, 1000);
        } 
        else if (message.includes("open facebook")) {
            speak("Opening Facebook...");
            setTimeout(() => {
                window.open("https://facebook.com", "_blank");
            }, 1000);
        } 
        else if (message.includes("open twitter")) {
            speak("Opening Twitter...");
            setTimeout(() => {
                window.open("https://twitter.com", "_blank");
            }, 1000);
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
        setTimeout(() => {
            window.open("https://www.crunchyroll.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open funimation")) {
        speak("Opening Funimation...");
        setTimeout(() => {
            window.open("https://www.funimation.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open gogoanime")) {
        speak("Opening GoGoAnime...");
        setTimeout(() => {
            window.open("https://www.gogoanime.pe/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open 9anime")) {
        speak("Opening 9Anime...");
        setTimeout(() => {
            window.open("https://9anime.to/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open amazon")) {
        speak("Opening Amazon...");
        setTimeout(() => {
            window.open("https://www.amazon.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open flipkart")) {
        speak("Opening Flipkart...");
        setTimeout(() => {
            window.open("https://www.flipkart.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open myntra")) {
        speak("Opening Myntra...");
        setTimeout(() => {
            window.open("https://www.myntra.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open snapdeal")) {
        speak("Opening Snapdeal...");
        setTimeout(() => {
            window.open("https://www.snapdeal.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open ebay")) {
        speak("Opening eBay...");
        setTimeout(() => {
            window.open("https://www.ebay.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open ajio")) {
        speak("Opening Ajio...");
        setTimeout(() => {
            window.open("https://www.ajio.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open meesho")) {
        speak("Opening Meesho...");
        setTimeout(() => {
            window.open("https://www.meesho.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        setTimeout(() => {
            window.open("https://web.whatsapp.com/", "_blank");
        }, 1000);
    } 
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        setTimeout(() => {
            window.open("https://www.instagram.com/", "_blank");
        }, 1000);
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
    else if (message.includes("battery status") || message.includes("battery percentage")) {
        getBatteryStatus();
    }
    
           
 //else {
 //   speak("I couldn't understand that. Searching Google for " + message);
   // window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
//}

// Trigger News Fetching
else if (message.includes("read news")) {
    speak("Fetching the latest news...");
    fetchNews();
}
    
else if (message.includes("latest news")) {
    speak("Fetching the latest news...");
    fetchNewsWithSummary();
} 
else if (message.includes("tech news")) {
    speak("Fetching the latest tech news...");
    fetchNewsByCategory("technology");
} 
else if (message.includes("sports news")) {
    speak("Fetching the latest sports news...");
    fetchNewsByCategory("sports");
} 
else if (message.includes("AI news")) {
    speak("Fetching the latest AI news...");
    fetchNewsByCategory("science");
} 
else if (message.includes("trending topics")) {
    speak("Fetching the latest trending topics...");
    fetchTrendingTopics();
} 
else if (message.includes("analyze news sentiment")) {
    speak("Analyzing the latest news sentiment...");
    fetchNewsWithSentiment();
} 
else if (message.includes("what do you think about")) {
    let query = message.replace("what do you think about", "").trim();
    speak(`That's an interesting topic! Let me find some details about ${query}...`);
    
    setTimeout(() => {
        window.open(`https://www.google.com/search?q=${query}+news`, "_blank");
        speak(`I've opened the latest news on ${query} for you!`);
    }, 2000);
} 
else if (message.includes("explain this news")) {
    speak("Let me summarize this news for you...");
    fetchNewsWithSummary();
} 


 else {
    speak("I couldn't understand that. Searching Google for " + message);

    // Open Google Search
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message)}`;
    window.open(searchUrl, "_blank");

    // Fetch search results (Google API or scraping method required)
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(searchUrl)}`)
        .then(response => response.json())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data.contents, "text/html");

            let firstResult = doc.querySelector(".BNeawe").innerText; // Extract first result

            if (firstResult) {
                speak("Here is what I found: " + firstResult);
            } else {
                speak("I couldn't fetch the search result, but you can check it in the browser.");
            }
        })
        .catch(error => {
            speak("I couldn't retrieve the search result. Please check the browser.");
        });
}


}
