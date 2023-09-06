# Web Form Application

This is a simple web form application that allows employees to enter their information into a web form, which is then stored in a PostgreSQL database. The application is hosted on Render, and the PostgreSQL database is also provided by Render.

Access app at https://form-application.onrender.com/

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Database Configuration](#database-configuration)
- [Deploying to Render](#deploying-to-render)


## Getting Started

### Prerequisites

Before you can run the application, you'll need to have the following installed:

- **Node.js:** [Download Node.js](https://nodejs.org/)
- **npm (Node Package Manager):** [npm](https://www.npmjs.com/)
- **PostgreSQL:** You don't need to install it locally since you are using Render's PostgreSQL server.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/form-application.git
   
2. Change into the project directory:

     ```bash
   cd form-application

3. Install the required Node.js packages:

    ```bash
   npm install
    
### Usage

To run the Web Form Application locally, use the following command:

     ```bash
   npm start
   
      ```
This will start the Express.js server, and you can access the application in your web browser at http://localhost:3000.

### Database Configuration

The application uses PostgreSQL as its database, and the connection details should be configured using environment variables. Create a .env file in the project root directory and add the following variables:

    ```bash
   DATABASE_URL=your_postgresql_database_url
   
      ```
      
Replace your_postgresql_database_url with the actual PostgreSQL database URL provided to you by Render.

### Deploying to Render

To deploy this application to Render, follow these steps:

1. Create a Render account if you haven't already:  https://render.com

2. Set up a new web service on Render and connect it to your GitHub repository where this application is hosted.

3. Configure the environment variables in the Render dashboard:
   - Set DATABASE_URL to your PostgreSQL database URL.
   - Set any other environment variables required for your application.

4. Deploy the application to Render. Render will automatically build and deploy your application.

5. Access your application at the URL provided by Render (e.g., https://form-application.onrender.com).



