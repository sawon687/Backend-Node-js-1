import path from "node:path";
import fs from "fs/promises";
import type { IOrder } from "../type/type";


const Path_DB = path.join(process.cwd(), "src", "data", "order.data.json");

class OrderService {
  // readData
 private async readData(): Promise<IOrder[]> {
    try {
        const data = await fs.readFile(Path_DB, "utf-8");
    
        return JSON.parse(data)
    } catch  {
      
           
           return []
     }        
    }
  

 private async writeData(data:IOrder[])
  {
      await fs.writeFile(Path_DB,JSON.stringify(data,null,2))
  }
async create(order:Omit<IOrder,'id'>){
    const data=await this.readData()
   const newData={
      ...order,
      id:String(Math.floor( Math.random() * 100))
   }
 
   data.push(newData)

    await this.writeData(data)
    return true

}
  async  get():Promise<IOrder[]> {
    const data= await this.readData()
    return data;
  }
    // singal order
  async getById(id:String):Promise<IOrder|null>{
     const data=await this.readData()
     return data.find(order=> order.id === id)||null
  }
  async delete(id:string):Promise<boolean>{
      const data=await this.readData()
      const index=data.findIndex((order)=> order.id===id)
      if(index===-1)return false

      data.splice(index,1)

      await this.writeData(data)
      return true
  }
}

export const orderServices = new OrderService();

