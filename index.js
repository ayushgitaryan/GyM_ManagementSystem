const express= require('express');
const cookieParser=require('cookie-parser');

require('dotenv').config()

const app=express();

const PORT=process.env.PORT;

app.use(cookieParser());
app.use(express.json());

require('./Dbconn/conn');

const GymRoutes=require('./Routes/gym');
const MembershipRoutes=require('./Routes/membership');

const MemberRoutes=require('./Routes/member');

app.use('/auth',GymRoutes);
app.use('/plans',MembershipRoutes);
app.use('/members',MemberRoutes);



app.listen(PORT,()=>{
    console.log("Server is running on PORT 4000 successfully");
})