import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import User from './models/user';
import dotenv from 'dotenv'
import cookieSession from 'cookie-session';
dotenv.config();

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.JWT_SECRET]
}))

app.use(passport.initialize({ session: false }))

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: (req)=>{
    if(req && req.session.jwt_token){
      return req.session.jwt_token;
    } else {
      return ExtractJwt.fromHeader('authorization')(req)
    }
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.username);
})

passport.deserializeUser(function(username, done) {
  User.findOne({ username: username })
  .then((user) => {
    return done(user)
  })
  .catch(done)
})

passport.use('jwt', new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findOne({ username: jwt_payload.id })
  .then(user => {
    if(user) return done(null, user)
    else return done(null, false)
  })
}))

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${process.env.PORT}`);
});

export default app;
