const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    // #region agent log
    fetch('http://127.0.0.1:7868/ingest/f820b9b0-ddd7-40a0-bbb4-c32eb1f232e5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'4fdd58'},body:JSON.stringify({sessionId:'4fdd58',runId:'qa-1',hypothesisId:'H1',location:'authMiddleware.js:protect:entry',message:'protect called',data:{method:req.method,url:req.originalUrl,hasBearer:!!(req.headers.authorization&&req.headers.authorization.startsWith('Bearer'))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            if (user.status === 'suspended') {
                return res.status(403).json({ message: 'Your account has been suspended' });
            }

            if (user.status === 'deleted') {
                return res.status(403).json({ message: 'Your account has been deleted' });
            }

            req.user = user;
            // #region agent log
            fetch('http://127.0.0.1:7868/ingest/f820b9b0-ddd7-40a0-bbb4-c32eb1f232e5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'4fdd58'},body:JSON.stringify({sessionId:'4fdd58',runId:'qa-1',hypothesisId:'H2',location:'authMiddleware.js:protect:ok',message:'protect accepted token',data:{role:user.role,url:req.originalUrl},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
            return next();
        } catch {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    return res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Not authorized as an admin' });
};

const staff = (req, res, next) => {
    const allowed = !!(req.user && (req.user.role === 'admin' || req.user.role === 'employee'));
    // #region agent log
    fetch('http://127.0.0.1:7868/ingest/f820b9b0-ddd7-40a0-bbb4-c32eb1f232e5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'4fdd58'},body:JSON.stringify({sessionId:'4fdd58',runId:'qa-1',hypothesisId:'H3',location:'authMiddleware.js:staff',message:'staff gate',data:{role:req.user&&req.user.role,allowed,url:req.originalUrl},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (allowed) {
        return next();
    }
    return res.status(403).json({ message: 'Not authorized' });
};

module.exports = { protect, admin, staff };
