require('dotenv').config();

const express=require('express');
const app=express();
const mongoose = require('mongoose');
const connectDB=require('./config/dbConn');
const PORT=process.env.PORT || 4000;
const cors=require('cors');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const secret="d75ba2a445afb34ac6c0f9764010c0b37682cf735b0323e13c0b37381f9fdc4a44d8004bbf8904b9262c8e921754473b41acfeb6f5ad73a50955c51de7cf3e05";
const saltRound=10;
const {Server} =require("socket.io");
const server=require('http').createServer(app);


const User=require('./model/user');
const Review=require('./model/review');
const PullRequest=require('./model/pullrequest');
const Approval=require('./model/approval');
const { appRouter } = require('./modules/index.routes');
const { authRouter } = require('./modules/Auth/auth.routes');
const {init, getIo} =require('./config/socketConn');
const { requestRouter } = require('./modules/Request/request.routes');
const { userRouter } = require('./modules/User/user.routes');
const { verifyToken } = require('./middleware/verifyToken');

app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

init(server);



// const io=new Server(server,{
//     connectionStateRecovery: {},
//     cors:{
//         origin: 'http://localhost:3000',
//     },
//     credentials:'include',
//     methods:["GET","POST"],
// })



// app.get('/profile',(req,res)=>{
//     const {token}=req.cookies;
//     if(!token) res.json(null);
//     jwt.verify(token,secret,{},(err,info)=>{
//         if(err) throw err;
//         res.json(info);
//     })
// })

// app.post('/register',async (req,res)=>{
//     const {username,email,password}=req.body;
//     try{
//         const salt=await bcrypt.genSalt(saltRound);
//         const hshpwd=await bcrypt.hash(`${password}`,`${salt}`);
//         const userDoc=await User.create({username,email,password:hshpwd});
//         res.json(userDoc);
//     }catch(err){
//         console.log(err);
//         res.status(400).send(err);
//     }
// })

// app.post('/login',async(req,res)=>{
//     const {username,password}=req.body;
//     const findUser=await User.findOne({username});
//     if(!findUser) return res.status(400).send('NO user found');
//     const passcheck=await bcrypt.compare(`${password}`,findUser.password);
//     if(passcheck){
//         const token=jwt.sign(
//             {username,id:findUser._id},
//             secret,
//             {}
//         );
//         return res.cookie('token',token).json({username,id:findUser._id});
//     }else{
//         return res.sendStatus(400);
//     }
// })

// app.use('/auth', authRouter);

// app.post('/logout',(req,res)=>{
//     res.cookie('token','').json('ok');
// })



// app.get('/pull-request',async (req,res)=>{
//     const {token}=req.cookies;

//     res.json(await PullRequest.find()
//     .populate('requesterId',['username'])
//     .sort({createdAt:-1})
//     .limit(50)
//     );
// })

// app.get('/pull-request/:id',async(req,res)=>{
//     const {id}=req.params;
//     const postDoc=await PullRequest.findById(id)
//                         .populate('requesterId',['username'])
//                         .populate({
//                             path: 'approvers.approverId', // Adjust the path based on your schema
//                             model:'User',
//                             select: 'username email' // Specify the fields you want to select from the User model
//                         }).populate({
//                             path:'comments',
//                             model:'Review',
//                             populate:{
//                                 path:'reviewerId',
//                                 model:'User',
//                                 select:'username',
//                             },
//                         }).populate({
//                             path:'approvals',
//                             model:'Approval',
//                             populate:{
//                                 path:'approverId',
//                                 model:'User',
//                                 select:'username',
//                             },
//                         })
//     res.json(postDoc);
// })


///////////////////////////////////////
///////////////////////////////////////
//// SOCKETS ARE WORKING FROM HERE ////
///////////////////////////////////////
///////////////////////////////////////

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     console.log(socket.id);

    
//     // function handleParallel(userIds){
//     //     userIds.forEach(user=>{
//     //         io.emit(`newRequest${user.approverId}`,user.approverId);
//     //     })
//     // }

//     // function handleSequential(userIds,docs){
//     //     console.log(docs.counter);
//     //     if (docs.counter >= userIds.length) {
//     //         console.log("All users have been notified");
//     //         return;
//     //     }
//     //     const userId = userIds[docs.counter].approverId;
//     //     io.emit(`sender${userId}`, userIds[docs.counter].approverId);
//     // }

//     // app.get('/getUsers',async(req,res)=>{
//     //     const {token}=req.cookies;
//     //     jwt.verify(token,secret,{},async(err,info)=>{
//     //         if(err) throw err;
//     //         const getUser=await User.find();
//     //         res.status(200).json(getUser);
//     //     })
//     // })

//     // app.post('/pull-request',async(req,res)=>{
//     //     const {title,content,processed,checker}=req.body;
//     //     const {token}=req.cookies;
//     //     jwt.verify(token,secret,{},async(err,info)=>{
//     //         if(err) throw err;
//     //         const approversArray = await getApproversAndRequesters(checker);
//     //         if(title){
//     //         const userDoc=await PullRequest.create({
//     //             title,
//     //             description:content,
//     //             requesterId:info.id,
//     //             comments:[],
//     //             approvals:[],
//     //             processed,
//     //             approvers:approversArray,
//     //         })
            
//     //         if(processed==='parallel'){
//     //             handleParallel(approversArray);
//     //         }else if(processed==='sequential'){
//     //             handleSequential(approversArray,userDoc);
//     //         }

//     //         res.json(userDoc);}
//     //         else res.json('no response');
//     //     })
//     // })

//     app.delete('/pull-request/:id',async(req,res)=>{
//         const {id}=req.params;
//         const {token}=req.cookies;
//         jwt.verify(token,secret,{},async (err,info)=>{
//             if(err) throw err;
//             const postDoc=await PullRequest.findById(id);
//             const isAuthor=JSON.stringify(info.id)===JSON.stringify(postDoc.requesterId);
            
//             await Review.deleteMany({ _id: { $in: postDoc.comments } });
//             await Approval.deleteMany({ _id: { $in: postDoc.approvals } });
//             await PullRequest.deleteOne({ _id: id });
//             res.status(200).json('ok');
//         })  
//     })

//     app.put('/pull-request/:id',async(req,res)=>{
//         const {id}=req.params;
//         const {token}=req.cookies;
//         jwt.verify(token,secret,{},async (err,info)=>{
//             if(err) throw err;
//             const {title,content}=req.body;
//             const postDoc=await PullRequest.findById(id);
//             const isAuthor=JSON.stringify(info.id)===JSON.stringify(postDoc.requesterId);
//             if(!isAuthor){
//                 return res.status(400).send('not valid user');
//             }
//             await postDoc.updateOne({
//                 $set: {
//                     title, 
//                     description:content,
//                     requesterId: info.id,
//                     comments: postDoc.comments,
//                     approvers:postDoc.approvers,
//                     approvals:postDoc.approvals,
//                     status:postDoc.status,
//                 }
//             })
//             res.json(postDoc);
//         })
//     })

//     app.post('/pull-request/:id/comments',async(req,res)=>{
//         const {comment}=req.body;
//         const {id}=req.params;
//         const {token}=req.cookies;
//         if(!token) return res.status(401).json('login first');

//         jwt.verify(token,secret,{},async(err,info)=>{
//             if(err) throw err;
//             const postDoc=await PullRequest.findById(id);
//             const newComment= await Review.create({
//                 pullRequestId:id,
//                 reviewerId:info.id,
//                 comments:comment,
//             })
//             postDoc.comments.push(newComment);
//             await postDoc.save();
//             res.status(200).json(comment);
//         })
//     })

//     app.post('/pull-request/:id/approvals',async(req,res)=>{
//         const {status}=req.body;
//         const {id}=req.params;
//         const {token}=req.cookies;
//         if(!token) return res.status(401).json('login first');

//         jwt.verify(token,secret,{},async(err,info)=>{
//             if(err) throw err;
//             const postDoc=await PullRequest.findById(id);
//             const newApproval= await Approval.create({
//                 pullRequestId:id,
//                 approverId:info.id,
//                 counter:(postDoc.counter)++,
//                 status:status,
//             })
//             postDoc.approvals.push(newApproval);
//             await postDoc.save();

//             if(status==='Approved'){
//                 postDoc.approvers.forEach((approver) => {
//                     if (JSON.stringify(info.id)===JSON.stringify(approver.approverId)) {
//                         approver.status = 'Approved';
//                         if(postDoc.processed==='sequential'){
//                             handleSequential(postDoc.approvers,postDoc);
//                         }
//                     }
//                 });
            
                
//                 let flag=false;
//                 postDoc.approvers.forEach((approver)=>{
//                     if(approver.status==="Pending"){
//                         flag=true;
//                     }
//                 })
//                 if(flag==false){
//                     postDoc.status="Approved";
//                 }
//                 postDoc.save();
//             }

//             if(status==='Rejected'){
//                 postDoc.approvers.forEach((approver) => {
//                     if (JSON.stringify(info.id)===JSON.stringify(approver.approverId)) {
//                     approver.status = 'Rejected';
//                     }
//                 });

//                 postDoc.status="Rejected";
//                 postDoc.save();
//             }
           
//             res.status(200).json(newApproval); 
//         })
//     })

//     socket.on('disconnect', () => {
//         console.log('a user disconnected');
//     });
// });

// app.use('/auth', authRouter);

// app.use('/request', verifyToken ,requestRouter);

// app.use('/user',verifyToken, userRouter);
app.use('/', appRouter);

// global error handler
app.use((error, req, res, next) => {
	if (process.env.NODE_ENV !== 'production') {
		// logger.log(error);
        console.log(error);
	}
	let message = null;
	let status = 500;
	if (error.errors) {
		const ve = error;
		ve.message = 'Validation Error';
		return res.status(400).send(ve);
	}
	if (error instanceof Object) {
		if (error.message && error.status && error) {
			message = {
				message: error.message,
				// stack: stringifyError(error),
			};
			status = error.status;
		} else
			message = {
				message: 'Internal Server Error',
				// stack: stringifyError(error),
			};
	} else if (typeof error === 'string' && !error.includes('Error')) {
		message = {
			message: error,
		};
	} else {
		message = {
			message: 'Internal Server Error',
			// stack: stringifyError(error),
		};
	}
	return res.status(status).send(message);
});

mongoose.connection.once('open',()=>{
    server.listen(PORT, ()=>{console.log(`server is running at port ${PORT}`)});
    console.log(`connected to DB`);
})
