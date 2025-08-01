import {client} from "@/shared/services/database/client";
import {Product, ProductFiltersOptions} from "@/shared/models/product";
import {ObjectId} from "mongodb";

const database = client.db("shop");
const products = database.collection("products");

export const readProducts = async (filters?: ProductFiltersOptions, pagination? : {token: string, direction: "searchBefore" | "searchAfter"}) => {
  if (filters === undefined)
    return await products.find({}).toArray();

  const pipeline = [];

  if (filters.title){
    if (pagination){
      pipeline.push({
        $search: {
          "index": "products-pagination",
          "text": {
            "path": "title",
            "query": filters.title
          },
          [pagination.direction] : pagination.token,
          "sort" : {
            "score" : {
              $meta : "searchScore",
            }
          }
        }
      });
    }
    else {
      pipeline.push({
        $search: {
          "index": "products-pagination",
          "text": {
            "path": "title",
            "query": filters.title
          },
          "sort" : {
            "score" : {
              $meta : "searchScore",
            }
          }
        }
      });
    }
  }
  else {
    pipeline.push({
      $search: {
        "index": "products-pagination",
        "exists": {
          "path": "title"
        },
      }
    });
  }

  if (filters.price){
    pipeline.push({
      $match : {
        price : filters.price
      }
    });
  }
  else if (filters.price_max && filters.price_min){
    pipeline.push({
      $match : {
        price : {
          $gte : filters.price_min,
          $lte : filters.price_max
        }
      }
    })
  }
  else if (filters.price_max){
    pipeline.push({
      $match : {
        price : {
          $lte : filters.price_max
        }
      }
    })
  }
  else if (filters.price_min){
    pipeline.push({
      $match : {
        price : {
          $gte : filters.price_min,
        }
      }
    })
  }

  if (filters.limit){
    pipeline.push({
      $limit: filters.limit
    });
  }

  pipeline.push({
    $lookup : {
      from : "categories",
      localField : "categoryId",
      foreignField : "_id",
      as : "category"
    }
  });

  pipeline.push({
    $unwind : "$category"
  })

  pipeline.push({
    $project: {
      "_id": 1,
      "title": 1,
      "description": 1,
      "price": 1,
      "categoryId" : 1,
      "category" : 1,
      "images" : 1,
      "paginationToken": {$meta: "searchSequenceToken"},
      "score": {$meta: "searchScore"}
    }
  });

  return await products.aggregate(pipeline).toArray();
}

export const insertProduct = async (product : Product) => {
  const result = await products.insertOne({
    title : product.title,
    description : product.description,
    price : product.price,
    categoryId : new ObjectId(product.categoryId)
  });
}


export const updateProduct = async (productId : string, product : Product) =>{
  const result = await products.updateOne(
    {_id : new ObjectId(productId)},
    {
      title : product.title,
      description : product.description,
      price : product.price,
      categoryId : new ObjectId(product.categoryId)
    });
}

export const deleteProduct = async (productId : string) => {
  const result = await products.deleteOne({_id : new ObjectId(productId)});
}

export const readProduct = async (productId : string) => {
  const result = await products.findOne({_id : new ObjectId(productId)});
  if (result === null)
    return undefined;
  return result;
}

