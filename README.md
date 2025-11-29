# YossiStore - E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features a modern, responsive UI with dark mode support, user authentication, product management, shopping cart, order processing, and PayPal integration.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login with JWT-based authentication
- **Product Browsing**: Browse products with filtering, search, and category navigation
- **Shopping Cart**: Add/remove items, quantity management, persistent cart across sessions
- **Favorites**: Save favorite products for quick access
- **Order Management**: Place orders, view order history, and track order status
- **User Profile**: Update profile information and change password
- **Product Reviews**: View and submit product reviews and ratings
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes

### Admin Features
- **Dashboard**: View sales analytics, total orders, customers, and revenue charts
- **Product Management**: Create, update, delete, and manage products
- **Category Management**: Create and manage product categories
- **User Management**: View and manage user accounts
- **Order Management**: View and update order statuses
- **Image Upload**: Upload product images

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite React** - UI component library
- **React Icons** - Icon library
- **ApexCharts** - Data visualization
- **React Toastify** - Toast notifications
- **React Slick** - Carousel component
- **PayPal SDK** - Payment integration
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Joi** - Input validation
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting middleware
- **Compression** - Response compression

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **PayPal Developer Account** (for payment integration - optional)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YossiStore
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGO_URI=mongodb://localhost:27017/yossistore
   # Or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/yossistore

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here

   # PayPal Configuration (optional)
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```
   This will populate the database with sample products, categories, and an admin user.

## 🚀 Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend only:**
```bash
npm run backend
```

**Frontend only:**
```bash
npm run frontend
```

The application will be available at:
- **Frontend**: http://localhost:5173 (or the port shown in terminal)
- **Backend API**: http://localhost:5000

### Production Build

**Build frontend:**
```bash
cd frontend
npm run build
```

**Start backend:**
```bash
npm run backend
```

## 📁 Project Structure

```
YossiStore/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── data/            # Database seeders and initialization
│   ├── logger/          # Logging utilities
│   ├── middlewares/     # Express middlewares
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── validations/     # Input validation schemas
│   └── index.js         # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   │   ├── Admin/   # Admin pages
│   │   │   ├── Auth/    # Authentication pages
│   │   │   ├── Orders/  # Order pages
│   │   │   ├── Products/# Product pages
│   │   │   └── User/    # User pages
│   │   ├── redux/       # Redux store and slices
│   │   │   ├── api/     # RTK Query API slices
│   │   │   └── features/ # Feature slices
│   │   └── utils/       # Utility functions
│   └── vite.config.js   # Vite configuration
│
└── images/              # Static product images
```

## 🔐 Default Admin Account

After seeding the database, you can log in with:
- **Email**: admin@example.com
- **Password**: admin123

**⚠️ Important**: Change the admin password in production!

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/top` - Get top-rated products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (Admin only)
- `PUT /api/category/:id` - Update category (Admin only)
- `DELETE /api/category/:id` - Delete category (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/pay` - Update order payment status
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `GET /api/orders/admin/stats` - Get order statistics (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Upload
- `POST /api/upload` - Upload product image

## 🎨 Features in Detail

### Shopping Cart
- Persistent cart that syncs with backend
- Quantity management
- Automatic cart merge when logging in
- Real-time cart count indicator

### Product Management
- Advanced filtering by category, price range, and search
- Product carousel on homepage
- Product details with tabs (Description, Reviews, Shipping)
- Image gallery support

### Order Processing
- Multi-step checkout process
- Shipping address form
- PayPal payment integration
- Order confirmation and tracking

### Admin Dashboard
- Sales analytics with charts
- Revenue tracking
- Customer statistics
- Order management
- Product and category CRUD operations

## 🔒 Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Input validation with Joi
- Rate limiting on API endpoints
- CORS configuration
- Secure file upload handling
- Admin route protection

## 🧪 Development Scripts

```bash
# Run development server (both frontend and backend)
npm run dev

# Run backend only
npm run backend

# Run frontend only
npm run frontend

# Seed database
npm run seed

# Cleanup unused images
npm run cleanup:images
```

## 📝 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PAYPAL_CLIENT_ID` | PayPal client ID for payments | No | - |

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct
- Check that `MONGO_URI` in `.env` is properly formatted

### Port Already in Use
- Change the `PORT` in `.env` or kill the process using the port
- For frontend, Vite will automatically use the next available port

### Image Upload Issues
- Ensure the `backend/uploads` directory exists
- Check file permissions on the uploads directory
- Verify image file size limits

### PayPal Integration
- Ensure `PAYPAL_CLIENT_ID` is set in `.env`
- Use sandbox credentials for testing
- Verify PayPal SDK is properly configured

## 📦 Dependencies

### Key Frontend Dependencies
- `react` ^19.1.0
- `react-router` ^7.6.2
- `@reduxjs/toolkit` ^2.8.2
- `tailwindcss` ^4.1.4
- `flowbite-react` ^0.11.7
- `react-apexcharts` ^1.7.0
- `@paypal/react-paypal-js` ^8.8.3

### Key Backend Dependencies
- `express` ^5.1.0
- `mongoose` ^8.16.0
- `jsonwebtoken` ^9.0.2
- `bcryptjs` ^3.0.2
- `multer` ^2.0.1
- `joi` ^18.0.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

YossiStore - E-Commerce Platform

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the database solution
- All open-source contributors whose packages made this project possible

---

**Note**: This is a development project. For production deployment, ensure to:
- Set secure environment variables
- Enable HTTPS
- Configure proper CORS settings
- Set up proper error logging and monitoring
- Implement additional security measures
- Optimize images and assets
- Set up CI/CD pipeline
