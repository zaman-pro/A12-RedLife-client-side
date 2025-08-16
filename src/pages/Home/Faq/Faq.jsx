import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it safe to donate blood?",
      answer:
        "Yes, donating blood is completely safe. We use sterile, disposable equipment for each donor, and our staff are trained professionals. The amount taken is about 450ml, which your body replenishes quickly.",
    },
    {
      question: "Am I eligible to donate blood?",
      answer:
        "Generally, you must be 18-65 years old, weigh at least 50kg, and be in good health. There are some temporary deferrals for recent travel, illnesses, or certain medical conditions. We'll screen you before donation to confirm eligibility.",
    },
    {
      question: "How much time does it take to donate?",
      answer:
        "The actual donation takes about 10-15 minutes. Including registration, health screening, and recovery, the entire process typically takes 45-60 minutes.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "Men can donate every 3 months (up to 4 times a year) and women every 4 months (up to 3 times a year). This allows your body time to replenish its iron stores.",
    },
    {
      question: "Can I get any disease from donating?",
      answer:
        "No, you cannot contract any diseases from donating blood. All equipment used is sterile, single-use, and disposed of immediately after your donation.",
    },
    {
      question: "Will I be notified when my blood type is needed?",
      answer:
        "Yes, if you opt into our notification system, we'll contact you when there's a special need for your blood type. You can also check our blood supply levels online anytime.",
    },
    {
      question: "What happens after I donate?",
      answer:
        "After donating, you'll rest for 10-15 minutes with refreshments. Your blood will be tested, processed, and typically available to patients within 24-48 hours. You'll receive information about where your blood was sent.",
    },
    {
      question: "Should I eat or rest after donating?",
      answer:
        "Yes, drink extra fluids for 24-48 hours and avoid strenuous activity for 12 hours. Eat iron-rich foods to help replenish your iron stores. Most donors feel completely normal within a day.",
    },
  ];

  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg">
          Quick answers to common questions about blood donation.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              {activeIndex === index ? (
                <FaMinus className="text-secondary" />
              ) : (
                <FaPlus className="text-secondary" />
              )}
            </button>

            {activeIndex === index && (
              <div className="p-4">
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
