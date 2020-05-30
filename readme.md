env: python3 64bit fresh install

works but not pretty. sorry, i guess? 

1. install spacy: `pip install spacy`
2. install websockets: `pip install websockets`
3. change port in `spacy.py` and `spacy-nlp-win.js` if desired
4. run `spacy.py` in background. this is the server. wait for `SPACY OK`. BE PATIENT
5. `npm install ws`
5. `spacy=require("./spacy-nlp-win.js")`
5. `instance=new spacy()`
6. `data=spacy.nlp("some sentence")`
