import User from '../db/mongo/models/user';
import Product from '../db/mongo/models/product';

User.find({}).remove()
  .then(() => {
    User.create({
      phone: 6124145040.0,
      password: 'arc123',
      name: 'Steve Conrad',
      location: 'Goma',
      role: 'user',
      blockchain_id: 'd1ab1f9b817ce455bb727275357441323e493384',
      initiative: {
        name: 'Asili Farmer Initiative',
        type: 'Agriculture',
        location: 'Bukavu'
      },
      pin: 4785
    }, {
      phone: 6124144050.0,
      password: 'arc123',
      name: 'Portal Administrator',
      location: 'Bukavu',
      role: 'admin',
      blockchain_id: 'edc12cb1f583e212243b7b9794ba00776d3ce295',
      initiative: {
        name: 'Asili Farmer Initiative',
        type: 'Agriculture',
        location: 'Bukavu'
      },
      pin: 4785,
      age: 50
    }, {
      phone: 9526496387.0,
      password: 'arc123',
      name: 'SMS Administrator',
      location: 'Bukavu',
      role: 'admin',
      tokens: [
      ],
      blockchain_id: '4999e240151dd7a234e2591a84383c3503692639',
      initiative: {
      },
      pin: 4785,
      age: 100
    })
      .then(() => {
        console.log('finished populating users');
      });
  });

Product.find({}).remove()
  .then(() => {
    Product.create({
      seller: 'Steve Conrad',
      seller_id: 'd1ab1f9b817ce455bb727275357441323e493384',
      name: 'Chickens',
      desc: '2 chickens - good egg layers',
      category: 'Livestock',
      quantity: 10,
      price: 2.0,
      pricing_unit: 'per chicken',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/chicken.jpg'
        }
      ]
    }, {
      seller: 'Portal Admin',
      seller_id: 'e16ae3d122b5b4262e153c56f55d5c5e0dcc993c',
      name: 'Bananas',
      desc: 'I have large lots of bananas. Sold by the kg',
      category: 'Food',
      quantity: 50,
      price: 0.5,
      pricing_unit: 'per kg',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/bananas.jpg'
        }
      ]
    }, {
      seller: 'Portal Admin',
      seller_id: 'edc12cb1f583e212243b7b9794ba00776d3ce295',
      name: 'Goats',
      desc: '2 male goats, 3 female goats',
      category: 'Livestock',
      quantity: 5,
      price: 30.0,
      pricing_unit: 'per goat',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/goat.jpg'
        }
      ]
    }, {
      seller: 'Steve Conrad',
      seller_id: 'd1ab1f9b817ce455bb727275357441323e493384',
      name: 'Cassava',
      desc: 'Cassava Bread',
      category: 'Food',
      price: 1.5,
      quantiy: 1,
      pricing_unit: 'per kg',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/cassava.jpg'
        }
      ]
    }, {
      seller: 'Steve Conrad',
      seller_id: 'd1ab1f9b817ce455bb727275357441323e493384',
      name: 'Hair Care',
      desc: 'Hair Braiding',
      category: 'Services',
      quantity: 1,
      price: 4.0,
      pricing_unit: 'per visit',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/braiding.jpg'
        }
      ]
    }, {
      seller: 'Steve Conrad',
      seller_id: 'd1ab1f9b817ce455bb727275357441323e493384',
      name: 'Bike Trailer',
      desc: 'Durable trailer for hauling goods to market',
      category: 'Machinery',
      price: 200.0,
      pricing_unit: 'per trailer',
      photos: [
        {
          filename: 'https://refcampweb.s3-us-west-2.amazonaws.com/1492022465075.jpg'
        }
      ]
    })
      .then(() => {
        console.log('finished populating products');
      });
  });
