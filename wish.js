//====================make wish ============================

 

    const getWishResponse = () => {
      const userWish = document.querySelector('#wishInput').value.trim();
      const resultElement = document.querySelector('#wishResult');

      if (!userWish) {
        resultElement.textContent = "Please enter a wish first.";
        return;
      }

      fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${makeAWishKey}`
        },
       body: JSON.stringify({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: userWish }],
  temperature: 0.9,         // Higher = more randomness
  top_p: 0.9,               // Consider a wider probability space
  frequency_penalty: 0.5,   // Slight penalty for repeated ideas
  top_k: 40                 // Let the model sample from a bigger pool
})
      })
      .then(response => response.json())
      .then(data => {
        resultElement.classList.remove('hide');
        const message = data.choices?.[0]?.message?.content || "No response received.";
        resultElement.innerText = message;
      })
      .catch(error => {
        console.error('Error:', error);
        resultElement.textContent = "Something went wrong while making your wish.";
      });
      const star = document.querySelector('.star');
        const wish = document.querySelector('.wish');
      setTimeout(() => {
        star.classList.remove('hide');
        wish.classList.add('hide');
        
        resultElement.classList.add('hide');
        location.reload();
      }, 10000);
      
    };

    const makeWishBtn = document.querySelector('#makeWishBtn');
    makeWishBtn.addEventListener('click', getWishResponse);