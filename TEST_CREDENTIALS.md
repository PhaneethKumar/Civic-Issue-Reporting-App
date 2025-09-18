# 🔐 Test Account Credentials

## 👨‍💼 Admin Account
Use these credentials to access the **Admin Home Screen**:

- **Email**: `admin@city.gov`
- **OTP**: `123456`
- **User Type**: Administrator
- **Features**: Access to admin dashboard, issue management, and administrative functions

---

## 👥 Citizen Account  
Use these credentials to access the **Citizen Home Screen**:

- **Email**: `citizen@email.com`
- **OTP**: `654321`
- **User Type**: Citizen
- **Features**: Report issues, track progress, and basic citizen functions

## 🚪 Guest Access
For quick access without credentials:

- **Method**: Click "Continue as Guest" on citizen login screen
- **User Type**: Citizen (with limited features)
- **Features**: Browse issues, basic citizen functionality

---

## 🚀 How to Use

1. **Start your app** with `npm start` or `expo start`
2. Navigate through the onboarding screens
3. Choose **Admin Login** or **Citizen Login**
4. Enter the credentials above
5. You'll be automatically logged in and redirected to the appropriate home screen

## 📱 Login Flow

```
Onboarding → Auth Selection → Login Screen → Home Screen (Admin/Citizen)
```

## 🔄 Switching User Types

To test different user types:
1. Log out from the current session
2. Go through the login flow again with different credentials

---

**Note**: These are test credentials for development purposes only. In production, you would integrate with a real authentication service.