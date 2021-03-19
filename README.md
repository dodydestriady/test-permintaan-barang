# test-permintaan-barang
this is example project of 'Request Item' App.

## Prerequiset
- Php 7.3 ^
- composer
- npm
- mysql

## Install
- clone this project
``` 
git clone https://github.com/dodydestriady/test-permintaan-barang.git && cd test-permintaan-barang 
```
- copy .env.example to .env, and setup you database configuration
``` 
cp .env.example .env 
```
- run composer and migrate 
``` 
composer install 
php artisan migrate --seed 
```
- install nodejs and npm for frontend depedencies
``` 
npm install && npm run production 
```
- run web server & access on `localhost:3000`
```
php artisan serve
```
