import statusCodes from "http-status-codes";

export function returnVercel(req, res) {
    res
        .status(statusCodes.OK)
        .send('Running on Vercel');
}