# RedLife - Client

RedLife is a full-featured blood donation management platform that helps bridge the gap between blood donors and recipients. It also includes role-based dashboards, a funding system, and content management features to streamline the blood donation process.

## 🌐 Live Website

🔗 [RedLife Live Site](https://b11a12-redlife-zaman-pro.netlify.app)

## 👤 Admin Credentials

- **Email**: admin@redlife.com
- **Password**: Pa$$w0rd!!

## 📌 Features

1. 🔐 **Authentication System** — Email/password-based registration & login with role-based access control.
2. 🩸 **Blood Donation Requests** — Donors can request blood; admins/volunteers can manage them.
3. 🧑‍🤝‍🧑 **Role Management** — Admin can promote users to volunteers or other admins.
4. 🚫 **User Blocking** — Admins can block/unblock users (blocked users cannot request donations).
5. 📝 **Content Management System** — Admins and volunteers can write blogs with publish/unpublish options.
6. 💳 **Stripe Integration** — Users can donate funds securely using Stripe.
7. 📊 **Dashboard Statistics** — Admin dashboard shows total users, requests, and funds.
8. 🔍 **Donor Search** — Users can search for donors by blood group, district, and upazila.
9. 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile devices.
10. 🧠 **TanStack Query** — All GET requests use React Query for caching and state management.
11. 📦 **Image Upload with imageBB** — Used for uploading avatars and blog thumbnails.
12. ✅ **Persistent Login** — Private routes remain accessible even after refresh.
13. 📅 **Pagination & Filtering** — Applied to all tables where data is listed.
14. 🎉 **Toasts & Alerts** — SweetAlert2 and React Hot Toast used for feedback on all actions.

## 🚀 Tech Stack

- React.js + React Router
- Tailwind CSS + DaisyUI
- Firebase Auth
- Stripe for payments
- React Hook Form + Zod validation
- TanStack React Query

To install dependencies separately, use:

```sh
npm install <package-name>
```

## Installation and Setup:

1. Clone the repository:
   ```bash
   git clone https://github.com/zaman-pro/RedLife-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RedLife-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Add a `.env.local` file with necessary keys (e.g., firebase config keys, base api url, imgbb api key and stripe publishable key).
5. Start the development server:
   ```bash
   npm run dev
   ```

## Contribution Guidelines:

- Fork the repository and create a new branch for your feature.
- Submit a pull request with detailed information about your changes.

---
