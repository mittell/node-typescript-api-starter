import express, { Response, Request } from 'express';
import * as http from 'http';
import cors from 'cors';
import helmet from 'helmet';

// @ts-ignore
import { RegisterRoutes } from './routes';

import swaggerUi from 'swagger-ui-express';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

RegisterRoutes(app);

app.get('/', (req: express.Request, res: express.Response) => {
	res.status(200).send('Hello World!');
});

app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
	return res.send(
		// @ts-ignore
		swaggerUi.generateHTML(await import('../dist/swagger.json'))
	);
});

export default server.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});
