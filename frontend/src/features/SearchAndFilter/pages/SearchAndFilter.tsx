import {useCallback, useState} from "react";
import {convertToFilterQuery, type ProductFilter} from "@/shared/types/type.ts";
import {FilterTable, ShopProductGrid} from "@/features/SearchAndFilter/components";
import {Popover} from "radix-ui";
import { FilterContext } from "@/features/SearchAndFilter/common/contexts/FilterContext";

export function SearchAndFilter(){
  console.log("Rerenders");
  const [filterData, setFilterData] = useState<ProductFilter>({});

  const updateFilterData = useCallback((filter: ProductFilter) => {
    if (convertToFilterQuery(filter) !== convertToFilterQuery(filterData)) setFilterData(filter);
  }, [filterData]);

  return (
    <div className={"w-full"}>
      <FilterContext.Provider value={filterData}>
        <div className={"w-full flex lg:flex-row flex-col"}>
          <FilterTable className={"w-1/5 mx-4 my-4 hidden lg:flex"} setFilterData={updateFilterData}/>
          <Popover.Root>
            <Popover.Trigger className={"bg-white w-fit z-50 lg:hidden"} asChild={true}>
              <div className={"bg-palette text-white p-2 rounded shadow"}>
                Bộ lọc
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
