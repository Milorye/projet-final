# API plan

## Current status

No backend API is live yet. The frontend remains functional using local demo data.

## Future API boundaries

### Public storefront endpoints

- GET /products
- GET /products/:slug
- GET /collections
- GET /collections/:slug
- GET /search?q=

### Cart and user endpoints

- POST /cart
- PATCH /cart/:id
- DELETE /cart/:id
- GET /favorites
- POST /favorites

### Order and checkout

- POST /orders
- GET /orders/:id
- POST /payments

## CORS

The backend should set explicit allowed origins, for example:

- http://localhost:3000
- https://maisonmoya.example.com

Avoid wildcard settings when authentication or cookies are involved.
