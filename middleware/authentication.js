const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    try {

        var decoded = jwt.verify(token, 'barsu');
        const userID = decoded.userID;
        req.body.userID = userID;

        console.log(decoded)


        next();

    } catch (error) {

        res.status(401).send("Unautherized")

    }

}

module.exports = { authentication }