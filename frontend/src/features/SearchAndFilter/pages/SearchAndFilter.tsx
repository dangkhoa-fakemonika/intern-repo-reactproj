import {FilterTable, ShopProductGrid} from "@/features/SearchAndFilter/components";
import {useCallback, useState} from "react";
import { FilterContext } from "@/features/SearchAndFilter/common/contexts/FilterContext.ts";
import type {ProductFilter} from "@/shared/types/product-filter.ts";

export function SearchAndFilter(){
  const [filterData, setFilterData] = useState<ProductFilter>({});

  const updateFilterData = useCallback((filter: ProductFilter) => {
    setFilterData(filter);
  }, []);

  return (
    <div className={"w-full"}>
      <FilterContext.Provider value={filterData}>
        <div className={"w-full flex flex-row"}>
          <FilterTable className={"w-1/5 mx-4 my-4"} setfilterdata={updateFilterData}/>
          <ShopProductGrid/>
        </div>
      </FilterContext.Provider>
    </div>
  )
}
