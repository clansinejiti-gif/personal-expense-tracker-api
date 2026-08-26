import express from 'express'
import categoryRoutes from './routes/categoryRoutes.js';
app.use('/categories', categoryRoutes);
const app = express();
const port = 3000;

app.get('/health', (req, res) =>{
    res.send({message:"Server health good"});

} )

app.listen(port, ()=>{
    console.log(`server running on: http://localhost:${port}`)
})