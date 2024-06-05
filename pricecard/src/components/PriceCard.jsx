
import React from 'react';
import './PriceCard.css';

const PriceCard = ({ title, price, features, buttonText }) => {
  return (
    <div className="price-card">
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index} className={feature.included ? 'included' : 'not-included'}>
            {feature.included ? '✓' : '✗'} {feature.name}
          </li>
        ))}
      </ul>
      <button>{buttonText}</button>
    </div>
  );
};

export default PriceCard;
