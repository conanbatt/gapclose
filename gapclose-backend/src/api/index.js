import { version } from '../../package.json';
import { Router } from 'express';
import topics from './topics';
import comments from './comments';
import users from './users';
import auth from './auth';

export default ({ config, db }) => {
	let api = Router();

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
