import { orderServices } from '../services/order.services';
import type { IOrder, Req, Res } from '../type/type';
import { extraRequestInfo, sendResponse } from '../utility';

export const orderRoute=async(req:Req,res:Res)=>{
    const {url,method,params,body}=await extraRequestInfo<Omit<IOrder,'id'>>(req)
    console.log(url)
    console.log(params)
    const id=params[1]
    console.log(id)
    if(method==='GET' && !id)
    {
       const order=  await orderServices.get()
       sendResponse(res,{message:order?'Not Found ':'Data Not Found',data:order},200)
       return
    }
    if(method ==='GET' && id)
    {
        const data =await orderServices.getById(id)
        sendResponse(res,{message:data?'Not Found ':'Data Not Found',data},data?200:404)
    }

 
   
    if(method === 'POST' )
    {    
         if (!body) {
             sendResponse(res, { message: 'Invalid request body', data: null }, 400)
             return
         }
          console.log('body',body)
         const result = await orderServices.create(body)
         sendResponse(res, { message: result ? 'Created' : 'Create failed', data: result }, result ? 201 : 400)
         return
    }

    if(method==='DELETE' && id)
    {
       const data=  await orderServices.delete(id)
       sendResponse(res,{message:data?'Deleted successfully':'Delete not success fully'},data?200:404)
       return
    }
   
}