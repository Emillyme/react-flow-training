import { boolean } from 'drizzle-orm/gel-core';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { steps } from './steps';

// How usually are the tables and columns declaration for a schema:
// export const (TABLE NAME IN TYPESCRIPT) = pgTable (TABLE NAME IN DATABASE), {
// (COLUMN NAME IN TYPESCRIPT): (DATABASE TYPE)('DB COLUMN NAME')
//}

export const connections = sqliteTable('connections', {
    id: integer().primaryKey({ autoIncrement: true }),
    start: text('start').notNull().references(() => steps.id),
    end: text('end').notNull().references(() => steps.id),
    label: text('label').notNull(),
    lineStyle: text('line_style')
});
