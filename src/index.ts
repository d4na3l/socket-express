import express, { Request, Response, Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './config/db';
import { Websocket } from './lib/intances/websocket';

// routes
import authRoutes from './routes/authRoutes'

dotenv.config();

connect();

const PORT = process.env.PORT || 8000;
const front_url = process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000'

const app: Application = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes)

const server = createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

const io = new Websocket(server, front_url);

io.mainHandler();