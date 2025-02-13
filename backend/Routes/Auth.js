var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa";

const fetch = (req, res, next) => {
    // Get the user from the JWT token and add user ID to req object
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).json({ error: "Invalid Auth Token" }); // ✅ Added return to stop execution
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next(); // ✅ Call next() only when everything is fine
    } catch (error) {
        return res.status(401).json({ error: "Invalid Auth Token" }); // ✅ Added return to stop execution
    }
}

module.exports = fetch;
