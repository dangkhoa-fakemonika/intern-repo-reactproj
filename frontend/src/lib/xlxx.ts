
import xlsx, { type IJsonSheet } from 'json-as-xlsx';

export type ExportPage = 'product' | 'user';

interface ExportConfig {
  url: string;
  sheet: string;
  fileName: string;
  columns: { label: string; value: string }[];
}


const EXPORT_CONFIG: Record<ExportPage, ExportConfig> = {
  product: {
    url: 'https://api.escuelajs.co/api/v1/products',
    sheet: 'Product',
    fileName: 'Products',
    columns: [
      { label: 'Product ID',    value: 'id'    },
      { label: 'Product Name',  value: 'title' },
      { label: 'Product Price', value: 'price' },
    ],
  },
  user: {
    url: 'https://api.escuelajs.co/api/v1/users',
    sheet: 'User',
    fileName: 'Users',
    columns: [
      { label: 'User ID',   value: 'id'    },
      { label: 'User Name', value: 'name'  },
      { label: 'Email',     value: 'email' },
    ],
  },
};


export async function downloadtoExcel(page: ExportPage) {

  const config = EXPORT_CONFIG[page];
  if (!config) {
    console.error(`No export config for page "${page}"`);
    return;
  }


  const resp = await fetch(config.url);
  if (!resp.ok) {
    console.error('Fetch error', resp.statusText);
    return;
  }
  const data = await resp.json();


  const sheets: IJsonSheet[] = [
    {
      sheet: config.sheet,
      columns: config.columns,
      content: data,
    },
  ];

  const settings = {
    fileName: config.fileName,
    extraLength: 3,      
    writeOptions: {},    
  };

 
  xlsx(sheets, settings);
}
