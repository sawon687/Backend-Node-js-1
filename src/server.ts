import { createServer, Server } from 'http';
import type {  Req, Res } from './type/type';
import { sendResponse } from './utility';
import { orderRoute } from './routes/order.route';

const server:Server=createServer(async(req,res)=>{
    const url=req.url?? '/';
   
   if(url ==='/')
   {
      sendResponse(res,{message:'server is running foodepanda'},200)
      return
   }
   if(url?.startsWith('/order'))
   {
     await orderRoute(req as Req, res as Res)
      return
   }

   sendResponse(res,{message:'Not Found'},404)
})

server.listen(3000,()=>{
    console.log('server is runnig in 3000')
})