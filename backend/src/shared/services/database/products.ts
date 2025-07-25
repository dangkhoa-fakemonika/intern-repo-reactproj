import {client} from "@/shared/services/database/client";
import {ProductFilters} from "@/shared/models/product";

const database = client.db("shop");
const products = database.collection("products");

export const readProducts = async (filters?: ProductFilters) => {

  const pipeline = [
    {
      $search: {
        "index": "products-pagination",
        "text": {
          "path": "title",
          "query": filters?.title
        }
      }
    },
    {
      $limit: 10
    },
    {
      $project: {
        "_id": 0,
        "title": 1,
        "description": 1,
        "price": 1,
        "paginationToken": {$meta: "searchSequenceToken"},
        "score": {$meta: "searchScore"}
      }
    }
  ];

  const result = await products.aggregate(pipeline).toArray();
  console.log(result);
  return result;
}