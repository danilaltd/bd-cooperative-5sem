const router = require('express').Router();
const controller = require('../controllers/action-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

router.get('/', [authMiddleware, adminMiddleware], controller.getAll);
router.get('/:id', [authMiddleware, adminMiddleware], controller.getById);

module.exports = router;
