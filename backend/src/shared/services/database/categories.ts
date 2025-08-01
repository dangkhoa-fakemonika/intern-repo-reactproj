import {client} from "@/shared/services/database/client";
import {ObjectId} from "mongodb";
import {Category} from "@/shared/models/category";

const database = client.db("shop");
const categories = database.collection("categories");

export const readCategories = async (limit? : number, pagination? : {token: string, direction: "searchBefore" | "searchAfter"}) => {
  const pipeline = [];
  if (pagination){
    pipeline.push({
      $search : {
        "index" : "categories-pagination",
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
        "index" : "categories-pagination",
        "exists" : {
          "path" : "name"
        }
      }
    });
  }


  if (limit){
    pipeline.push({
      "limit" : limit
    });
  }

  pipeline.push({
    $project : {
      "_id" : 1,
      "name" : 1,
      "image" : 1,
      "paginationToken": {$meta: "searchSequenceToken"},
      "score": {$meta: "searchScore"}
    }
  })

  return await categories.aggregate(pipeline).toArray();
}

export const readCategory = async (id : string) => {
  const result = await categories.findOne({_id : new ObjectId(id)});
  if (result)
    return result;
  else return undefined;
}

export const insertCategory = async (category : Category) => {
  return await categories.insertOne({
    name : category.name,
    images : category.images
  });
}

export const updateCategory = async (id : string, category : Category) => {
  return await categories.updateOne({_id : new ObjectId(id)},{
    name : category.name,
    images : category.images
  })
}

export const deleteCategory = async (id : string) => {
  return await categories.deleteOne({_id : new ObjectId(id)});
}