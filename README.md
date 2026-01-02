# Cooking Recipes

## Description

[App] Creating a cooking recipes SQL portal using SQL, React.js, Express.js, and several component libraries. Built by Ranvijay Tanwar. 

> Live deployment on a Digital Ocean droplet, configured with an NGINX reverse proxy, added an SSL certificate using Let's Encrypt, and served over HTTPS: https://cooking-recipes-portal.netlify.app/
> Or clone repo, cd into app, then run "npm run dev"
> Or clone repo, cd into server, then run "npm run dev"
> Create your own local MySQL database and create a .env file with a DB_HOST, DB_USER, DB_PASSWORD, and DB properties

### Screenshots

![Homepage](https://user-images.githubusercontent.com/36343664/209451935-dfc8a494-a537-43db-87d9-67503bf1650b.png)
![Recipes Page](https://user-images.githubusercontent.com/36343664/209451944-b1e65be3-7514-4ae9-b09f-0e63e45ca467.png)
![Categories Page](https://user-images.githubusercontent.com/36343664/209451949-162a8261-a547-4951-9407-bca89346c5c9.png)
![Single Recipe Page](https://user-images.githubusercontent.com/36343664/209451953-21609535-91f7-4fc8-802b-92eb8d98a807.png)
![Create Recipe Modal](https://user-images.githubusercontent.com/36343664/209451954-f2ed3c71-8289-442e-acc9-190bdc06f44b.png)
![Update Category Modal](https://user-images.githubusercontent.com/36343664/209451955-7810f7b9-1abd-4d74-8edc-6831f0346a0c.png)

## Showcase

[cooking-recipes.webm]((https://github.com/ranvii07/cooking-recipe-portal))


### Tables Used

CREATE TABLE categories(
	categoryName VARCHAR(100) PRIMARY KEY NOT NULL,
createdAt VARCHAR(100) NOT NULL,
categoryDescription VARCHAR(200) NOT NULL
) ENGINE=INNODB;

CREATE TABLE recipes(
	recipeId VARCHAR(100) PRIMARY KEY,
	recipeTitle varchar(100) NOT NULL,
recipeAuthor varchar(100) NOT NULL,
createdAt varchar(100) NOT NULL,
recipeContent varchar(10000) NOT NULL,
recipeCategory VARCHAR(100),
	CONSTRAINT fk_category
	FOREIGN KEY (recipeCategory)
    	REFERENCES categories(categoryName)
) ENGINE=INNODB; 


## Purpose

Creating a project that utilizes a SQL database and which utilizes core SQL concepts like foreign keys. Building an interactive user interface with an SQL database.

Beyond that, other learning outcomes were:

- Designing reusable components
- Using components from libraries like Bulma, Mantine, Material UI, and Chakra UI
- Building a fullstack application
- Using an interactive table like Material React Table
- Creating custom react hooks like useFetch


## Features

1. Allows users to see a table of all recipes
2. Allows users to see a table of all categories
3. Allows users to perform CRUD operations on recipes
4. Allows users to perform CRUD operations on recipes
5. Allows users to enter concept about their recipes with a RichText HTML editor
6. Allow users see the HTML content of their recipe in a seperate page by clicking "View"
7. Allows users to filter, search, export, and many more things using the Material React Table

## Development

### Javascript Framework(s)

- [React](https://github.com/facebook/create-react-app)
### Technologies used

- [Chakra](https://chakra-ui.com/) - UI library
- [Material UI](https://mui.com/) - UI library
- [Mantine](https://mantine.dev/) - UI library
- [DaisyUI](https://daisyui.com/) - UI library
- [Bulma](https://bulma.io/) - UI library
- [Material React Table](https://www.material-react-table.com/) - Interactive table
- [React Quill](https://zenoamaro.github.io/react-quill/) - RichText HTML Editor
- [React Router](https://reactrouter.com/en/main) - Client-side routing
- [React CSS Modules](https://github.com/gajus/react-css-modules) - CSS with local scoping
- [Express](https://expressjs.com/) - Web framework
- [MySQL](https://www.mysql.com/) - Relational database

<h2 style='width:100%;text-align:center'>How To Use</h2>

- Clone this Repo
- Install Dependencies inside of the "/app" directory from the root project

  ```bash
  cd app && npm install
  ```
  
- Install Dependencies inside of the "/server" directory from the root project

  ```bash
  cd server && npm install
  ```
  
- Setup the MySQL Server on your local computer using this link: https://dev.mysql.com/doc/mysql-getting-started/en/

- Add `env` file in the root folder of the "/server" directory:

  ```bash
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=password
  DB=my_db
  ```
- Add `env` file in the root folder of the "/app" directory:

  ```bash
  VITE_API_DOMAIN=https://example-api-domain.com
  ```

- Run Development Server using the same command inside of the "/app" to start the front-end

  ```bash
  npm run dev
  ```
  
  
- Run Development Server using the same command inside of the "/server" to start the backend-end

  ```bash
  npm run dev
  ```

## Areas for Improvement

* [ ] Create a comments table
* [ ] Allow users to like recipe posts
* [ ] Allow users to comment on recipe posts
* [ ] Authentication

## Known Bugs

1. None identified
