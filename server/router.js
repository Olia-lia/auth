const Router = require('express');
const router = new Router();

router.post('/auth/token');
router.post('/auth/refresh_token');

module.exports = router;

