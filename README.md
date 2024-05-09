# How to run this application locally?

1. Download [MongoDB.](https://www.mongodb.com/try/download/community)

2. Download **Node.js**.

3. Clone or pull repository.

4. Download **mongosh** *(optional)*.

5. Run `npm install` in root directory of the project.

6. Run `Node app.js`.

7. You can also use **Nodemon** instead of Node for life-reloads on changes. You need to install it globally using **npm**.

8. Setup **.env** file. There is `.env example` file for guiding this process.

# Routes

### Base url

```
http://localhost:3001
```

### GET /api/v1/healthcheck/public/

**Public healthcheck to test application**

**Response 200 (JSON)**
```js
{
	"message": "Events API is working correctly"
}
```

### POST /api/v1/auth/register/

**Register**

**Request body**
```js
{
	"username": USERNAME,
	"password": PASSWORD
}
```

**Response 201 example (JSON)**
```js
{
	"id": "663c5e2fa3708a9482fd87d5",
	"username": "User",
	"secret": "dXlLCZFIVf"
}
```

### POST /api/v1/auth/login/

**Login**

**Request body**
```js
{
	"username": USERNAME, // string
	"password": PASSWORD // string
}
```

**Response 200 example (JSON)**
```js
{
	"id": "663c5e2fa3708a9482fd87d5",
	"username": "User",
	"secret": "dXlLCZFIVf"
}
```

### GET /api/v1/healthcheck/private/

**Private healthcheck to check credentials manager**

**Request body**
```js
{
	"username": USERNAME, // string
	"secret": SECRET // string
}
```

**Response 200 (JSON)**
```js
{
	"message": "Events API credentials middleware is working correctly"
}
```

### POST /internal/event/

**Creating event, for internal purpose only**

**Request body**
```js
{
	"name": NAME, // string
	"type": TYPE, // string, must be 'concert', 'sport' or 'exhibition'
	"location": LOCATION, // string
	"date":  DATE, // string
	"price": PRICE // number
}
```

**Response 201 (JSON)**
```js
{
	"name": "Weissnat, Greenfelder and Pacocha",
	"type": "sport",
	"price": 1337,
	"location": "419 Walsh Brooks",
	"date": "2024-11-02T20:50:08.000Z",
	"image": BASE64 // large base64 string
}
```

### GET /api/v1/events/all/

**Getting all events**

**Response 200 example (JSON)**
```js
{
	"events": [
		{
			"defaultImage": {
				"data": {
					"type":"Buffer","data": [BYTE ARRAY]
				}
			},
			"_id": "663c5d5ca3708a9482fd87d2",
			"hasImage": false,
			"name": "Weissnat, Greenfelder and Pacocha",
			"type": "sport",
			"location": "419 Walsh Brooks","date":"2024-11-02T20:50:08.000Z",
			"price": 1337,
			"__v": 0
		}
	]
}
```

### GET /api/v1/events/sport/

**Getting sport events**

**Response 200 example (JSON)**
```js
{
	"events": [
		{
			"defaultImage": {
				"data": {
					"type":"Buffer","data": [BYTE ARRAY]
				}
			},
			"_id": "663c5d5ca3708a9482fd87d2",
			"hasImage": false,
			"name": "Weissnat, Greenfelder and Pacocha",
			"type": "sport",
			"location": "419 Walsh Brooks","date":"2024-11-02T20:50:08.000Z",
			"price": 1337,
			"__v": 0
		}
	]
}
```

### GET /api/v1/events/concert/

**Getting concert events**

**Response 200 example (JSON)**
```js
{
	"events": [
		{
			"defaultImage": {
				"data": {
					"type":"Buffer","data": [BYTE ARRAY]
				}
			},
			"_id": "663c5d5ca3708a9482fd87d2",
			"hasImage": false,
			"name": "Weissnat, Greenfelder and Pacocha",
			"type": "sport",
			"location": "419 Walsh Brooks","date":"2024-11-02T20:50:08.000Z",
			"price": 1337,
			"__v": 0
		}
	]
}
```

### GET /api/v1/events/exhibition/

**Getting exhibition events**

**Response 200 example (JSON)**
```js
{
	"events": [
		{
			"defaultImage": {
				"data": {
					"type":"Buffer","data": [BYTE ARRAY]
				}
			},
			"_id": "663c5d5ca3708a9482fd87d2",
			"hasImage": false,
			"name": "Weissnat, Greenfelder and Pacocha",
			"type": "sport",
			"location": "419 Walsh Brooks","date":"2024-11-02T20:50:08.000Z",
			"price": 1337,
			"__v": 0
		}
	]
}
```

### POST /api/v1/tickets/?eventId={{EVENT_ID}}

**Creating ticket for certain event**

**Request body**
```js
{
	"quantity": QUANTITY, // number
	"price": PRICE, // number
	"username": USERNAME, // string
	"secret": SECRET // string
}
```

**Response 201 example (JSON)**
```js
{
	"quantity": 1,
	"price": 4,
	"isArchived": false,
	"event": [
		"663bd29bd2d1a07681577ca9"
	],
	"user": [
		"663c5e2fa3708a9482fd87d5"
	],
	"_id": "663c5fe2a3708a9482fd87dd",
	"__v": 0
}
```

### GET /api/v1/tickets/all/

**Getting user's all tickets**

**Request body**
```js
{
	"username": USERNAME, // string
	"secret": SECRET // string
}
```

**Response 200 example (JSON)**
```js
[
	{
		"_id": "663c5fe2a3708a9482fd87dd",
		"quantity": 1,
		"price": 4,
		"isArchived": false,
		"event": [
			"663bd29bd2d1a07681577ca9"
		],
		"user": [
			"663c5e2fa3708a9482fd87d5"
		],
		"__v": 0
	}
]
```

### GET /api/v1/tickets/archived/

**Getting user's archived tickets**

**Request body**
```js
{
	"username": USERNAME, // string
	"secret": SECRET // string
}
```

**Response 200 example (JSON)**
```js
[
	{
		"_id": "663c5fe2a3708a9482fd87dd",
		"quantity": 1,
		"price": 4,
		"isArchived": true,
		"event": [
			"663bd29bd2d1a07681577ca9"
		],
		"user": [
			"663c5e2fa3708a9482fd87d5"
		],
		"__v": 0
	}
]
```