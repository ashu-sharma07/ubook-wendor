# UBook - Booking Management System

Welcome to UBook, a comprehensive booking management system designed for users to find and book various professional services. This README file will guide you through setting up and running the project.

![uBook](https://github.com/user-attachments/assets/f2fe83a9-1fd5-41f1-be14-c2b06c3de445)

## Project Summary

UBook allows users to:

- **Search and Browse Professions:** Find professionals based on their services and categories.
- **Book Appointments:** Choose a professional, select an available slot, and confirm the booking.
- **Manage Bookings:** View and manage existing bookings.

## Key Features

- **Home Page:** Search for professions and view them categorized for easy navigation.
- **Professional Listing:** Browse professionals based on the selected profession.
- **Booking Confirmation:** Input address, choose a slot, and complete the booking with payment.
- **Login/Signup:** Simple phone number-based login with OTP.
- **My Bookings:** List and manage all bookings for the logged-in user.
- **Booking Details:** View detailed information about each booking and the option to cancel.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- AWS S3 bucket configured (for image uploads)

### Tech Stack

- **Frontend:**
  - ReactJS
  - JavaScript

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize ORM

- **AWS Services:**
  - AWS EC2
  - AWS SNS
  - AWS S3
  - AWS CloudFront
  
## Live Link

- **Frontend:** [UBook Frontend](https://ubook.ashusharma.in/) -  https://ubook.ashusharma.in/
- **Backend (API):** [UBook API](https://ubook-api.ashusharma.in/) - https://ubook-api.ashusharma.in


### Installation

1. **Clone the Repository**

   ```bash
   https://github.com/ashu-sharma07/ubook-wendor.git
   cd ubook-wendor
   
   ## Installation Steps

1. **Install Node Modules:**
    - Navigate to the `frontend` folder and install the dependencies:
      ```sh
      cd frontend
      npm install
      ```
    - Navigate to the `backend` folder and install the dependencies:
      ```sh
      cd ../backend
      npm install
      ```

2. **Setup Environment Variables:**
    - In the `backend` folder, create a file named `.env` and add all the environment variables as specified in `.sample.env`.

3. **Configure Frontend Base URL:**
    - Navigate to the `frontend/src/utils` folder and update the `axiosInstance` file with the correct base URL:
      ```js
        // your api url
      export const baseURL = "http://localhost:4055/api/v1";
      ```

4. **Start the Backend:**
    - In the `backend` folder, run the following command to start the backend server:
      ```sh
      npm run start
      ```

5. **Start the Frontend:**
    - In the `frontend` folder, run the following command to start the frontend development server:
      ```sh
      npm run dev
      ```

