import {createContext, useContext} from 'react';
import type {ProductFilter} from "@/shared/types/product-filter.ts";

export const FilterContext = createContext<ProductFilter | undefined>(undefined);

export function useFilterContext(){
  const context = useContext(FilterContext);

  if (context === undefined){
    throw Error("No filter.");
  }

  return context;
}
