import { version } from '../../package.json';
import { Router } from 'express';
import topics from './topics';
import comments from './comments';
import users from './users';
import auth from './auth';
import passport from 'passport';

export default ({ config, db }) => {
	let api = Router();

  api.use(extractUser)
	api.use('/topics', topics({ config, db }));
  api.use('/topics/:topicId/comments', comments({config, db}))

  api.use('/users', users({config, db}))
  api.use('/auth', auth)

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}

const extractUser = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) { return next(err); }
    if (user) { req.user = user; }
    next();
   })(req, res, next);
};
