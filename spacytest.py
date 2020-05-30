import spacy
import json
import websockets
import asyncio
PORT=12672

nlp = spacy.load("en_core_web_md")
print("SPACY OK")
# open a websocket
async def spacify(websocket, path):
    while True:
        query=str(await websocket.recv())
        datae=nlp(query)
        data = [{
            'text':token.text, 
            'lemma': token.lemma_,
            'pos':token.pos_, 
            'tag':token.tag_, 
            'dep':token.dep_,
            'shape':token.shape_, 
            'is_alpha':token.is_alpha, 
            'is_stop':token.is_stop
        } for token in datae]
        await websocket.send(json.dumps(data))

start_server = websockets.serve(spacify, "localhost", 12672)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()