# Wirtualne Biuro Biała3 

### Użyte technologie:
- Baza danych MongoDB, obsługiwana przez bibliotekę Mongoose.js
- NodeJS
- ExpressJS
- mailing przy użyciu Nodemailer
- testy jednostkowe Jest.js
- dokumentacja generowana automatycznie JSDoc


# Repozytorium
- frontend AngularCLI **Biala3** ()
- Branches:
    - master
    - withJSDoc
    - withTests

## .env
```env
NODE_ENV = production
PORT = 3000

```


## Generowanie plików dokumentacji

```properties
npm run jsdoc
```

Pliki generowane w folderze **./out**

## Testy jednostkowe przy pomocy Jest.js

```properties
npm test
```
Pliki   ***.spec.js**

## Server deweloperski (http://localhost:3000/...)

```properties
npm run dev
```
##### 
### Endpointy:
- POST api/order/pay    **tworzenie zamówienia**
- POST  api/user/login     **logowanie** 
- POST  api/user/register    **rejestracja**
##### Widoki handlebars
- GET  /b3/login    **strona logowania**
- GET  /b3/register    **rejestracja**
- GET  /b3/order    **strona zamówienia**
- GET  /b3/password/:id    **zmiana hasła**

-------------
-------------

### VisualStudioCode show Readme.md


>To switch between views, press Ctrl+Shift+V in the editor. You can view the preview side-by-side (Ctrl+K V) with the file you are editing and see changes reflected in real-time as you edit.