# Accessing React App on Local Network

## Setup Instructions

### Step 1: Find Your Local IP Address

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```
Or:
```bash
ip addr show
```

### Step 2: Start React Dev Server

```bash
cd react-from-scratch
npm run dev
```

The server will now show:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Step 3: Access from Other Devices

1. **On your computer:**
   - Use: `http://localhost:5173`

2. **On other devices (phone, tablet, other computers):**
   - Use: `http://YOUR_IP_ADDRESS:5173`
   - Example: `http://192.168.1.100:5173`
   - Make sure device is on the same Wi-Fi network

### Step 4: Configure API URL for Network Access

The API URL needs to use your computer's IP address instead of `react-backend.test`.

**Option 1: Environment Variable (Recommended)**

Create a `.env` file in `react-from-scratch`:
```env
VITE_API_BASE_URL=http://YOUR_IP_ADDRESS/react-from-scratch-api
```

Example:
```env
VITE_API_BASE_URL=http://192.168.1.100/react-from-scratch-api
```

**Option 2: Update config file**

Edit `src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://YOUR_IP_ADDRESS/react-from-scratch-api';
```

### Step 5: Configure XAMPP Virtual Host (if needed)

If `react-backend.test` doesn't work from other devices, you may need to:

1. **Access API directly via IP:**
   - Update API URL to: `http://YOUR_IP_ADDRESS/react-from-scratch-api`
   - Or: `http://YOUR_IP_ADDRESS:80/react-from-scratch-api` (if using port 80)

2. **Or set up hosts file on each device:**
   - Add to hosts file: `YOUR_IP_ADDRESS react-backend.test`
   - Then use: `http://react-backend.test/react-from-scratch-api`

## Troubleshooting

### Can't access from other devices

1. **Check firewall:**
   - Windows: Allow Node.js through firewall
   - Make sure port 5173 is not blocked

2. **Check network:**
   - All devices must be on same Wi-Fi network
   - Some corporate networks block device-to-device communication

3. **Check IP address:**
   - IP might change if you reconnect to Wi-Fi
   - Run `ipconfig` again to get current IP

### API not working from other devices

1. **Update API URL:**
   - Use your computer's IP instead of `react-backend.test`
   - Example: `http://192.168.1.100/react-from-scratch-api/api/songs`

2. **Test API directly:**
   - From another device, open: `http://YOUR_IP_ADDRESS/react-from-scratch-api/api/songs`
   - Should see JSON response

3. **Check CORS:**
   - Already configured to allow all origins (`'allowed_origins' => ['*']`)

## Quick Start

1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start dev server: `npm run dev`
3. Note the Network URL shown in terminal
4. Access from other device using that Network URL
5. Update API URL in `.env` file with your IP address

