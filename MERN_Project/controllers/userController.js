import { user } from './../models/user';

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if any field is missing
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check if user already exists with the given email
        const user = await user.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already registered with this email.",
            });
        }

        // Create new user
        await user.create({ fullName, email, password });

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
        });

    } catch (error) {
        //  error handling
        console.error("Register error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};
