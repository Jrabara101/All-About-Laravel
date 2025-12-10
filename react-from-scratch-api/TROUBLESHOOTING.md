# Troubleshooting ERR_EMPTY_RESPONSE

## Quick Diagnosis

### Step 1: Test API Directly in Browser

Try these URLs in your browser (one should work):

**Option A (with subdirectory):**
```
http://react-backend.test/react-from-scratch-api/api/test
http://react-backend.test/react-from-scratch-api/api/songs
```

**Option B (without subdirectory - if virtual host points directly to API folder):**
```
http://react-backend.test/api/test
http://react-backend.test/api/songs
```

### Step 2: Check Which URL Works

- If **Option A** works → Update React config to use subdirectory
- If **Option B** works → Update React config to remove subdirectory
- If **neither works** → Check XAMPP/Apache configuration

### Step 3: Update React Config

Edit `react-from-scratch/src/config/api.ts`:

**If Option A works:**
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://react-backend.test/react-from-scratch-api';
```

**If Option B works:**
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://react-backend.test';
```

### Step 4: Restart React Dev Server

After changing the config:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## Common Issues

### Issue 1: Virtual Host Configuration

Check your XAMPP virtual host configuration:
- If DocumentRoot points to `C:\xampp\htdocs\react-laravel` → Use subdirectory
- If DocumentRoot points to `C:\xampp\htdocs\react-laravel\react-from-scratch-api` → No subdirectory

### Issue 2: Apache Not Running

- Check XAMPP Control Panel
- Ensure Apache is running (green)

### Issue 3: PHP Error

Check Laravel logs:
```bash
Get-Content storage\logs\laravel.log -Tail 50
```

### Issue 4: Route Not Found

Verify routes are registered:
```bash
php artisan route:list --path=api
```

## Test Commands

```bash
# Test route directly
curl http://react-backend.test/react-from-scratch-api/api/test

# Or without subdirectory
curl http://react-backend.test/api/test

# Check if Laravel is responding
curl http://react-backend.test/react-from-scratch-api/up
```

