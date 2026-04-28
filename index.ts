import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import authRoutes from './routes/auth.routes';
import movieRoutes from './routes/movies.routes';
import watchlistRoutes from './routes/watchlist.routes';
import reviewRoutes from './routes/reviews.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/watchlist', watchlistRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => res.send('Movie Watchlist API is running'));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

export default app;