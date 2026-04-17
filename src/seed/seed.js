const mongoose = require('mongoose');
const path = require('path');
const Product = require('../models/Product');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const products = [
    {
        title: "ESSENTIAL OVERSIZED TEE",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        category: "Essentials",
        isFeatured: true,
        stock: 50
    },
    {
        title: "MODULAR CARGO PANTS",
        price: 240.00,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
        category: "Bottoms",
        isFeatured: true,
        stock: 30
    },
    {
        title: "TECHNICAL SHELL JACKET",
        price: 450.00,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        category: "Outerwear",
        isFeatured: true,
        stock: 15
    },
    {
        title: "MONOCHROME BEANIE",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1576871337622-f21ae3a68ad0?auto=format&fit=crop&w=800&q=80",
        category: "Accessories",
        isFeatured: true,
        stock: 100
    }
];

const seedDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined in the environment variables');
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Database Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
