import React, { useState } from 'react';

const MultipleChoice = ({ question, options, correctIndex, feedback }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  return (
      <div
          style={{
            border: '2px solid var(--ifm-color-primary)',
            borderRadius: '10px',
            padding: '24px',
            margin: '24px 0',
            backgroundColor: 'var(--ifm-background-color)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
      >
        <p style={{ color: 'var(--ifm-font-color-base)' }}><strong>{question}</strong></p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {options.map((opt, i) => (
              <li
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    cursor: 'pointer',
                    margin: '6px 0',
                    padding: '6px',
                    border: selected === i ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px',
                  }}
              >
                {opt}
              </li>
          ))}
        </ul>
        {showFeedback && (
            <p style={{ color: selected === correctIndex ? 'var(--ifm-color-success)' : 'var(--ifm-color-danger)' }}>
              {feedback[selected]}
            </p>
        )}
      </div>
  );
};

export default MultipleChoice;
