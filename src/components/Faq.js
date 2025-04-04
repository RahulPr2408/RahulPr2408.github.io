import React from "react";
import "./Faq.css"; // Style accordingly

const Faq = () => {
  const faqs = [
    {
      question: "Will I be able to reuse my coupons?",
      answer: "No. For every new order, you will need to download a new coupon to be able to get it redeemed from our partner restaurants.",
    },
    // Add more FAQs if needed
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">FAQ’s</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">Q: {faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;