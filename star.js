


const getRandomStar = () => {
    // Generate a random letter to search stars by name
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z

    // Fetch stars using the API
    fetch(`https://api.api-ninjas.com/v1/stars?name=${randomLetter}`, {
        method: 'GET',
        headers: { 'X-Api-Key': apiNinjaKey }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log("No stars found, try again.");
                return;
            }
            
            // Pick a random star from the list
            const star = data[Math.floor(Math.random() * data.length)];
            
            // Display a wish message
            const wishText = document.querySelector('#wish');
            wishText.innerHTML = `Wish on <strong>${star.name}</strong> in the <strong>${star.constellation}</strong> constellation! 
         Its <strong>${star.distance_light_year} light-years</strong> away.`;
         
        })
        .catch(error => {
            console.error('Error fetching star:', error);
        });
        const star = document.querySelector('.star');
        const wish = document.querySelector('.wish');
        setTimeout(() => {
          star.classList.add('hide');
          
          wish.classList.remove('hide')
        }, 5000);

}

const getStarBtn = document.querySelector('#getStarBtn')

getStarBtn.addEventListener('click', getRandomStar);

