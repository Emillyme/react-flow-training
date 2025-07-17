import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schemas';
 
const sqliteClient = createClient({ url: 'file:sqlite.db' });
export const db = drizzle(sqliteClient, { schema });