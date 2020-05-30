let spacywin = require('./spacy-nlp-win');
let spacyinstance = new spacywin();

(async ()=>{
    console.log("Trying...");
    let result = await spacyinstance.nlp("the quick brown fox jumped over the lazy dog");
    console.log(result);
})();
