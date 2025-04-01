exports.handler = async () => {
    const quotes = [
      "ความคิดนี้ดี ทำเลยอย่าไปสนใจ",
      "ทำต่อไป",
      "มันดีอยู่แล้ว",
      "ยังก่อน",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "
    ];
  
    const random = quotes[Math.floor(Math.random() * quotes.length)];
  
    return {
      statusCode: 200,
      body: JSON.stringify({ quote: random })
    };
  };
  