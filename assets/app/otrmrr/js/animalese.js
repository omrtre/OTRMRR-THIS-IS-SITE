var letter_graphs = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9"
];

var digraphs = [
    "ch", "sh", "ph", "th", "wh"
];

var bebebese = "/assets/app/otrmrr/audio/bebebese_slow.wav";

var playbackSpeedMin = 2.5;
var playbackSpeedMax = 3.0;
var playbackSpeed = null;
var sentence = '';

function onCharSpeak() {
    playbackSpeed = Math.random() * (playbackSpeedMax-playbackSpeedMin) + playbackSpeedMin;
    sentence = buildSentence(sentence);
    speakSentence();
}

function speakSentence() {
    if (sentence.length > 0) {
        speakNextCharacter();
    }
}

function speakNextCharacter() {
    if (sentence.length == 0) return;

    var character = sentence[0];
    sentence = sentence.substring(1);

    var characterFile = getCharacterAudioFile(character);
    if (characterFile) {
        var player = new Audio();
        player.src = characterFile;
        player.mozPreservesPitch = false;
        player.playbackRate = playbackSpeed;
        player.play();
        //var sound = new Howl({
            //src: characterFile,
            //volume: .5,
        //})
        //sound.rate(playbackSpeed)
        //sound.play();
    }
    setTimeout(speakNextCharacter, 70);
}

function getCharacterAudioFile(character) {
    if (character.match(/[a-z]/i)) {
        return "/assets/app/otrmrr/audio/" + character + ".wav";
    } else if (character == " ") {
        return null;
    } else {
        return bebebese;
    }
}

function targetQuery(nameQuery) {
    let targetQuery = document.querySelector(nameQuery);
    return targetQuery
}

function appendText(nameElement) {
    let targetElement = document.querySelector(nameElement);

    if (targetElement) {
        let targetElementContent = targetElement.textContent;
        if (targetElementContent) {
            sentence += targetElementContent;
            //targetElement.textContent = "";
        }
    }
}

function buildSentence(sentence) {
    sentence = sentence.toLowerCase();
    sentence = replaceSwearWords(sentence);
    sentence = replaceParentheses(sentence);
    sentence = removeSpaces(sentence);
    return sentence
}

function replaceSwearWords(sentence) {
    var swearWords = ["fuck", "shit", "piss", "crap", "bugger"]
    for (var eachWord = 0; eachWord < swearWords.length; eachWord++) {
        sentence = sentence.replace(swearWords[eachWord], "*".repeat(swearWords[eachWord].length));
    }
    return sentence;
}

function replaceParentheses(sentence) {
    while (sentence.includes("(") || sentence.includes(")")) {
        var start = sentence.indexOf("(");
        var end = sentence.indexOf(")");
        sentence = sentence.substring(0, start) + 
            "*".repeat(end-start-1) + 
            sentence.substring(end + 1, sentence.length);
    }

    return sentence;
}

function removeSpaces(sentence) {
    sentence = sentence.replace(" ", "");
    return sentence;
}

