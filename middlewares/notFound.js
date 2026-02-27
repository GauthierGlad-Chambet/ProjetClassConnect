import * as helpers from "../utils/helpers.js"

export async function notFound(req, res, next) {
    next(helpers.createError(404, "Route inexistante"));
}