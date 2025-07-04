import {useCallback, useState} from "react";
import {convertToFilterQuery, type ProductFilter} from "@/shared/types/type.ts";
import {FilterTable, ShopProductGrid} from "@/features/SearchAndFilter/components";
import {Popover} from "radix-ui";
import { FilterContext } from "@/features/SearchAndFilter/common/contexts/FilterContext";
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
      <FilterContext.Provider value={filterData}>
        <div className={"w-full flex lg:flex-row flex-col"}>
          <FilterTable className={"w-1/5 mx-4 my-4 hidden lg:flex"} setFilterData={updateFilterData}/>
          <Popover.Root>
            <Popover.Trigger className={"w-fit z-50 lg:hidden m-2"} asChild={true}>
              <div className={"bg-palette text-white p-2 rounded shadow"}>
                Filters
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className={"bg-white shadow-2xl ml-4 p-4 rounded border z-50"}>
                <FilterTable setFilterData={updateFilterData} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <ShopProductGrid filters={filterData}/>
        </div>
      </FilterContext.Provider>
    </div>
  )
}
