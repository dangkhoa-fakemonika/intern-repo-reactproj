import {FilterTable, ShopProductGrid} from "@/features/SearchAndFilter/components";
import {useState} from "react";
import type {FilterDataType} from "@/features/SearchAndFilter/common/types/filterData.ts";
import { FilterContext } from "@/features/SearchAndFilter/common/contexts/FilterContext.ts";

export function SearchAndFilter(){
  const [filterData, setFilterData] = useState<FilterDataType>({
    categories : [],
    price: ''
  });

  const updateFilterData = (filter: FilterDataType) => {
    setFilterData(filter);
  }

  return (
    <div className={"w-full"}>
      <FilterContext.Provider value={filterData}>
        <div className={"w-full flex flex-row"}>
          <FilterTable className={"w-1/5 mx-4 my-4"} setfilterdata={updateFilterData}/>
          {/*<div className={"w-full"}>*/}
            <ShopProductGrid/>
          {/*</div>*/}
        </div>
      </FilterContext.Provider>
    </div>
  )
}
