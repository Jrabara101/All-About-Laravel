# Quick Start: Access on Local Network

## Your Current IP Address
**192.168.100.68** (found automatically)

## Step-by-Step Instructions

### 1. Start React Dev Server

```bash
cd react-from-scratch
npm run dev
```

You'll see:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.100.68:5173/
```

### 2. Configure API URL for Network Access

**Create `.env` file** in `react-from-scratch` folder:

```env
VITE_API_BASE_URL=http://192.168.100.68/react-from-scratch-api
```

**Important:** Restart the dev server after creating/updating `.env` file!

### 3. Access from Other Devices

**On your computer:**
- `http://localhost:5173`

**On other devices (phone, tablet, etc.):**
- `http://192.168.100.68:5173`
- Make sure device is on the same Wi-Fi network

### 4. Test API from Other Devices

Before testing React app, verify API works:
- Open on another device: `http://192.168.100.68/react-from-scratch-api/api/songs`
- Should see JSON response

## Troubleshooting

### Can't access from other devices?

1. **Check Windows Firewall:**
   - Allow Node.js through firewall
   - Or temporarily disable firewall to test

2. **Check IP address:**
   - Run `ipconfig` again (IP might have changed)
   - Update `.env` file with new IP

3. **Check network:**
   - All devices must be on same Wi-Fi
   - Some networks block device-to-device access

### API not working from other devices?

1. **Update API URL in `.env`:**
   ```env
   VITE_API_BASE_URL=http://192.168.100.68/react-from-scratch-api
   ```

2. **Restart dev server** after updating `.env`

3. **Test API directly:**
   - From another device: `http://192.168.100.68/react-from-scratch-api/api/songs`

## Quick Commands

```bash
# Find your IP (Windows)
ipconfig | findstr /i "IPv4"

# Start React with network access
npm run dev

# Check if API is accessible
# Open in browser: http://YOUR_IP/react-from-scratch-api/api/songs
```

