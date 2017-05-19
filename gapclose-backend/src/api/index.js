import { version } from '../../package.json';
import { Router } from 'express';
import topics from './topics';
import comments from './comments';

export default ({ config, db }) => {
	let api = Router();

	api.use('/topics', topics({ config, db }));
  api.use('/topics/:topicId/comments', comments({config, db}))

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
