const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ─────────────────────────────────────────────
//  Auth Controller
//  Business logic extracted from authRoutes.js
// ─────────────────────────────────────────────

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Verify role if provided
            if (role && user.role !== role && user.role !== 'admin') {
                return res.status(401).json({ message: `Not authorized as ${role}` });
            }

            res.json({
                _id:   user._id,
                name:  user.name,
                email: user.email,
                role:  user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('[AuthController] loginUser error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            res.json({
                _id:   user._id,
                name:  user.name,
                email: user.email,
                role:  user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('[AuthController] getMe error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser, getMe };
