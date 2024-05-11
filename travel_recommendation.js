document.addEventListener("DOMContentLoaded", function() {
    // Make a GET request to fetch data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => {
            // Check if the response status is OK
            if (response.ok) {
                // Parse the JSON response
                return response.json();
            } else {
                // If response is not OK, throw an error
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            // Log the fetched data to the console to verify
            console.log(data);

            // Store the fetched data in a variable for filtering
            const recommendations = data.recommendations;

            // Function to filter recommendations based on search input
            function filterRecommendations(searchInput) {
                return recommendations.filter(recommendation => {
                    // Filter cities based on search input
                    const filteredCities = recommendation.cities.filter(city => {
                        return city.name.toLowerCase().includes(searchInput.toLowerCase());
                    });

                    // Return recommendation if any city matches the search input
                    return filteredCities.length > 0;
                });
            }

            // Function to display filtered recommendations
            function displayFilteredRecommendations(filteredRecommendations) {
                // Clear previous recommendations
                const recommendationsContainer = document.getElementById('recommendations');
                recommendationsContainer.innerHTML = '';

                // Loop through filtered recommendations and display them
                filteredRecommendations.forEach(recommendation => {
                    // Create recommendation element
                    const recommendationElement = document.createElement('div');
                    recommendationElement.classList.add('recommendation');

                    // Create elements for recommendation details
                    const nameElement = document.createElement('h2');
                    nameElement.textContent = recommendation.name;
                    recommendationElement.appendChild(nameElement);

                    const citiesListElement = document.createElement('ul');
                    recommendation.cities.forEach(city => {
                        const cityElement = document.createElement('li');
                        cityElement.textContent = city.name;
                        citiesListElement.appendChild(cityElement);
                    });
                    recommendationElement.appendChild(citiesListElement);

                    // Create and append image elements
                    recommendation.cities.forEach(city => {
                        const imageElement = document.createElement('img');
                        imageElement.src = city.imageUrl; // Set the image URL
                        imageElement.alt = city.name; // Set the alt text
                        recommendationElement.appendChild(imageElement);
                    });

                    // Append recommendation element to container
                    recommendationsContainer.appendChild(recommendationElement);
                });
            }

            // Search input event listener
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value;
                const filteredRecommendations = filterRecommendations(searchTerm);
                displayFilteredRecommendations(filteredRecommendations);
            });

            // Clear button event listener
            const clearButton = document.getElementById('clearButton');
            clearButton.addEventListener('click', function() {
                // Clear the search input
                searchInput.value = '';
                // Display all recommendations again
                displayFilteredRecommendations(recommendations);
            });

            // Display all recommendations initially
            displayFilteredRecommendations(recommendations);
        })
        .catch(error => {
            // Log any errors to the console
            console.error('Error fetching data:', error);
        });
});