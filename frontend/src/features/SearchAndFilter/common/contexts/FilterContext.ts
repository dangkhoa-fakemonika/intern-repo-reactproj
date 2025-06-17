import {createContext, useContext} from 'react';
import type {FilterDataType} from "@/features/SearchAndFilter/common/types/filterData.ts";

export const FilterContext = createContext<FilterDataType | undefined>(undefined);

export function useFilterContext(){
  const context = useContext(FilterContext);

  if (context === undefined){
    throw Error("No filter.");
  }

  return context;
}
