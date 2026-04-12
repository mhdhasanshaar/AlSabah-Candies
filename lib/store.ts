import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'store.json');

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface StoreData {
  banner: string;
  products: Product[];
}

export function getStoreData(): StoreData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading store data:', error);
    return { banner: '', products: [] };
  }
}

export function saveStoreData(data: StoreData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving store data:', error);
  }
}
