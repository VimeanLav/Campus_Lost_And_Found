import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    enum: [
      "Electronics",
      "Books",
      "Clothing",
      "Accessories",
      "ID Cards",
      "Keys",
      "Bags",
      "Other",
    ],
  },
  location: {
    type: String,
    required: [true, "Please provide the location where item was found"],
  },
  dateFound: {
    type: Date,
    required: [true, "Please provide the date when item was found"],
  },
  images: [
    {
      type: String, // URLs to images
    },
  ],
  contactInfo: {
    phone: String,
    email: String,
  },
  status: {
    type: String,
    enum: ["active", "claimed", "closed"],
    default: "active",
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.FoundItem ||
  mongoose.model("FoundItem", FoundItemSchema);
