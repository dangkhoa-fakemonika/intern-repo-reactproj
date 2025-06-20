type ProductFilter = {
  title? : string,
  price? : number,
  price_min? : number,
  price_max? :number,
  categoryId? : number,
  categorySlug? : string
}

function convertToFilterQuery(filter : ProductFilter) {
  const query = Object.entries(filter).filter(key => (String(key[1]) !== "NaN") && key[1] != undefined && key[1] != -1 && String(key[1]).length !== 0).map((key) => `${key[0]}=${"" + key[1]}`).join("&");
  console.log(query);
  return query;
}

export {type ProductFilter, convertToFilterQuery};
