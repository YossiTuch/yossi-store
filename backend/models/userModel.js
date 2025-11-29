import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    favorites: {
      type: [String],
      default: [],
    },
    cart: {
      cartItems: {
        type: Array,
        default: [],
      },
      shippingAddress: {
        type: Object,
        default: {},
      },
      paymentMethod: {
        type: String,
        default: "PayPal",
      },
      itemsPrice: {
        type: String,
        default: "0.00",
      },
      shippingPrice: {
        type: String,
        default: "0.00",
      },
      taxPrice: {
        type: String,
        default: "0.00",
      },
      totalPrice: {
        type: String,
        default: "0.00",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
