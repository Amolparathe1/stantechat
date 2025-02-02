Overview

This is a React Native CRUD application that demonstrates the use of SQLite for offline storage, Redux Toolkit for state management, and basic Create, Read, Update, Delete (CRUD) operations. Additionally, it includes a data synchronization mechanism to push offline-stored data to the server when the internet connection is restored.

Features
Offline Data Storage using SQLite.

Redux Toolkit for centralized state management.

CRUD Operations (Add, Edit, Delete items).

Navigation with React Navigation.

Validation for input fields.

Sync Mechanism:

If there's no internet, new data is stored in a sync queue in SQLite.

When the internet is available, the pending records are pushed to the server.

After successful sync, records are deleted from the sync queue.

Profile Page:

Displays user profile information fetched from Redux state.

Allows updating profile details with a simple form.


project-root/
│── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screens/ local components and styles
│   ├── redux/            # Redux setup (store, slices)
│   ├── database/         # SQLite setup and query
│   ├── styles/           # Separate styling files
│   ├── navigation/       # App navigation setup
|   ├── types             # predefined types for props and methods
│── App.tsx               # Entry point of the app
│── package.json          # Project dependencies
│── README.md             # Project documentation

Clone the repository:
git clone  git url
cd stantechat

Install dependencies:
yarn install
# OR
npm install


Run the project:

For Android:
npx react-native run-android

For iOS:
npx pod-install
npx react-native run-ios


Usage

Open the app and see the list of items.

Click Add New Item to create an entry.

Click Edit on an item to modify it.

Click Delete to remove an item from the list.

If offline, new data will be stored locally in the sync queue and automatically sent to the server when online.

Go to the Profile Page to view and update user details.


Sync Logic

Uses react-native-netinfo to detect network connectivity.

If offline, new records are stored in a sync table in SQLite.

When the internet is back, pending records are automatically sent to the server.

After a successful API request, records are deleted from the sync table.

SQLite database supports full CRUD operations.



Technologies Used

React Native 0.77

Redux Toolkit for state management

SQLite for offline database

React Navigation for screen navigation

NetInfo for network status monitoring


Known Issues & Assumptions

The app does not handle real-time two-way sync (only client-to-server push).

Deleted items are removed permanently without a soft delete.