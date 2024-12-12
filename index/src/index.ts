import { ResponseBuilder, Variables } from "@fermyon/spin-sdk";

export async function handler(req: Request, res: ResponseBuilder) {
    console.log(req);
    let message = Variables.get("message") ?? "Merry Christmas!";
    res.status(200).set({"content-type":"html"}).send(`<html><body><h1>${message}</h1></body></html>`);
}
