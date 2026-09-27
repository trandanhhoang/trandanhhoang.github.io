import React, { useState, useEffect } from 'react';

const MatchingGame = ({ pairs, feedbackSuccess, feedbackError }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({}); // Lưu các cặp đã nối đúng { leftId: rightId }
  const [wrongAttempt, setWrongAttempt] = useState(null);

  useEffect(() => {
    // Shuffle mảng để tăng tính thử thách
    setLeftItems([...pairs].sort(() => Math.random() - 0.5));
    setRightItems([...pairs].sort(() => Math.random() - 0.5));
  }, [pairs]);

  const handleLeftClick = (item) => {
    if (matches[item.id]) return; // Đã nối đúng rồi thì bỏ qua
    setSelectedLeft(item);
    setWrongAttempt(null);
  };

  const handleRightClick = (item) => {
    if (!selectedLeft) return;

    if (selectedLeft.id === item.id) {
      // Đúng
      setMatches((prev) => ({ ...prev, [selectedLeft.id]: item.id }));
      setSelectedLeft(null);
      setWrongAttempt(null);
    } else {
      // Sai
      setWrongAttempt(item.id);
      setTimeout(() => setWrongAttempt(null), 500);
    }
  };

  const isFinished = Object.keys(matches).length === pairs.length;

  return (
    <div style={{
      border: '2px solid var(--ifm-color-primary)',
      borderRadius: '10px',
      padding: '24px',
      margin: '24px 0',
      backgroundColor: 'var(--ifm-background-color)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Cột Trái */}
        <div style={{ flex: 1 }}>
          {leftItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLeftClick(item)}
              style={{
                padding: '10px',
                margin: '10px 0',
                border: selectedLeft?.id === item.id ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: matches[item.id] ? 'var(--ifm-color-success-light)' : 'transparent',
                opacity: matches[item.id] ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
            >
              {item.left} {matches[item.id] && ' ✅'}
            </div>
          ))}
        </div>

        {/* Cột Phải */}
        <div style={{ flex: 1 }}>
          {rightItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRightClick(item)}
              style={{
                padding: '10px',
                margin: '10px 0',
                border: wrongAttempt === item.id ? '2px solid var(--ifm-color-danger)' : '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: Object.values(matches).includes(item.id) ? 'var(--ifm-color-success-light)' : 'transparent',
                opacity: Object.values(matches).includes(item.id) ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
            >
              {item.right}
            </div>
          ))}
        </div>
      </div>

      {isFinished && (
        <p style={{ marginTop: '20px', color: 'var(--ifm-color-success)', fontWeight: 'bold' }}>
          {feedbackSuccess || "Tuyệt vời!"}
        </p>
      )}
    </div>
  );
};

export default MatchingGame;