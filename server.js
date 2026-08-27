import express from 'express'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
app.use('/categories', categoryRoutes);
import {errorHandler} from './middlewares/errorHandler.js'
const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)

app.get('/health', (req, res) =>{
    res.send({message:"Server health good"});

} )

app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server running on: http://localhost:${port}`)
})