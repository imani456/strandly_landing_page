-- Migration to add blog fields to posts collection
-- Run this in your Directus admin panel or via API

-- Add the required fields to the posts collection
-- Note: This assumes you're using Directus with a database backend

-- 1. Add title field (String, required)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'title', 'string', 'input', 1, 'raw', 0, 0, 1, 'full', NULL, NULL, 'Post title', NULL, '{"trim": true}', NULL, NULL);

-- 2. Add slug field (String, required, unique)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'slug', 'string', 'input', 1, 'raw', 0, 0, 2, 'full', NULL, NULL, 'URL slug (auto-generated from title)', NULL, '{"trim": true, "slug": true}', '{"unique": true}', NULL);

-- 3. Add author field (String, required)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'author', 'string', 'input', 1, 'raw', 0, 0, 3, 'full', NULL, NULL, 'Author name', NULL, '{"trim": true}', NULL, NULL);

-- 4. Add category field (String, required)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'category', 'string', 'select-dropdown', 1, 'raw', 0, 0, 4, 'full', NULL, NULL, 'Post category', NULL, '{"choices": [{"text": "Technology", "value": "technology"}, {"text": "Business", "value": "business"}, {"text": "Design", "value": "design"}, {"text": "Marketing", "value": "marketing"}, {"text": "Other", "value": "other"}]}', NULL, NULL);

-- 5. Add tags field (JSON, optional)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'tags', 'json', 'tags', 0, 'raw', 0, 0, 5, 'full', NULL, NULL, 'Post tags', NULL, '{"preset": "basic"}', NULL, NULL);

-- 6. Update content field (if it exists, make it required and change interface to WYSIWYG)
UPDATE directus_fields 
SET required = 1, interface = 'wysiwyg', note = 'Post content'
WHERE collection = 'posts' AND field = 'content';

-- If content field doesn't exist, create it
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
SELECT 'posts', 'content', 'text', 'wysiwyg', 1, 'raw', 0, 0, 6, 'full', NULL, NULL, 'Post content', NULL, NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM directus_fields WHERE collection = 'posts' AND field = 'content');

-- 7. Add featured_image field (File, optional)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'featured_image', 'uuid', 'file-image', 0, 'file', 0, 0, 7, 'full', NULL, NULL, 'Featured image', NULL, '{"crop": true}', NULL, NULL);

-- 8. Add meta_title field (String, optional)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'meta_title', 'string', 'input', 0, 'raw', 0, 0, 8, 'full', NULL, NULL, 'SEO meta title', NULL, '{"trim": true}', NULL, NULL);

-- 9. Add meta_description field (Text, optional)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'meta_description', 'text', 'input-multiline', 0, 'raw', 0, 0, 9, 'full', NULL, NULL, 'SEO meta description', NULL, '{"trim": true}', NULL, NULL);

-- 10. Add og_image field (File, optional)
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'og_image', 'uuid', 'file-image', 0, 'file', 0, 0, 10, 'full', NULL, NULL, 'Open Graph image for social sharing', NULL, '{"crop": true}', NULL, NULL);

-- 11. Update published_at field (if it exists, make it required and change interface to datetime)
UPDATE directus_fields 
SET required = 1, interface = 'datetime', note = 'Publication date and time'
WHERE collection = 'posts' AND field = 'published_at';

-- If published_at field doesn't exist, create it
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
SELECT 'posts', 'published_at', 'timestamp', 'datetime', 1, 'datetime', 0, 0, 11, 'full', NULL, NULL, 'Publication date and time', NULL, NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM directus_fields WHERE collection = 'posts' AND field = 'published_at');

-- 12. Add status field (String, required) - for draft/published states
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'status', 'string', 'select-dropdown', 1, 'raw', 0, 0, 12, 'full', NULL, NULL, 'Post status', NULL, '{"choices": [{"text": "Draft", "value": "draft"}, {"text": "Published", "value": "published"}, {"text": "Archived", "value": "archived"}]}', NULL, NULL);

-- 13. Add excerpt field (Text, optional) - for post summaries
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'excerpt', 'text', 'input-multiline', 0, 'raw', 0, 0, 13, 'full', NULL, NULL, 'Post excerpt/summary', NULL, '{"trim": true}', NULL, NULL);

-- 14. Add reading_time field (Integer, optional) - estimated reading time in minutes
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'reading_time', 'integer', 'input', 0, 'raw', 0, 0, 14, 'half', NULL, NULL, 'Estimated reading time (minutes)', NULL, '{"min": 1}', NULL, NULL);

-- 15. Add view_count field (Integer, optional) - for tracking post views
INSERT INTO directus_fields (collection, field, type, interface, required, display, readonly, hidden, sort, width, group, NULL, translations, note, conditions, options, validation, validation_message) 
VALUES ('posts', 'view_count', 'integer', 'input', 0, 'raw', 0, 0, 15, 'half', NULL, NULL, 'Number of views', NULL, '{"min": 0}', NULL, NULL);

-- Update the collection settings
UPDATE directus_collections 
SET 
    note = 'Blog posts collection',
    display_template = '{{title}}',
    sort_field = 'published_at',
    archive_field = 'status',
    archive_value = 'archived',
    unarchive_value = 'draft',
    archive_app_filter = 1
WHERE collection = 'posts';

-- Create permissions for the posts collection (adjust as needed)
-- These are basic permissions - you may want to customize based on your needs

-- Allow public read access to published posts
INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
VALUES ('public', 'posts', 'read', '{"_and": [{"status": {"_eq": "published"}}]}', NULL, NULL, 'title,slug,author,category,tags,content,featured_image,excerpt,published_at,reading_time,view_count');

-- Allow authenticated users to read all posts
INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
VALUES ('authenticated', 'posts', 'read', '{}', NULL, NULL, '*');

-- Allow authenticated users to create posts
INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
VALUES ('authenticated', 'posts', 'create', '{}', NULL, NULL, '*');

-- Allow authenticated users to update their own posts (you may want to add user_id field for this)
INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
VALUES ('authenticated', 'posts', 'update', '{}', NULL, NULL, '*');

-- Allow authenticated users to delete their own posts
INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
VALUES ('authenticated', 'posts', 'delete', '{}', NULL, NULL, '*');

