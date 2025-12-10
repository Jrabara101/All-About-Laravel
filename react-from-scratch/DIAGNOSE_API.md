# Diagnose API Connection Issue

## Step 1: Test API URLs in Browser

Open these URLs one by one in your browser to see which one works:

### Test 1: With subdirectory
```
http://react-backend.test/react-from-scratch-api/api/test
```
**Expected:** `{"message":"API is working!","timestamp":"..."}`

### Test 2: Without subdirectory  
```
http://react-backend.test/api/test
```
**Expected:** `{"message":"API is working!","timestamp":"..."}`

## Step 2: Update Config Based on Which Works

### If Test 1 works (with subdirectory):
Edit `src/config/api.ts` - already correct, no change needed.

### If Test 2 works (without subdirectory):
Edit `src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://react-backend.test';
```

## Step 3: Restart React Dev Server

After changing config:
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 4: Check Browser Console

- Open DevTools (F12)
- Check Network tab
- Look for the API request
- Check the actual URL being called
- Verify response status

## Common Solutions

### Solution 1: Try without subdirectory
If your virtual host points directly to `react-from-scratch-api` folder:
- Update `src/config/api.ts` to use `'http://react-backend.test'`
- Restart dev server

### Solution 2: Check XAMPP Apache
- Ensure Apache is running in XAMPP
- Check virtual host configuration
- Verify `react-backend.test` is in your hosts file

### Solution 3: Test with IP address
Try using your local IP:
```typescript
export const API_BASE_URL = 'http://192.168.100.68/react-from-scratch-api';
```

