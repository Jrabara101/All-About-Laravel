# React Frontend Testing Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   - Usually at `http://localhost:5173`
   - Check terminal for actual port

## Testing Checklist

### ✅ API Connection
- [ ] No console errors on page load
- [ ] Songs load from API (check Network tab)
- [ ] Loading spinner appears (1 second delay)

### ✅ Search Functionality
- [ ] Type in search box filters songs
- [ ] Clear button works
- [ ] Search is case-insensitive

### ✅ Like/Unlike
- [ ] Click heart icon toggles like
- [ ] Liked songs appear in shortlist
- [ ] Remove from shortlist works

### ✅ Add New Song
- [ ] Form accepts name and trait
- [ ] File upload works
- [ ] New song appears in list after submission
- [ ] Form resets after submission

## Debugging

### Check API Configuration
File: `src/config/api.ts`
- Verify `API_BASE_URL` matches your Laravel setup
- Can override with environment variable: `VITE_API_BASE_URL`

### Browser DevTools
1. **Console Tab:**
   - Look for red errors
   - Check error messages

2. **Network Tab:**
   - Filter by "Fetch/XHR"
   - Check request URLs
   - Verify response status codes
   - Inspect response data

3. **Application Tab:**
   - Check if any data is cached
   - Clear cache if needed

## Common Errors

### "Failed to fetch"
- API server not running
- Wrong API URL
- CORS issue

### "ERR_EMPTY_RESPONSE"
- Server not responding
- Check API URL in browser directly
- Verify virtual host configuration

### Songs not loading
- Check Network tab for API request
- Verify API returns data
- Check response format matches expected structure

