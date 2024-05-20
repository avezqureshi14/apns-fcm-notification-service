# Notification Service

This is an Express-based notification service that sends push notifications to both Android and iOS devices using Firebase Cloud Messaging (FCM) and Apple Push Notification Service (APNs).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/avezqureshi14/apns-fcm-notification-service
    cd apns-fcm-notification-service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```


3. Build Typescript files:
    ```bash
    tsc ./index.ts
    ```

3. Run:
    ```bash
    node ./index.js
    ```

4. Place your Firebase service account key JSON file in the root directory and update the path in `app.ts` or `index.ts`.

5. Place your APNs auth key file in the root directory and update the path in `app.ts` or `index.ts`.

## Configuration

### Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to your project settings.
3. Generate a new private key in the "Service accounts" tab and download the JSON file.
4. Save this file in your project directory (e.g., `./path/to/serviceAccountKey.json`).

### APNs Configuration

1. Log in to your [Apple Developer account](https://developer.apple.com/).
2. Navigate to "Certificates, Identifiers & Profiles".
3. Create a new APNs auth key and download the `.p8` file.
4. Note the `Key ID` and `Team ID`.
5. Save the `.p8` file in your project directory (e.g., `./path/to/APNsAuthKey_XXXXXXXXXX.p8`).

