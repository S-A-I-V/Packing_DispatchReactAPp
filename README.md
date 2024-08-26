# Packing and Dispatch Monitoring System

Welcome to the **Packing and Dispatch Monitoring System**! This project is designed to streamline the process of packing and dispatching items in a warehouse setting by utilizing a responsive React.js web application. The application offers real-time barcode scanning, data entry, and a user-friendly interface for managing and monitoring the packing process.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-time Barcode Scanning**: Seamless integration with barcode readers for efficient data entry.
- **Redundancy Tracking**: Automatically detects and alerts on duplicate entries to prevent errors.
- **Station-wise Analytics**: Track performance metrics for each station, helping to identify high and low performers.
- **Data Export**: Easily export collected data as CSV files for further analysis.
- **Responsive Design**: A user-friendly interface that adapts to various screen sizes.
- **Customizable Order Types**: Dropdown selection for order types such as Customer (C) or Store (S).

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Analytics**: Grafana
- **Containerization**: Docker
- **Version Control**: Git, GitHub

## Installation

### Prerequisites

- **Node.js** (>= 14.x)
- **MySQL** database
- **Docker** (optional, for containerization)
- **Git** for version control

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/S-A-I-V/Packing_DispatchReactAPp.git
    cd Packing_DispatchReactAPp
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**
   - Create a MySQL database.
   - Configure the environment variables in the `.env` file (see [Environment Variables](#environment-variables)).

4. **Start the application:**
   - For development:
     ```bash
     npm start
     ```
   - Using Docker:
     ```bash
     docker-compose up
     ```

## Usage

### Running the Application

1. **Data Entry Mode**: 
   - Use the barcode scanner to scan items.
   - The system will automatically log the data and associate it with the correct station.

2. **Redundancy Alert**:
   - If a duplicate entry is scanned, a pop-up will alert with the message: "You are scanning a duplicate entry, hand over to shipping incharge."

3. **Analytics Mode**:
   - Navigate to the analytics section to view station-wise performance metrics.

### Export Data

- **CSV Export**: Export the current data set as a CSV file for further analysis.

## Project Structure

Packing_DispatchReactAPp/ ├── public/ ├── src/ │ ├── components/ │ ├── pages/ │ ├── services/ │ ├── App.js │ ├── index.js ├── .env ├── package.json ├── Dockerfile ├── docker-compose.yml └── README.md


## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

REACT_APP_API_URL=http://localhost:5000/api
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=packing_dispatch
Contributing
We welcome contributions! If you'd like to contribute, please fork the repository and submit a pull request.

Steps to Contribute:
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

##License

This project is licensed under the MIT License - see the LICENSE file for details.

##Contact

For any questions or suggestions, please feel free to reach out:

GitHub: S-A-I-V
Email: saideep.verma01@gmail.com
Thank you for using the Packing and Dispatch Monitoring System! We hope it makes your workflow more efficient and error-free.

This `README.md` provides a comprehensive overview of your project, making it easy for other
