# API for audiobook

In this applications there are two types of users admins and normal users. The application uses OAuth 2.0 for authentication and authorization.

Admins can see stats and upload audiobooks to the server. Users can browse audiobooks, listen to samples of audiobooks and purchase audiobooks. Based on this requirement here is a basic layout of the API.

## Install Dependencies

```plain
npm i
```

## Running the project

```plain
npm run dev
```

## Database Scripts

Syncing database

```plain
npm run sync
```

Rebuild database

```plain
npm run sync -- --clean
```

Seed Fake data

```plain
npm run faker
```

## Routes

### User Actions

| Action    | API endpoint          | Method |
| --------- | --------------------- | ------ |
| Register  | /api/users/signup     | POST   |
| Login     | /api/users/signin     | POST   |
| Logout    | /api/users/signout    | GET    |

### Normal User Actions

| Action    | API endpoint          | Method |
| --------- | --------------------- | ------ |
| Profile   | /api/users/profile    | GET    |
| Wishlist  | /api/users/wishlist   | GET    |
| Purchases | /api/users/purchases  | GET    |
| Cart      | /api/users/cart       | GET    |

### Audiobook

| Action    | API endpoint                         | Method |
| --------- | ------------------------------------ | ------ |
| Browse    | /api/audiobooks                      | GET    |
| Profile   | /api/audiobooks/{id}                 | GET    |
| Purchase  | /api/audiobooks/{id}/purchase        | GET    |
| Rate      | /api/audiobooks/{id}/rate            | POST   |
| Download  | /api/audiobooks/{id}/download/{type} | GET    |
| Search    | /api/audiobooks/search               | GET    |

### Admin User Actions

| Action    | API endpoint           | Method |
| --------- | ---------------------- | ------ |
| Upload    | /api/audiobooks        | POST   |

## Genres

| Action    | API endpoint                         | Method |
| --------- | ------------------------------------ | ------ |
| Browse    | /api/genres                          | GET    |
| Profile   | /api/genres/{id}                     | GET    |

### Admin User Actions

| Action     | API endpoint           | Method |
| ---------  | ---------------------- | ------ |
| Add genres | /api/genres            | POST   |
