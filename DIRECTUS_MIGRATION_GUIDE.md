# Directus Posts Collection Migration Guide

This guide will help you update your Directus posts collection with all the required fields for a blog.

## Prerequisites

- Access to your Directus admin panel at `https://strandly.onrender.com`
- Admin privileges in Directus
- Your Directus token: `V3r7sHG_DF_eCKIDOOKtXOZkZXebVWb2`

## Method 1: Using Directus Admin Panel (Recommended)

### Step 1: Access the Admin Panel
1. Go to `https://strandly.onrender.com/admin`
2. Log in with your admin credentials

### Step 2: Navigate to Posts Collection
1. In the left sidebar, click on "Content"
2. Find and click on "Posts" collection
3. Click on the "Settings" tab (gear icon)

### Step 3: Add Required Fields
Add each of the following fields by clicking "Add Field":

#### 1. Title Field
- **Field Name**: `title`
- **Type**: String
- **Interface**: Input
- **Required**: Yes
- **Note**: Post title

#### 2. Slug Field
- **Field Name**: `slug`
- **Type**: String
- **Interface**: Input
- **Required**: Yes
- **Note**: URL slug (auto-generated from title)
- **Options**: Check "Unique" and "Slug"

#### 3. Author Field
- **Field Name**: `author`
- **Type**: String
- **Interface**: Input
- **Required**: Yes
- **Note**: Author name

#### 4. Category Field
- **Field Name**: `category`
- **Type**: String
- **Interface**: Select Dropdown
- **Required**: Yes
- **Note**: Post category
- **Choices**: 
  - Technology
  - Business
  - Design
  - Marketing
  - Other

#### 5. Tags Field
- **Field Name**: `tags`
- **Type**: JSON
- **Interface**: Tags
- **Required**: No
- **Note**: Post tags

#### 6. Content Field (Update if exists)
- **Field Name**: `content`
- **Type**: Text
- **Interface**: WYSIWYG
- **Required**: Yes
- **Note**: Post content

#### 7. Featured Image Field
- **Field Name**: `featured_image`
- **Type**: UUID
- **Interface**: File Image
- **Required**: No
- **Note**: Featured image
- **Options**: Enable "Crop"

#### 8. Meta Title Field
- **Field Name**: `meta_title`
- **Type**: String
- **Interface**: Input
- **Required**: No
- **Note**: SEO meta title

#### 9. Meta Description Field
- **Field Name**: `meta_description`
- **Type**: Text
- **Interface**: Input Multiline
- **Required**: No
- **Note**: SEO meta description

#### 10. OG Image Field
- **Field Name**: `og_image`
- **Type**: UUID
- **Interface**: File Image
- **Required**: No
- **Note**: Open Graph image for social sharing
- **Options**: Enable "Crop"

#### 11. Published At Field (Update if exists)
- **Field Name**: `published_at`
- **Type**: Timestamp
- **Interface**: DateTime
- **Required**: Yes
- **Note**: Publication date and time

#### 12. Status Field
- **Field Name**: `status`
- **Type**: String
- **Interface**: Select Dropdown
- **Required**: Yes
- **Note**: Post status
- **Choices**:
  - Draft
  - Published
  - Archived

#### 13. Excerpt Field (Optional)
- **Field Name**: `excerpt`
- **Type**: Text
- **Interface**: Input Multiline
- **Required**: No
- **Note**: Post excerpt/summary

#### 14. Reading Time Field (Optional)
- **Field Name**: `reading_time`
- **Type**: Integer
- **Interface**: Input
- **Required**: No
- **Note**: Estimated reading time (minutes)
- **Options**: Min value = 1

#### 15. View Count Field (Optional)
- **Field Name**: `view_count`
- **Type**: Integer
- **Interface**: Input
- **Required**: No
- **Note**: Number of views
- **Options**: Min value = 0

### Step 4: Configure Collection Settings
1. In the collection settings, set:
   - **Display Template**: `{{title}}`
   - **Sort Field**: `published_at`
   - **Archive Field**: `status`
   - **Archive Value**: `archived`
   - **Unarchive Value**: `draft`

### Step 5: Set Up Permissions
1. Go to "Settings" → "Roles & Permissions"
2. Click on "Public" role
3. Add permission for "Posts" collection:
   - **Action**: Read
   - **Permissions**: `{"_and": [{"status": {"_eq": "published"}}]}`
   - **Fields**: `title,slug,author,category,tags,content,featured_image,excerpt,published_at,reading_time,view_count`

4. For "Authenticated" role, add permissions:
   - **Read**: All fields
   - **Create**: All fields
   - **Update**: All fields
   - **Delete**: All fields

## Method 2: Using SQL Migration (Advanced)

If you prefer to run the SQL migration directly:

1. Access your database directly
2. Run the SQL commands from `directus_posts_migration.sql`
3. Restart your Directus instance

## Method 3: Using Directus API

You can also use the Directus API to create fields programmatically:

```bash
# Example for creating the title field
curl -X POST "https://strandly.onrender.com/fields/posts" \
  -H "Authorization: Bearer V3r7sHG_DF_eCKIDOOKtXOZkZXebVWb2" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "title",
    "type": "string",
    "interface": "input",
    "required": true,
    "note": "Post title"
  }'
```

## Verification

After applying the migration:

1. Go to the Posts collection in your admin panel
2. Try creating a new post
3. Verify all required fields are present and working
4. Test the different field types (dropdowns, file uploads, etc.)

## Next Steps

Once the migration is complete, you can:

1. Create your first blog post
2. Set up your frontend to consume the Directus API
3. Configure any additional fields or relationships as needed
4. Set up automated slug generation
5. Configure image optimization for featured images

## Troubleshooting

If you encounter issues:

1. Check the Directus logs for any errors
2. Verify your database permissions
3. Ensure all field names are unique
4. Check that required fields have proper validation rules
5. Verify the collection exists before adding fields

## Support

If you need help with this migration, check:
- Directus documentation: https://docs.directus.io/
- Directus community: https://github.com/directus/directus/discussions

