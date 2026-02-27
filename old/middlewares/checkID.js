export async function checkID(req, res, next) {
    // SI l'id n'est pas un nombre, renvoyer un message d'erreur au client
    if(isNaN(req.params.id)) {
        return res.status(400).json({"Message" : "L'ID doit être un nombre"});
    }
    next();
}