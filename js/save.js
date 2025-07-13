function getJson() {
    const baseURL = "http://localhost:3000/character"
    var json;

    const todoPromise = fetch(baseURL);
    todoPromise
        .then(data => data.json())
        .then(jsonData => {
            console.log(jsonData);
            loadSave(jsonData);
            gameStarted = true;
        }).catch((err) => {
            console.log(err);
        })
}

function loadSave(json) {
    characterChoice = json.class;
    setCharacterStats();
    warrior.keys = json.numKeys;
    warrior.exp = json.exp;
}