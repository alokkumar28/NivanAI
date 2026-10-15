export const getCurrentUser = async (req, res) => {
    try {
        // req.user was attached by the protect middleware
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        return res.status(500).json({ 
            success: false,
            message: "Failed to fetch current user",
            error: error.message 
        });
    }
};