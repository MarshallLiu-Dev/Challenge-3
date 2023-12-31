# Challenge-3

Challenge of the XII week - Compass UOL

Api of a Veterinary Clinic

This repository contains the source codes of the third challenge of Compass UOL, PetStore is microservice is designed to provide various features related to tutors and pets. It allows users to perform operations such as creating tutors, managing pets associated with tutors, and performing authentication.

## running locally

Clone the project

```bash
  git clone https://github.com/MarshallLiu-Dev/Challenge-3.git
```

Enter the project directory

```bash
  cd Challenge-3/
```

install the dependencies

```bash
   npm i
```

or

```bash
   yarn install
```


start the server

```bash
  npm run start:dev
```
or
```bash
  yarn run start:dev
```


Acesse: http://localhost:5001/api-docs




## API documentation

```http
  POST /login
```

 Example:
```http
{
  "email": "adm@gmail.com",
  "password": "adm12345"
}
```

Example:
```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzdiZDQ3YjZiZTBjOTc3NzU5MmUyMiIsImlhdCI6MTY5MDgyMzM2NywiZXhwIjoxNjkwOTA5NzY3fQ.8eTDY93Q4_8RvIAYTPttJQllkZUrTQAfh4GT9QK4yIE"
}
```

if you pass invalid values

```http
{
  "error": true,
  "code": 401,
  "message": "Invalid email or password"
}
```


### Tutor


#### Returns all tutors

```http
  GET /tutors
```

Return:
```http
{
  "tutorsWithPets": [
    {
      "_id": "64c7bd47b6be0c9777592e22",
      "name": "adm",
      "phone": 40028922,
      "email": "adm@gmail.com",
      "zip_code": 12345678,
      "date_of_birth": "2023-12-12 10: 10",
      "pets": [],
      "__v": 0,
      "password": "******"
    }
  ],
  "message": "Listing All Tutors and Pets"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Create a new tutor


```http
  POST /tutor
```

Example:
```http
{
  "name": "user",
  "password": "12345678",
  "phone": "40028922",
  "email": "user@gmail.com",
  "date_of_birth": "2023-12-12 10: 10",
  "zip_code": "12345678"
}
```

Return: 
```http
{
  "newTutor": {
    "name": "user",
    "phone": 40028922,
    "email": "user@gmail.com",
    "password": "******",
    "zip_code": 12345678,
    "date_of_birth": "2023-12-12 10: 10",
    "pets": [],
    "_id": "64c7efbd9d412b935a787792",
    "__v": 0
  },
  "message": "Tutor created successfully"
}
```

#### Return tutor by id

```http
  GET /tutor/{id}
```

Return: 
```http
{
  "_id": "64c7efbd9d412b935a787792",
  "name": "user",
  "phone": 40028922,
  "email": "user@gmail.com",
  "password": "******",
  "zip_code": 12345678,
  "date_of_birth": "2023-12-12 10: 10",
  "pets": [],
  "__v": 0
}
```
Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Update tutor by id

```http
  PUT /tutor/{id}
```

Example:
```http
{
  "name": "User01",
  "password": "12345678",
  "phone": "40028922",
  "email": "User01@gmail.com",
  "date_of_birth": "2023-12-12 10: 10",
  "zip_code": "12345678"
}
```


Return: 
```http
{
  "updatedData": {
    "name": "User01",
    "password": "12345678",
    "phone": "40028922",
    "email": "User01@gmail.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678"
  },
  "message": "Tutor updated successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Delete tutor by id


```http
  DELETE /tutor/{id}
```

Return:
```http

```

It is not possible to delete tutor with pets associated with them.

Return:
```http
{
  "message": "Request error, check and try again, Tutor has pets associated and cannot be deleted"
}
```
Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

### Pet

#### Creates a pet and adds it to the tutor.

```http
  POST /pet/{tutorId}
```

 Example:
```http
{
  "name": "Pet01",
  "species": "dog",
  "carry": "p",
  "weight": 5,
  "date_of_birth": "1993-12-12 10:10"
}
```

Return: 
```http
{
  "newPet": {
    "name": "Pet01",
    "species": "dog",
    "carry": "p",
    "weight": "5",
    "date_of_birth": "1993-12-12 10:10",
    "_id": "64c7f4809d412b935a7877ab",
    "__v": 0
  },
  "tutorId": "64c7efbd9d412b935a787792",
  "message": "Pet created and associated with tutor successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```


#### Returns all pets

```http
  GET /pet
```

Return:
```http
{
  "pets": [
    {
      "_id": "64c7f4809d412b935a7877ab",
      "name": "Pet01",
      "species": "dog",
      "carry": "p",
      "weight": "5",
      "date_of_birth": "1993-12-12 10:10",
      "__v": 0
    }
  ],
  "message": "Listing All Pets"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Update pet by id

```http
  PUT /pet/{petId}/tutor/{tutorId}
```

 Example:
```http
{
  "name": "Floquinho",
  "species": "dog",
  "carry": "p",
  "weight": 5,
  "date_of_birth": "1993-12-12 10:10"
}
```


Return: 
```http
{
  "updatedData": {
    "name": "Floquinho",
    "species": "dog",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
  },
  "message": "Pet updated successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```


#### Delete pet by id

```http
  DELETE /pet/{petId}/tutor/{tutorId}
```

Return:
```http

```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```



## Feedback

If you have any feedback, please let us know via Instagram. [@Marshall.Liu_](https://www.instagram.com/marshall.liu_/) , [@thiagoviieira_](https://www.instagram.com/thiagoviieira_) or Email [TheodoroFRS](https://github.com/TheodoroFRS)


## Authors

- [@Marshall.liu_](https://github.com/MarshallLiu-Dev)

- [@TheodoroFRS](https://github.com/TheodoroFRS)

- [@ThiagoVieira585](https://github.com/ThiagoVieira585)

- [@AntonioEvandro](https://github.com/AntonioEvandro)
