const mongoose = require('mongoose');
const Customer = require('../models/Customer');
require('dotenv').config();

// 10 Dummy Customers
const dummyCustomers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    password: 'demo123',
    age: 32,
    city: 'Mumbai',
    salary: 75000,
    preApproved: true,
    preApprovedAmount: 300000,
    creditScore: 820,
    purpose: 'Education',
    pan: 'ABCDE1234F',
    aadhaar: '1234 5678 9012',
    bankAccount: 'XXXX4567',
    phone: '+91 9876543210'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: 'demo123',
    age: 28,
    city: 'Delhi',
    salary: 55000,
    preApproved: true,
    preApprovedAmount: 200000,
    creditScore: 780,
    purpose: 'Medical',
    pan: 'FGHIJ5678K',
    aadhaar: '2345 6789 0123',
    bankAccount: 'XXXX7890',
    phone: '+91 9876543211'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    password: 'demo123',
    age: 35,
    city: 'Bangalore',
    salary: 95000,
    preApproved: true,
    preApprovedAmount: 500000,
    creditScore: 850,
    purpose: 'Business',
    pan: 'KLMNO9012P',
    aadhaar: '3456 7890 1234',
    bankAccount: 'XXXX2345',
    phone: '+91 9876543212'
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    password: 'demo123',
    age: 26,
    city: 'Hyderabad',
    salary: 45000,
    preApproved: false,
    preApprovedAmount: 0,
    creditScore: 720,
    purpose: 'Wedding',
    pan: 'PQRST3456U',
    aadhaar: '4567 8901 2345',
    bankAccount: 'XXXX6789',
    phone: '+91 9876543213'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    password: 'demo123',
    age: 40,
    city: 'Pune',
    salary: 120000,
    preApproved: true,
    preApprovedAmount: 800000,
    creditScore: 870,
    purpose: 'Home Renovation',
    pan: 'UVWXY7890Z',
    aadhaar: '5678 9012 3456',
    bankAccount: 'XXXX0123',
    phone: '+91 9876543214'
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    password: 'demo123',
    age: 29,
    city: 'Chennai',
    salary: 60000,
    preApproved: true,
    preApprovedAmount: 250000,
    creditScore: 790,
    purpose: 'Travel',
    pan: 'ZABCD1234E',
    aadhaar: '6789 0123 4567',
    bankAccount: 'XXXX4567',
    phone: '+91 9876543215'
  },
  {
    name: 'Karan Malhotra',
    email: 'karan.malhotra@example.com',
    password: 'demo123',
    age: 33,
    city: 'Mumbai',
    salary: 85000,
    preApproved: false,
    preApprovedAmount: 0,
    creditScore: 710,
    purpose: 'Other',
    pan: 'EFGHI5678J',
    aadhaar: '7890 1234 5678',
    bankAccount: 'XXXX8901',
    phone: '+91 9876543216'
  },
  {
    name: 'Divya Nair',
    email: 'divya.nair@example.com',
    password: 'demo123',
    age: 31,
    city: 'Kochi',
    salary: 70000,
    preApproved: true,
    preApprovedAmount: 350000,
    creditScore: 800,
    purpose: 'Education',
    pan: 'JKLMN9012O',
    aadhaar: '8901 2345 6789',
    bankAccount: 'XXXX2345',
    phone: '+91 9876543217'
  },
  {
    name: 'Rohit Verma',
    email: 'rohit.verma@example.com',
    password: 'demo123',
    age: 27,
    city: 'Jaipur',
    salary: 50000,
    preApproved: false,
    preApprovedAmount: 0,
    creditScore: 690,
    purpose: 'Medical',
    pan: 'OPQRS3456T',
    aadhaar: '9012 3456 7890',
    bankAccount: 'XXXX6789',
    phone: '+91 9876543218'
  },
  {
    name: 'Meera Desai',
    email: 'meera.desai@example.com',
    password: 'demo123',
    age: 36,
    city: 'Ahmedabad',
    salary: 100000,
    preApproved: true,
    preApprovedAmount: 600000,
    creditScore: 840,
    purpose: 'Business',
    pan: 'TUVWX7890Y',
    aadhaar: '0123 4567 8901',
    bankAccount: 'XXXX0123',
    phone: '+91 9876543219'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tata-loan-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing customers
    await Customer.deleteMany({});
    console.log('🗑️  Cleared existing customers');

    // Insert dummy customers
    const customers = await Customer.insertMany(dummyCustomers);
    console.log(`✅ Inserted ${customers.length} dummy customers`);

    console.log('\n📋 Dummy Customer Credentials:');
    console.log('================================');
    dummyCustomers.forEach((customer, index) => {
      console.log(`${index + 1}. Email: ${customer.email} | Password: demo123`);
    });
    console.log('================================\n');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
