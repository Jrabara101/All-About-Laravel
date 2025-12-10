# How to Add Songs with Images

## Step-by-Step Guide

### 1. Fill Out the Form

1. **Name**: Enter the artist/name (e.g., "ME:I")
2. **Song Name**: Enter the song title (e.g., "Ready Go")
3. **Profile pic**: Click "Choose File" or "Browse" button

### 2. Select Image File

When you click the file input:
- A file picker dialog will open
- Navigate to any folder on your computer (Desktop, Pictures, Downloads, etc.)
- Select an image file (JPG or PNG)
- Click "Open"

**Supported formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)

**File size limit:** 2MB maximum

### 3. Submit the Form

1. Click the "Add song" button
2. The form will show "Adding [name]..." while uploading
3. Once complete, the new song will appear in the list

## How It Works

1. **File Upload**: The image is uploaded to Laravel's storage
2. **Storage Location**: Files are stored in `storage/app/public/avatars/`
3. **URL Generation**: Laravel generates a public URL for the image
4. **Database**: Song data (name, trait, imageUrl) is saved to database
5. **Display**: The new song appears in the song list with the uploaded image

## Troubleshooting

### Image Not Showing

- Check browser console for errors
- Verify the image file is valid (try opening it in an image viewer)
- Check file size (must be under 2MB)
- Ensure file format is JPG or PNG

### Upload Fails

- Check Laravel server is running (`php artisan serve`)
- Verify storage link exists: `php artisan storage:link`
- Check Laravel logs: `storage/logs/laravel.log`

### File Picker Not Opening

- Make sure you're clicking the file input field
- Try refreshing the page
- Check browser console for JavaScript errors

## Example

1. Name: `"ME:I"`
2. Song Name: `"Ready Go"`
3. Image: Select `C:\Users\YourName\Desktop\mei-image.jpg`
4. Click "Add song"
5. Song appears in list with uploaded image!

