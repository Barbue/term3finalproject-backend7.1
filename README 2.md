# ----- Final Capstone Project - BackEnd -----

## --- Project Overview ---

There is a lack of in-depth online resources pertaining to the French language as it is spoken in Louisiana. To be more precise, there is a lack of online resources that both a person interested in learning Louisiana French and a person interested in contributing their knowledge of Louisiana French can utilize.

My application will provide an online resource that can be consulted at any time and which includes entries containing the word in Louisiana French, examples of that word being used in context in a sentence as well as the translations in English. The primary audience of this application would likely be francophones or francophiles, and some prior knowledge of the French language is expected.  
Once they have registered and logged in, they will be able to view all entries, search entries, create entries, edit entries and delete entries. It is my hope that this application will allow for the creation of an ever-expanding database that will help to preserve the French language as it is spoken in Louisiana, and provide the means for current and future generations to learn, preserve and perpetuate the language. It is also my hope that I will be able to add more functionality as my knowledge of coding increases over time.

### --- Technical Stack Needed For This Project ---

- NodeJS - Runtime
- ReactJS - Client Framework
- ExpressJS - Server Framework
- MongoDB - Database
- Git - Code Versioning
- GitHub - Code Storage and Collaboration
- CORS - Express CORS Library
- bcryptJS - User Authntication
- JsonWebToken - User Auth Tokens
- Bootstrap - CSS Framework
- Nodemon - Server Hot Reloading
- React-Router - Client Side Routing
- uuidv4 - Unique ID Generator
- axios - Promise Based HTTP Client For The Browser And Node.js

### - Basic Installation FrontEnd:

- npm install
- npx create-react-app - Creates React Application
- npm install dotenv - Loads Environment Variables From A .env File Into process.env
- (Optional) npm install axios
- npm install react-router-dom

### - Basic Installation BackEnd:

- npx express-generator
- npm install
- npm install mongodb
- npm install cors
- npm install nodemon
- npm install dotenv
- npm install uuidv4

### --- Basic Functionality Of The Application ---

#### - Ability To Register And Login -

- The user will be able to register with the application.

- Once the user has registered, then they will be able to log into and out of the application.

#### - Glossary Management -

- The user will be able to create new word entries and edit those entries that have already been created.

- The user will be able to delete a word entries.

- The user will be able to see a list of their word entries.

### --- Additional Functionality Of The Application ---

#### - Ability To Register And Login -

- The user's password will be encrypted via salt+hash algorithm.

- A user ID Token will be generated using JsonWebToken. The ID Token will persist on the client side with local storage. The client will then check for the existence of the token before prompting the user to authenticate.

- The user will be able to log out of the application and log into it with a different account.

#### - Word Management -

- There will be a page or a modal for users to create new word entries.

- The user will be able to create and edit the following fields in a word entry:

      - word {String}
      - partOfSpeech {String}
      - translation {String}
      - exampleSentence {String}
      - created by {String}
      - comments {String}
      - createdById {uuid}
      - lastUpdatedById {uuid}
      - lastModified {Date}

- The word list will be sortable and filterable.
- The word list will be paginated.

