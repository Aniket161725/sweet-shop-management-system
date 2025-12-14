import mongoose from "mongoose";
import Sweet from "../models/sweet.model.js";
import dotenv from "dotenv";
dotenv.config();


const sweets = [
  {
    name: "Gulab Jamun",
    category: "Milk-based",
    price: 120,
    quantity: 50,
    image: "https://i.imgur.com/JrjFa9W.jpg",
  },
  {
    name: "Rasgulla",
    category: "Chhena",
    price: 100,
    quantity: 45,
    image: "https://i.imgur.com/yVJqO3Y.jpg",
  },
  {
    name: "Kaju Katli",
    category: "Dry Fruit",
    price: 300,
    quantity: 35,
    image: "https://i.imgur.com/4mWGf7k.jpg",
  },
  {
    name: "Jalebi",
    category: "Fried Sweet",
    price: 80,
    quantity: 60,
    image: "https://i.imgur.com/Q9uB9Yp.jpg",
  },
  {
    name: "Boondi Laddu",
    category: "Gram Flour",
    price: 150,
    quantity: 40,
    image: "https://i.imgur.com/09YnYVh.jpg",
  },
  {
    name: "Motichoor Laddu",
    category: "Gram Flour",
    price: 180,
    quantity: 35,
    image: "https://i.imgur.com/9Hj8Rka.jpg",
  },
  {
    name: "Barfi",
    category: "Milk-based",
    price: 200,
    quantity: 30,
    image: "https://i.imgur.com/CMz4Y0k.jpg",
  },
  {
    name: "Rasmalai",
    category: "Milk-based",
    price: 250,
    quantity: 25,
    image: "https://i.imgur.com/Po6y0nh.jpg",
  },
  {
    name: "Mysore Pak",
    category: "Ghee Sweet",
    price: 220,
    quantity: 20,
    image: "https://i.imgur.com/EOjQszs.jpg",
  },
  {
    name: "Peda",
    category: "Milk-based",
    price: 160,
    quantity: 45,
    image: "https://i.imgur.com/PmAPa7o.jpg",
  },
  {
    name: "Sandesh",
    category: "Bengali Sweet",
    price: 180,
    quantity: 25,
    image: "https://i.imgur.com/Rfto7Wl.jpg",
  },
  {
    name: "Malpua",
    category: "Fried Sweet",
    price: 130,
    quantity: 30,
    image: "https://i.imgur.com/FpBNuHk.jpg",
  },
  {
    name: "Gajar Ka Halwa",
    category: "Halwa",
    price: 200,
    quantity: 20,
    image: "https://i.imgur.com/bM9Bc1v.jpg",
  },
  {
    name: "Soan Papdi",
    category: "Flaky Sweet",
    price: 140,
    quantity: 50,
    image: "https://i.imgur.com/nmB1tDq.jpg",
  },
  {
    name: "Rabri",
    category: "Milk-based",
    price: 180,
    quantity: 15,
    image: "https://i.imgur.com/iH9Z4lM.jpg",
  },
  {
    name: "Ghevar",
    category: "Rajasthani Sweet",
    price: 250,
    quantity: 20,
    image: "https://i.imgur.com/XAYrD4k.jpg",
  },
  {
    name: "Kheer",
    category: "Milk Pudding",
    price: 120,
    quantity: 25,
    image: "https://i.imgur.com/J1V0Cnc.jpg",
  },
  {
    name: "Besan Barfi",
    category: "Gram Flour",
    price: 160,
    quantity: 30,
    image: "https://i.imgur.com/k1OGu0R.jpg",
  },
  {
    name: "Cham Cham",
    category: "Bengali Sweet",
    price: 170,
    quantity: 15,
    image: "https://i.imgur.com/vrUVxI1.jpg",
  },
  {
    name: "Balushahi",
    category: "Traditional Sweet",
    price: 130,
    quantity: 25,
    image: "https://i.imgur.com/ZnGLoGg.jpg",
  },
  {
    name: "Kulfi",
    category: "Frozen Dessert",
    price: 90,
    quantity: 40,
    image: "https://i.imgur.com/DYxq1C4.jpg",
  },
  {
    name: "Petha",
    category: "Agra Special",
    price: 110,
    quantity: 35,
    image: "https://i.imgur.com/V4kNp3z.jpg",
  },
  {
    name: "Shrikhand",
    category: "Milk-based",
    price: 180,
    quantity: 25,
    image: "https://i.imgur.com/kQnLGGg.jpg",
  },
  {
    name: "Badam Halwa",
    category: "Dry Fruit",
    price: 300,
    quantity: 20,
    image: "https://i.imgur.com/1pGJHug.jpg",
  },
  {
    name: "Modak",
    category: "Maharashtrian Sweet",
    price: 150,
    quantity: 40,
    image: "https://i.imgur.com/h0wZsRk.jpg",
  },
];


const seedSweets = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Seeding sweets...");

    await Sweet.deleteMany({});
    await Sweet.insertMany(sweets);

    console.log("✅ Sweets Seeded Successfully!");
    process.exit(0);
  } catch (err) {
    console.log("❌ Error Seeding Sweets:", err);
    process.exit(1);
  }
};

seedSweets();