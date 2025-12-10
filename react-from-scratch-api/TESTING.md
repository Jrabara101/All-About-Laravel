# Testing Guide for React + Laravel App

## Prerequisites

1. **XAMPP is running** (Apache and MySQL)
2. **Virtual host configured** (`react-backend.test` pointing to your Laravel API)
3. **Database is set up** (migrations run, storage link created)

---

## Part 1: Testing Laravel API

### Step 1: Verify Database Setup

```bash
cd react-from-scratch-api

# Check if migrations are run
php artisan migrate:status

# If not migrated, run migrations
php artisan migrate

# Create storage link for file uploads
php artisan storage:link
```

### Step 2: Test API Routes Directly in Browser

Open these URLs in your browser:

1. **Get all songs:**
   ```
   http://react-backend.test/react-from-scratch-api/api/songs
   ```
   OR (if virtual host points directly to API folder):
   ```
   http://react-backend.test/api/songs
   ```

   **Expected Response:**
   ```json
   {
     "data": [
       {
         "id": 1,
         "name": "Song Name",
         "trait": "Song Trait",
         "imageUrl": "/storage/avatars/...",
         "likedBy": []
       }
     ]
   }
   ```

2. **Health Check:**
   ```
   http://react-backend.test/react-from-scratch-api/up
   ```
   Should return: `{"status":"ok"}`

### Step 3: Test API with cURL (Command Line)

**Get all songs:**
```bash
curl -X GET "http://react-backend.test/react-from-scratch-api/api/songs" \
  -H "Accept: application/json"
```

**Toggle like (replace {id} with actual song ID):**
```bash
curl -X PATCH "http://react-backend.test/react-from-scratch-api/api/songs/1/like" \
  -H "Accept: application/json"
```

**Create song (with file upload):**
```bash
curl -X POST "http://react-backend.test/react-from-scratch-api/api/songs" \
  -H "Accept: application/json" \
  -F "name=Test Song" \
  -F "trait=Test Trait" \
  -F "image_url=@/path/to/image.jpg"
```

### Step 4: Check Laravel Logs

If you encounter errors, check the logs:
```bash
tail -f storage/logs/laravel.log
```

Or on Windows PowerShell:
```powershell
Get-Content storage\logs\laravel.log -Tail 50 -Wait
```

---

## Part 2: Testing React Frontend

### Step 1: Start React Dev Server

```bash
cd react-from-scratch

# Install dependencies (if not already done)
npm install

# Start dev server
npm run dev
```

The app should open at `http://localhost:5173` (or the port Vite assigns)

### Step 2: Check Browser Console

Open browser DevTools (F12) and check:
- **Console tab**: Look for any errors
- **Network tab**: Check if API requests are being made
  - Filter by "Fetch/XHR"
  - Look for requests to `/api/songs`
  - Check response status (should be 200)

### Step 3: Test Features

1. **Load Songs:**
   - Page should load and display songs from API
   - Check if loading spinner appears (1 second delay due to `sleep(1)`)

2. **Search:**
   - Type in search box
   - Songs should filter by trait

3. **Like/Unlike:**
   - Click heart icon on a song
   - Should toggle like status
   - Liked songs appear in shortlist

4. **Add New Song:**
   - Fill in name and trait fields
   - Select an image file
   - Click "Add song"
   - New song should appear in the list

---

## Part 3: Testing Connection Between React and Laravel

### Step 1: Verify API URL Configuration

Check `react-from-scratch/src/config/api.ts`:
- Should match your virtual host setup
- Default: `http://react-backend.test/react-from-scratch-api`

### Step 2: Test API URL in Browser

Before testing React, verify the API works:
1. Open: `http://react-backend.test/react-from-scratch-api/api/songs`
2. Should see JSON response (even if empty array)

### Step 3: Check CORS Configuration

Verify `react-from-scratch-api/config/cors.php`:
- `allowed_origins` should be `['*']` for development
- `paths` should include `['api/*']`

### Step 4: Network Tab Debugging

In browser DevTools Network tab:
1. Look for failed requests (red)
2. Check request URL (should match config)
3. Check response:
   - Status 200 = Success
   - Status 404 = Route not found (check URL)
   - Status 500 = Server error (check Laravel logs)
   - ERR_EMPTY_RESPONSE = Server not running or wrong URL

---

## Common Issues & Solutions

### Issue 1: ERR_EMPTY_RESPONSE

**Causes:**
- Laravel server not running
- Wrong API URL
- Virtual host not configured

**Solutions:**
1. Verify XAMPP Apache is running
2. Test API URL directly in browser
3. Update `src/config/api.ts` with correct URL
4. Check virtual host configuration

### Issue 2: CORS Error

**Solution:**
- Verify `config/cors.php` allows all origins: `'allowed_origins' => ['*']`
- Clear config cache: `php artisan config:clear`

### Issue 3: 404 Not Found

**Solutions:**
1. Check route exists: `php artisan route:list --path=api`
2. Verify API URL includes `/api` prefix
3. Check if subdirectory path is needed

### Issue 4: Database Connection Error

**Solutions:**
1. Check `.env` file has correct database credentials
2. Verify MySQL is running in XAMPP
3. Run migrations: `php artisan migrate`

### Issue 5: Storage Link Missing

**Solution:**
```bash
php artisan storage:link
```

---

## Quick Test Checklist

- [ ] Laravel API accessible in browser
- [ ] Database migrations run
- [ ] Storage link created
- [ ] React dev server running
- [ ] No console errors in browser
- [ ] API requests visible in Network tab
- [ ] Songs load on page
- [ ] Search works
- [ ] Like/unlike works
- [ ] Add song works

---

## Testing with Postman/Insomnia

You can also test the API using Postman or Insomnia:

**GET /api/songs**
- Method: GET
- URL: `http://react-backend.test/react-from-scratch-api/api/songs`
- Headers: `Accept: application/json`

**PATCH /api/songs/{id}/like**
- Method: PATCH
- URL: `http://react-backend.test/react-from-scratch-api/api/songs/1/like`
- Headers: `Accept: application/json`

**POST /api/songs**
- Method: POST
- URL: `http://react-backend.test/react-from-scratch-api/api/songs`
- Headers: `Accept: application/json`
- Body: form-data
  - `name`: "Test Song"
  - `trait`: "Test Trait"
  - `image_url`: [select file]

