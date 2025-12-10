# Database Setup Instructions

## Your SQL File
You have an SQL dump file: `react_from_scratch_api.sql`
- Database name: `react_from_scratch_api`
- Contains 7 songs with data
- Uses MySQL/MariaDB

## Step 1: Create Database

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Create a new database named: `react_from_scratch_api`
3. Or use command line:
   ```sql
   CREATE DATABASE react_from_scratch_api;
   ```

## Step 2: Import SQL File

**Option A: Using phpMyAdmin**
1. Select the `react_from_scratch_api` database
2. Click "Import" tab
3. Choose file: `c:\Users\Admin\Downloads\react_from_scratch_api.sql`
4. Click "Go"

**Option B: Using Command Line**
```bash
mysql -u root -p react_from_scratch_api < "C:\Users\Admin\Downloads\react_from_scratch_api.sql"
```

## Step 3: Update Laravel .env File

Edit `react-from-scratch-api/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_from_scratch_api
DB_USERNAME=root
DB_PASSWORD=
```

(Leave DB_PASSWORD empty if XAMPP default)

## Step 4: Test Database Connection

```bash
php artisan migrate:status
```

Should show all migrations as "Ran".

## Step 5: Verify Data

```bash
php artisan tinker
```

Then in tinker:
```php
App\Models\Song::count(); // Should return 7
App\Models\Song::all(); // Should show all 7 songs
```

## Troubleshooting

### Database connection error
- Check MySQL is running in XAMPP
- Verify database name matches: `react_from_scratch_api`
- Check username/password in .env

### Table already exists error
- The SQL file creates tables, so migrations might conflict
- You can skip migrations if tables already exist

