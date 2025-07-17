import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { lanes } from './lanes';

// How usually are the tables and columns declaration for a schema:
// export const (TABLE NAME IN TYPESCRIPT) = pgTable (TABLE NAME IN DATABASE), {
// (COLUMN NAME IN TYPESCRIPT) : (DATABASE TYPE) ( DB COLUMN NAME)
//}

export const steps = sqliteTable('steps', {
  id: text('id').primaryKey(),
  laneId: text('lane_id').notNull().references(() => lanes.id),
  columnIndex: integer('column_index').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  time: text('time'),
  color: text('color'),
  technologies: text('technologies'),
});