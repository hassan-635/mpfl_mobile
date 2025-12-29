# MPFL Mobile

Mobile client for the MPFL (Marketplace for Freelancers) app built with Expo & React Native.

## ⚡ Overview

- **Platform:** Expo (React Native)
- **Purpose:** Mobile frontend for MPFL — allows clients and freelancers to browse, create, and manage projects from mobile devices.
- **Tech:** Expo, React Native, React Navigation, Axios, AsyncStorage, NativeWind (Tailwind for RN)

---

## 🚀 Features

- Auth flow (login / signup) using JWT stored in `AsyncStorage`
- Project listing and detail screens
- Uploading and previewing files (images/docs)
- Notifications and project status updates
- Uses persistent API client in `src/utils/api.js`

---

## 🧰 Prerequisites

- Node.js (16+ recommended)
- npm or Yarn
- Expo CLI (optional if you use `npx expo`)
- For native device/emulator testing:
  - Android: Android Studio (emulator) or Expo Go app on device
  - iOS: Xcode (simulator) or Expo Go on a real device (macOS required)

---

## 📦 Installation

1. Clone the repo or navigate to the workspace root and open the `mpfl-mobile` folder.

2. Install dependencies:

```bash
# using npm
npm install

# or using yarn
yarn
```

---

## 💻 Running in development

Start the Expo dev server:

```bash
npm run start
# or
yarn start
```

- Open on Android emulator / device:
```bash
npm run android
# or
yarn android
```
- Open on iOS simulator / device (macOS):
```bash
npm run ios
# or
yarn ios
```
- Open in browser (web):
```bash
npm run web
# or
yarn web
```

Use the Expo Dev Tools or QR code to launch the app on devices via Expo Go.

---

## 🔧 Environment / API configuration

The app's API client is at `src/utils/api.js` and currently uses the production base URL:

```js
baseURL: 'https://mpfl-backend.onrender.com/api/v1'
```

If you're running the backend locally, update the `baseURL` to point to your backend. Common options:

- Android emulator (Android Studio): `http://10.0.2.2:<PORT>/api/v1`
- iOS simulator (localhost routing works): `http://localhost:<PORT>/api/v1`
- Real device: use your machine's LAN IP, e.g. `http://192.168.1.100:<PORT>/api/v1`

Tip: You can make `baseURL` configurable (e.g., using environment variables or a small config file) if you switch between local and production APIs frequently.

---

## 🔐 Auth behavior

- JWT tokens are saved to `AsyncStorage` under the key `token`.
- `src/utils/api.js` sets an Axios interceptor to include `Authorization: Bearer <token>` on outgoing requests.

---

## 📁 Project structure (high level)

- `src/` — main app source
  - `components/` — reusable UI components
  - `navigation/` — navigation stacks / tabs
  - `screens/` — app screens (Login, Dashboard, ProjectDetail, etc.)
  - `utils/` — helper modules (eg. `api.js`)

---

## ✅ Contributing

- Code style: follow existing project patterns and keep changes small & focused.
- Test on both Android and iOS where possible.
- Open PRs against `main` and provide a short description of changes and testing steps.

---

## 🧪 Useful commands

- `npm run start` — start Expo dev server
- `npm run android` — open Android emulator/device
- `npm run ios` — open iOS simulator/device
- `npm run web` — run web version

---

## 📬 Contact / Support

If you run into issues or have questions, open an issue in the repository or reach out to the project maintainers.

---

## 📄 License

Add license information here (e.g., MIT). If unsure, consult the upstream project owner.

---

*Generated README — adapt any sections (particularly environment/API info) to match your local workflow.*
