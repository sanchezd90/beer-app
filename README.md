# Beer App

This is a simple application that generates a coupon. This app was developed using AI tools, primarily as a learning exercise to explore the integration of AI capabilities in the app development process.

## Overview

This React application serves as a code generator with various features and validations. Users can generate unique codes based on specific criteria, with age and form validations to ensure data integrity and compliance with certain standards. The app prevents rapid code regeneration within 24 hours and provides the ability to download the generated code as a JPG file.

## Role of AI tools

The entire app was built with the aid of ChatGPT. The starting point was a given requirements file (see [requirements](./requirements.md)). It took one hour and nine prompts for completing the app logic and fullfiling all requirements (see [chats](./chats.md)). Another sixty minutes were spent in styling. 

## Technologies

- React
- JavaScript
- HTML
- CSS
- ChatGPT

## Features

- **Code Generation:** Allows users to generate unique codes based on specified criteria.
  
- **Age Validations:** Ensures users are over 18 years of age before code generation.
  
- **Form Validations:** Verifies that all form fields are completed and data meets specified standards.
  
- **Rapid Regeneration Prevention:** Prevents generating another code with the same ID within 24 hours.
  
- **Data Persistence:** User data is stored locally.
  
- **Code Download as JPG:** Users can download the generated code as a JPG file for convenience.

## How to Use

1. **Complete the Form:** Enter your name, ID, date of birth, and Instagram username in the form.

2. **Field Validation:** Ensure all form fields are completed.

3. **ID Validation:** Verify that the ID has between 7 and 8 numbers.

4. **Generate Code:** Click on the "Generate Code" button to obtain a unique code.

5. **Code Display:** Once generated, the code will appear on the screen.

6. **Code Download:** Download the generated code as a JPG file by clicking on the corresponding button.



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanchezd90/beer-app
   ```

2. Navigate to the project directory:
    ```bash
    cd beer-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Running the App
```bash
npm start
```

The app will be accessible at http://localhost:5173 in your browser.