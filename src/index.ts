import express = require('express');
import { mongoConnect } from './mongo-connect';

(async () => {
	// Express app config
	const app = express();
	const mongoUrl = 'mongodb+srv://test:test@cluster0-9igoz.mongodb.net/test?retryWrites=true&w=majority';
	const port = process.env.PORT || 3000;

	// Allow Cross Domain Requests
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
		res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
		next();
	});

	let getGames = async (req: any, res: any) => {
		const { mongoDb, mongoClient } = await mongoConnect(mongoUrl, 'game');

		let gamePromise = () => {
			return new Promise((resolve, reject) => {
				mongoDb
					.collection('games')
					.find({})
			});
		}

		let callGamePromise = async () => {
			try {
				let result = await gamePromise();
				return result;
			}
			catch (err) {
				res.status(500).send({status: "Error", error: err});
				return;
			}
		}

		const result = await callGamePromise();
		try {
			await mongoClient.close()
		}
		catch (err) {
			res.status(500).send({status: "Error", error: err});
		}

		res.json(result);
	}

	// API endpoints for games
	app.get('/api/games/:day/:month/:year', getGames);

	app.listen(port, function () {
		console.log(`Server started, listening on ${port}.`);
	});
});