const express = require('express');
const dotenv =require('dotenv')
const connectionDb =require('./lib/dbConnection')
const user_route =require('./routes/User-router') 
const task_route =require('./routes/Task-router') 
const event_route =require('./routes/Event-router') 
const invitation_route =require('./routes/Invitation-router')
const ai_route=require('./routes/ai')
const glopalError =require('./middlewares/Error-middleware')
const app =express();
app.use(express.json()); 
dotenv.config();

const cors = require('cors');
const allowedOrigins = [
    'http://localhost:3000',
    'https://event-verse-xi.vercel.app',
    
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
//routers
app.use('/uploads', express.static('uploads'));
app.use('/user',user_route);
app.use('/tasks',task_route);
app.use('/events',event_route);
app.use('/invitations',invitation_route);
// AI route
app.use('/Ai',ai_route);

app.use(glopalError)
app.listen(8000,()=>{
    console.log("Connected successfully on port 8000");
    connectionDb();
    })

