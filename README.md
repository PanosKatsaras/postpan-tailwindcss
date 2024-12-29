![PostpanImage2](https://github.com/user-attachments/assets/6e7af4f6-4c77-449a-8865-97329d38eff8)

![PostpanImage1](https://github.com/user-attachments/assets/2af8e4b3-3497-433e-a0a0-c3cd86643671)


# Postpan

A lightweight, browser-based API testing tool built with **Node.js**, **Tailwind CSS**, and **CodeMirror**. 
This Postman clone replicates some of the core features of Postman, allowing developers to test and debug APIs directly in their browser.

## Features

- **Send HTTP Requests**: Support for GET, POST, PUT, DELETE, and more.
- **Customizable Request Headers and Body**: Add headers and body data easily.
- **Syntax Highlighting**: Powered by CodeMirror for JSON, HTML, and other formats.
- **Responsive Design**: Styled with Tailwind CSS for a clean, modern interface.


## Technologies Used

- **Node.js**: Backend framework for handling server logic and API requests.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive styling.
- **CodeMirror**: Rich text editor for syntax highlighting and code formatting.
- **Axios**: Promise-based HTTP client for making API requests.
- **Snowpack**: Frontend build tool for lightning-fast development and hot module reloading.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PanosKatsaras/postpan-tailwindcss.git
   cd postpan-tailwindcss
   ```

2. **Install Dependencies:**
   Make sure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application:**
   Start the server with:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:8080`.

## Usage

1. Open the application in your browser.
2. Select the HTTP method (GET, POST, PUT, DELETE, etc.).
3. Enter the API endpoint URL.
4. (Optional) Add headers, query parameters, or a request body.
5. Click **Send** to make the request.
6. View the response, including status, time, size, headers, and body, in the results panel.
