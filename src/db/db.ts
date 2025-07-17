import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schemas'; 

console.log("opaaaaa")
const sqliteClient = new Database('sqlite.db');
export const db = drizzle(sqliteClient, { schema });
console.log("tchauuuuu")