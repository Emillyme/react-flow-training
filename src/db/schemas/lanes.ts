import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// How usually are the tables and columns declaration for a schema:
// export const (TABLE NAME IN TYPESCRIPT) = pgTable (TABLE NAME IN DATABASE), {
// (COLUMN NAME IN TYPESCRIPT): (DATABASE TYPE)('DB COLUMN NAME')
//}

export const lanes = sqliteTable('lanes', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
});
