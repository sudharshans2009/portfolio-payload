import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`,
  );
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `);
  await db.run(
    sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`,
  );
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`position\` text NOT NULL,
  	\`review\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`rating\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`reviews_image_idx\` ON \`reviews\` (\`image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`reviews_updated_at_idx\` ON \`reviews\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`reviews_created_at_idx\` ON \`reviews\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_tags_order_idx\` ON \`projects_tags\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_tags_parent_id_idx\` ON \`projects_tags\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`demo_url\` text NOT NULL,
  	\`github_url\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_image_idx\` ON \`projects\` (\`image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`services_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`services_tags_order_idx\` ON \`services_tags\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`services_tags_parent_id_idx\` ON \`services_tags\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`example_url\` text NOT NULL,
  	\`learn_more_url\` text NOT NULL,
  	\`rating\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`rate_limits\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`timestamp\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`rate_limits_key_idx\` ON \`rate_limits\` (\`key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`rate_limits_updated_at_idx\` ON \`rate_limits\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`rate_limits_created_at_idx\` ON \`rate_limits\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`faqs_id\` integer,
  	\`reviews_id\` integer,
  	\`projects_id\` integer,
  	\`services_id\` integer,
  	\`rate_limits_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reviews_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`rate_limits_id\`) REFERENCES \`rate_limits\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_rate_limits_id_idx\` ON \`payload_locked_documents_rels\` (\`rate_limits_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  );
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users\`;`);
  await db.run(sql`DROP TABLE \`media\`;`);
  await db.run(sql`DROP TABLE \`faqs\`;`);
  await db.run(sql`DROP TABLE \`reviews\`;`);
  await db.run(sql`DROP TABLE \`projects_tags\`;`);
  await db.run(sql`DROP TABLE \`projects\`;`);
  await db.run(sql`DROP TABLE \`services_tags\`;`);
  await db.run(sql`DROP TABLE \`services\`;`);
  await db.run(sql`DROP TABLE \`rate_limits\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_migrations\`;`);
}
