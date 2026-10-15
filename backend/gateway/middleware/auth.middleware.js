import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;
        if (!sessionId) {
            return res.status(401).json({ 
                message: "Not authorized, no session found. Please login." 
            });
        }
        const session = await redis.get(`session:${sessionId}`);
        
        if (!session) {
            return res.status(401).json({ 
                message: "Session expired or invalid. Please login again." 
            });
        }

        req.user = JSON.parse(session);
        next();

    } catch (error) {
        console.error("Error in protect middleware:", error);
        return res.status(500).json({ 
            message: "Internal server error during authentication",
            error: error.message 
        });
    }
};

export default protect;