const auth = require('../middlewares/auth');
const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');
const NotFoundError = require('../exeptions/NotFoundError');
const { validateCreateUser, validateLoginData } = require('../middlewares/validators');
const { create, login } = require('../controllers/UserController');

const router = require('express').Router()

router.post('/signup', validateCreateUser, create)
router.post('/signin', validateLoginData, login)

router.use(auth)
router.use('/users', userRouter)
router.use('/cards', cardRouter)

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'))
})


module.exports = router;
