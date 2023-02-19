<p align="center">
  <h1 align="center">📚 Exercises</h1>
  <p align="center">
    Workshop exercices. Grab your API hacking skills and get ready!
  </p>
 <p>
<br>


## 📕 Exercise 1 - Recognition

On [crAPI]():
- When a user wants to change their mail address, what API endpoint will be called?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The called API endpoint would be `/identity/api/v2/user/change-email`

</details>
<br>


## 📗 Exercise 2 - GraphQL recognition

On [crAPI](https://crapi.samsclass.info):
- Is there any *GraphQL* endpoint available?
  - Where is it?
  - What engine uses?
  - Does it have Introspection enabled by default?


On https://gitlab.com:
- Is there any *GraphQL* endpoint available?
  - Where is it?
  - What engine uses?
  - Does it have Introspection enabled by default?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- There is no *GraphQL* endpoint on [crAPI](https://crapi.samsclass.info)
- Yes, there is a *GraphQL* endpoint on https://gitlab.com
  - https://gitlab.com/api/graphql
  - With the Ruby GraphQL engine
  - Introspection is enabled by default

</details>
<br>


## 📘 Exercise 3 - GraphQL introspection

On [HackOn-pad](http://hackon-pad.online):
- Is there any *GraphQL* endpoint available?
  - Where is it?
  - What engine uses?
  - Does it have Introspection enabled by default?
    - How many mutation queries are enabled?
    - Do any of them look suspicious?
  - Have you been able to represent the data in GraphQL Voyager?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- Yes, there is a *GraphQL* endpoint on [HackOn-pad](http://hackon-pad.online)
  - http://hackon-pad.online:4000
  - With the Apollo engine
  - Introspection is enabled if NODE_ENV is not set to 'production'
      - There are 3 mutation queries
      - The *updateUserUploadFile* mutation query looks suspicious
  - By using InQL Burp Suite extension it is possible to retrieve the corresponding *data* to represent the analogous graph in GraphQL Voyager

</details>    
<br>


## 📙 Exercise 4 - Excesive Data Exposure
On [HackOn-pad](http://hackon-pad.online):
- Could you list any endpoint that returned information from other users?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The `/api/v2/users` endpoint returns information from every user

</details>
<br>


## 📓 Exercise 5 - BOLA
On [HackOn-pad](http://hackon-pad.online):
- Which endpoint can you use to list notes from other users?
  - Does the response contain more information than it should?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The `/api/v2/notes/{id}` endpoint can be used to list notes from other users, including private notes
  - An attacker would be able to retrieve more information from the note that they should be (like the note *id*)

</details>
<br>


## 📔 Exercise 6 - IDOR GraphQL
On [HackOn-pad](http://hackon-pad.online):
- Which query can be used to list an user's password using GraphQL?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The `userFindbyId()` query can be used to list any user password

</details>
<br>


## 📒 Exercise 7 - BFLA
On [HackOn-pad](http://hackon-pad.online):
- Which endpoint can you use to modify the notes of any user?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The `/api/v2/notes/testnote` can be used to modify any note regardless of the user it belongs to by using the HTTP PUT method

</details>
<br>


## 📑 Exercise 8 - Mass Assignment
On [HackOn-pad](http://hackon-pad.online):
- How can we create an user with elevated privileges?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- By appending the `admin=true` parameter on the HTTP POST register petition (`/api/v2/users`)

</details>
<br>


## 📜 Exercise 9 - Broken User Authentication
On [HackOn-pad](http://hackon-pad.online):
- Could you decode the JWT to become an administrator?

<details>
<summary>📝 <strong>Solution</strong></summary> 

####
- The JWT could be decoded by cracking the password (`access`). Subsequently, it is possible to impersonate the `admin` user by signing the token with that password or even change the permissions of the current user (`user:admin`)

</details>
<br>
