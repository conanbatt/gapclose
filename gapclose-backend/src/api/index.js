import { version } from '../../package.json';
import { Router } from 'express';
import topics from './topics';

export default ({ config, db }) => {
	let api = Router();

	api.use('/topics', topics({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
