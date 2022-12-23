# Cooking Recipes

## Description

[App] Creating a cooking recipes SQL portal using SQL, React.js, Express.js, and several component libraries. Final project for CS 306 Database Design at NJCU. Built by Tony Isern, Eliza Clamor, and Souley Abdoul Aziz. 

> Live deployment coming soon...
> Or clone repo, cd into app, then run "npm run dev"
> Or clone repo, cd into server, then run "npm run dev"
> Create your own local MySQL database and create a .env file with a DB_HOST, DB_USER, DB_PASSWORD, and DB properties

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


## Areas for Improvement

* [ ] Create a comments table
* [ ] Allow users to like recipe posts
* [ ] Allow users to comment on recipe posts
* [ ] Authentication

## Known Bugs

1. None identified
