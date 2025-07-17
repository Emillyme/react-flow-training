PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_connections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL,
	`label` text NOT NULL,
	`line_style` text,
	FOREIGN KEY (`start`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`end`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_connections`("id", "start", "end", "label", "line_style") SELECT "id", "start", "end", "label", "line_style" FROM `connections`;--> statement-breakpoint
DROP TABLE `connections`;--> statement-breakpoint
ALTER TABLE `__new_connections` RENAME TO `connections`;--> statement-breakpoint
PRAGMA foreign_keys=ON;