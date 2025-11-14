CREATE TABLE "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" varchar NOT NULL,
	"weekendPrice" varchar
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"date" varchar(50) NOT NULL,
	"meals" json,
	"otherItems" json DEFAULT '[]'::json,
	"total" varchar NOT NULL
);
