CREATE TABLE `lanes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` text PRIMARY KEY NOT NULL,
	`lane_id` text NOT NULL,
	`column_index` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`order` integer NOT NULL,
	`time` text,
	`color` text,
	`technologies` text,
	FOREIGN KEY (`lane_id`) REFERENCES `lanes`(`id`) ON UPDATE no action ON DELETE no action
);
