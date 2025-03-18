const urls = {
    "Termo": "term.ooo",
    "Dueto": "term.ooo/2/",
    "Quarteto": "term.ooo/4/",
    "Conexo": "conexo.ws/pt/",
    "Moviedle": "likewise.com/games/moviedle",
    "Framed": "framed.wtf",
    "Framed one-frame": "framed.wtf/one-frame",
    "Plotwords": "plotwords.com/daily",
    "Episode": "episode.wtf",
    "Faces": "faces.wtf",
    "Gaps": "gaps.wtf",
    "Gaps TVshow": "gaps.wtf/bonus",
    "Spots": "spots.wtf",
    "Decipher": "decipher.wtf",
    "Numble": "numble.wtf",
    "Flagle 1": "www.flagle.io",
    "Flagle 2": "flagle-game.com",
    "Flagle 3": "flagle.gg",
    "Gamedle Classic": "www.gamedle.wtf/classic",
    "Gamedle Artwork": "www.gamedle.wtf/artwork",
    "Gamedle Keywords": "www.gamedle.wtf/keywords",
    "Gamedle Guess": "www.gamedle.wtf/guess",
    "Loldle Classic": "loldle.net/classic",
    "Loldle Quote": "loldle.net/quote",
    "Loldle Ability": "loldle.net/ability",
    "Loldle Emoji": "loldle.net/emoji",
    "Loldle Splash": "loldle.net/splash",
    "Waffle": "wafflegame.net/daily",
    "Waffle Deluxe": "wafflegame.net/deluxe",
    "Valdle 1": "www.valdle.gg",
    "Valdle 2": "valdle.com",
    "Valdle 3": "valdle.io",
    "Whentaken": "whentaken.com/game"
}


//###############################################################################################
// Function init
//###############################################################################################

let count;
document.addEventListener("DOMContentLoaded", function(){
    chrome.storage.local.get(["counter"], function(result){
        count = result.counter;
        if (count == undefined){
            count = -1;
        }
        let title = setTitle();
        changeGameTitle(title);
    })
});

//###############################################################################################
// Function Dictionary
//###############################################################################################

function getAllKeys(dict){
    var Keys = [];
    return Keys = Object.keys(dict);
}

function getValue(dict, value){
    return getAllKeys(urls)[value];
}

//###############################################################################################
// Function HTML
//###############################################################################################

function setTitle(){
    return count == -1 ? "Iniciar!" : getAllKeys(urls)[count];
}

function changeGameTitle(newTitle){
    document.querySelector(".game-info").innerText = newTitle;
}

function createTab(dict, value){
    var baseUrl = "https://";
    var newUrl = baseUrl + dict[value];
    chrome.tabs.create({url: newUrl});
}

function updateTab(dict, value){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            var baseUrl = "https://";
            var newUrl = baseUrl + dict[value];
            chrome.tabs.update(tabs[0].id, { url: newUrl });
        }
    });
}

function storeData(value){
    chrome.storage.local.set({counter: count});
}

function minus(){
    if (count <= 0){
        changeGameTitle(getAllKeys(urls)[Object.keys(urls).length - 1]);
        count = Object.keys(urls).length - 1
        console.log(count);
    } else {
        count--;
        changeGameTitle(getAllKeys(urls)[count]);
        console.log(count);
    }
    updateTab(urls, getValue(urls, count));
    storeData(count);
}

function plus(){
    if (count == Object.keys(urls).length - 1){
        changeGameTitle(getAllKeys(urls)[0]);
        count = 0;
        console.log(count);
    } else {
        count++;
        changeGameTitle(getAllKeys(urls)[count]);
        console.log(count);
    }
    updateTab(urls, getValue(urls, count));
    storeData(count);
}

function close(){
    count = -1;
    storeData(count);
    changeGameTitle(setTitle());
}

//###############################################################################################
// Function Buttons
//###############################################################################################

document.getElementById("backBtn").addEventListener("click", function(){
    minus();
})

document.getElementById("nextBtn").addEventListener("click", function(){
    plus();
})

document.getElementById("close").addEventListener("click", function(){
    close();
})


