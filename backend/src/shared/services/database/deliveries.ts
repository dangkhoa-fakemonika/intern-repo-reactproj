import {client} from "@/shared/services/database/client";
import {ObjectId} from "mongodb";

const database = client.db("user");
const deliveries = database.collection("deliveries");

export const readDeliveries = async (pagination? : {token : string, direction : string}, id? : string)=> {
  const pipeline = [];

  if (pagination) {
    pipeline.push({
      $search : {
        "index" : "deliveries-pagination",
        [pagination.direction] : pagination.token,
        "exists" : {
          "path" : "name"
        }
      }
    });
  }
  else {
    pipeline.push({
      $search : {
        "index" : "deliveries-pagination",
        "exists" : {
          "path" : "name"
        }
      }
    });
  }

  if (id){
    pipeline.push({
      $match : {
        ownerId : new ObjectId(id)
      }
    })
  }

  const result = await deliveries.find({}).toArray();
}

export const readDelivery = async (id : string)=> {
  const result = await deliveries.findOne({_id : new ObjectId(id)});
  if (result)
    return result;
  else
    return undefined;
}

export const updateDelivery = async (id : string, status : "Processing" | "Packaging" | "Delivering" | "Arrived") => {
  return await deliveries.updateOne({_id : new ObjectId(id)}, {status : status});
}

export const deleteDelivery = async (id : string) => {
  return await deliveries.deleteOne({_id : new ObjectId(id)});
}


