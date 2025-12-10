# URL Troubleshooting Guide

## Problem: URLs Not Working

If both URLs don't work:
- `http://react-backend.test/react-from-scratch-api/api/songs`
- `http://react-backend.test/api/songs`

## Quick Tests

### Test 1: Try localhost with port
```
http://localhost:8000/api/songs
http://localhost:8000/api/test
```

### Test 2: Check if Laravel is accessible
```
http://react-backend.test/react-from-scratch-api/
http://react-backend.test/react-from-scratch-api/public/
```

### Test 3: Check virtual host
- Open XAMPP Control Panel
- Check if Apache is running
- Check virtual host configuration

## Common Issues & Solutions

### Issue 1: Virtual Host Not Configured

**Solution:** Check your XAMPP virtual host configuration:

1. Open: `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
2. Should have something like:
   ```apache
   <VirtualHost *:80>
       ServerName react-backend.test
       DocumentRoot "C:/xampp/htdocs/react-laravel/react-from-scratch-api/public"
       <Directory "C:/xampp/htdocs/react-laravel/react-from-scratch-api/public">
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. Check hosts file: `C:\Windows\System32\drivers\etc\hosts`
   Should have:
   ```
   127.0.0.1    react-backend.test
   ```

### Issue 2: Document Root Wrong

**If virtual host points to:** `C:/xampp/htdocs/react-laravel`
- URL should be: `http://react-backend.test/react-from-scratch-api/public/api/songs`

**If virtual host points to:** `C:/xampp/htdocs/react-laravel/react-from-scratch-api/public`
- URL should be: `http://react-backend.test/api/songs`

### Issue 3: Use Laravel Development Server

Instead of virtual host, use Laravel's built-in server:

```bash
cd react-from-scratch-api
php artisan serve
```

Then access:
```
http://localhost:8000/api/songs
http://localhost:8000/api/test
```

Update React config to:
```typescript
export const API_BASE_URL = 'http://localhost:8000';
```

### Issue 4: Check Apache Error Logs

Check XAMPP error logs:
```
C:\xampp\apache\logs\error.log
```

## Recommended Solution: Use Laravel Serve

1. **Start Laravel server:**
   ```bash
   cd react-from-scratch-api
   php artisan serve
   ```

2. **Update React config** (`react-from-scratch/src/config/api.ts`):
   ```typescript
   export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
   ```

3. **Test in browser:**
   ```
   http://localhost:8000/api/test
   http://localhost:8000/api/songs
   ```

4. **Restart React dev server**

This is the simplest solution and avoids virtual host configuration issues.

