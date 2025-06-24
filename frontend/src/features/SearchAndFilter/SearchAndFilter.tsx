import {useCallback, useState} from "react";
import {convertToFilterQuery, type ProductFilter} from "@/shared/types/type.ts";
import {FilterTable, ShopProductGrid} from "@/features/SearchAndFilter/components";
import {useParams} from "react-router-dom";


export function SearchAndFilter(){
  const params = useParams();
  const [filterData, setFilterData] = useState<ProductFilter>({
    title: params.title,
    categoryId: parseInt(params.category_id ?? "-1")
  });

  const updateFilterData = useCallback((filter: ProductFilter) => {
    if (convertToFilterQuery(filter) !== convertToFilterQuery(filterData)) setFilterData(filter);
  }, [filterData]);

  return (
    <div className={"w-full"}>
      {/*<FilterContext.Provider value={filterData}>*/}
        <div className={"w-full flex flex-row"}>
          <FilterTable className={"w-1/5 mx-4 my-4"} setFilterData={updateFilterData}/>
          <ShopProductGrid filters={filterData}/>
        </div>
      {/*</FilterContext.Provider>*/}
    </div>
  )
}
