import config from './common/config';
import app from './app';
import { uncaughtException, unhandledRejection } from './middleware'

const { PORT } = config;

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', uncaughtException());
process.on('unhandledRejection', unhandledRejection());