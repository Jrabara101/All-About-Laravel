# Quick Testing Commands

## Laravel API Testing

### 1. Check if routes are registered
```bash
cd react-from-scratch-api
php artisan route:list --path=api
```

### 2. Test API in browser
Open these URLs:
- `http://react-backend.test/react-from-scratch-api/api/songs`
- `http://react-backend.test/react-from-scratch-api/up` (health check)

### 3. Setup database (if needed)
```bash
php artisan migrate
php artisan storage:link
```

### 4. Check logs for errors
```bash
# Windows PowerShell
Get-Content storage\logs\laravel.log -Tail 20

# Linux/Mac
tail -f storage/logs/laravel.log
```

---

## React Frontend Testing

### 1. Start dev server
```bash
cd react-from-scratch
npm run dev
```

### 2. Open browser
- Usually at `http://localhost:5173`
- Open DevTools (F12)
- Check Console and Network tabs

### 3. Test features
- ✅ Songs should load automatically
- ✅ Search should filter songs
- ✅ Click heart to like/unlike
- ✅ Add new song with form

---

## Verify Connection

### Test API URL
1. Open browser
2. Go to: `http://react-backend.test/react-from-scratch-api/api/songs`
3. Should see JSON response (even if empty: `{"data":[]}`)

### If URL doesn't work, try:
- `http://react-backend.test/api/songs` (if virtual host points directly to API folder)
- Update `react-from-scratch/src/config/api.ts` with correct URL

---

## Troubleshooting

### ERR_EMPTY_RESPONSE
- Check XAMPP Apache is running
- Verify virtual host configuration
- Test API URL directly in browser

### CORS Error
```bash
php artisan config:clear
```

### Database Error
```bash
php artisan migrate
```

### Storage Link Missing
```bash
php artisan storage:link
```

