
import React from 'react';
import PriceCard from './components/PriceCard';
import './App.css';

const App = () => {
  const priceCardsData = [
    {
      title: 'Basic Plan',
      price: '19.99',
      features: [
        { name: '10 GB Storage', included: true },
        { name: '2 Users Allowed', included: true },
        { name: 'Email Support', included: true },
        { name: '24/7 Support', included: false },
        { name: 'Free Custom Domain', included: false }
      ],
      buttonText: 'Sign Up'
    },
    {
      title: 'Pro Plan',
      price: '39.99',
      features: [
        { name: '50 GB Storage', included: true },
        { name: '5 Users Allowed', included: true },
        { name: 'Priority Email Support', included: true },
        { name: '24/7 Support', included: true },
        { name: 'Free Custom Domain', included: false }
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Enterprise Plan',
      price: '99.99',
      features: [
        { name: 'Unlimited Storage', included: true },
        { name: 'Unlimited Users', included: true },
        { name: '24/7 Support', included: true },
        { name: 'Free Custom Domain', included: true },
        { name: 'Dedicated Account Manager', included: true }
      ],
      buttonText: 'Contact Us'
    }
  ];

  return (
    <div className="App">
      <h1>Our Pricing</h1>
      <div className="price-cards-container">
        {priceCardsData.map((card, index) => (
          <PriceCard
            key={index}
            title={card.title}
            price={card.price}
            features={card.features}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
