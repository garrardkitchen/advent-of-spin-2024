import { ResponseBuilder, Kv} from "@fermyon/spin-sdk";

const encoder = new TextEncoder()
const decoder = new TextDecoder()   

export async function handler(req: Request, res: ResponseBuilder) {
    console.log(req);

    let store = Kv.openDefault()
    let val = store.get(req.url)
    let storeVal = decoder.decode(val || new Uint8Array())
    let wishlists = JSON.parse(storeVal || '[]');
   
    if (req.method === "GET") {
        return res.status(200).set({"content-type":"application/json"}).send(JSON.stringify(wishlists));
    }

    if (req.method === "DELETE") {
        store.delete(req.url)
        console.log(`Deleted Key ${req.url}`);
        return res.status(200).set({"content-type":"application/json"}).send(JSON.stringify("[]"));
    }
    
    if (req.method === "POST") {
        let body = null;

        try {
            body = await req.json();
        } catch (error) {
            return res.status(400).send("Invalid JSON");
        }

        if (!body.name || !Array.isArray(body.items)) {
            return res.status(400).send("Mal-formatted request");
        }

        wishlists.push(body);
        store.set(req.url, wishlists)
        return res.status(201).set({"content-type":"application/json"}).send(JSON.stringify(wishlists));
    }
}


