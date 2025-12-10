# Start Laravel API Server

## Quick Start (Recommended)

### Option 1: Localhost Only
```bash
cd react-from-scratch-api
php artisan serve
```

Access at: `http://localhost:8000`

### Option 2: Network Access (for testing on other devices)
```bash
cd react-from-scratch-api
php artisan serve --host=0.0.0.0 --port=8000
```

Access at:
- Local: `http://localhost:8000`
- Network: `http://YOUR_IP:8000` (e.g., `http://192.168.100.68:8000`)

## Test Endpoints

Once server is running, test in browser:

1. **Test route:**
   ```
   http://localhost:8000/api/test
   ```
   Should return: `{"message":"API is working!","timestamp":"..."}`

2. **Songs endpoint:**
   ```
   http://localhost:8000/api/songs
   ```
   Should return JSON with 7 songs

## Update React Config

The React config has been updated to use `http://localhost:8000` by default.

If using network access, update `react-from-scratch/src/config/api.ts`:
```typescript
export const API_BASE_URL = 'http://192.168.100.68:8000';
```

Or create `.env` file in `react-from-scratch`:
```env
VITE_API_BASE_URL=http://192.168.100.68:8000
```

## Keep Server Running

- Keep the terminal window open while developing
- Press `Ctrl+C` to stop the server
- Restart with `php artisan serve` when needed

