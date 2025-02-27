document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    const navbar = document.querySelector('.navbar');
    
    let searchOpen = false;
    let selectedSuggestionIndex = -1;
    const suggestions = [
        { icon: 'fa-home', text: 'home', url: 'index.html' },
        { icon: 'fa-code', text: 'projects', url: 'projects.html' },
        { icon: 'fa-pen-to-square', text: 'blog', url: 'blog.html' },
        { icon: 'fa-rss', text: 'rss', url: 'resources.html' },
        { icon: 'fa-film', text: 'kino', url: 'kino.html' },
        { icon: 'fa-newspaper', text: 'log', url: 'log.html' },
        { icon: 'fa-brands fa-github', text: 'github', url: 'https://github.com/jaykzu' },
        { icon: 'fa-brands fa-twitter', text: 'x/twtr', url: 'https://twitter.com/jaykzu' },
        { icon: 'fa-gear', text: 'settings', url: 'settings.html' }
    ];
    
    // Toggle search function
    function toggleSearch() {
        searchOpen = !searchOpen;
        
        if (searchOpen) {
            // Open search
            searchModal.classList.add('open');
            navbar.style.opacity = '0';
            setTimeout(() => {
                searchInput.focus();
                renderSuggestions(suggestions); // Show all suggestions initially
            }, 300);
        } else {
            // Close search
            searchModal.classList.remove('open');
            navbar.style.opacity = '1';
            searchInput.value = '';
            selectedSuggestionIndex = -1;
        }
    }
    
    // Render suggestions based on search input
    function renderSuggestions(filteredSuggestions) {
        suggestionsContainer.innerHTML = '';
        
        if (filteredSuggestions.length === 0) {
            const noResultsEl = document.createElement('div');
            noResultsEl.className = 'suggestion-item';
            noResultsEl.innerHTML = '<span class="suggestion-icon"><i class="fa-solid fa-circle-exclamation"></i></span><span class="suggestion-text">No results found</span>';
            suggestionsContainer.appendChild(noResultsEl);
            return;
        }
        
        filteredSuggestions.forEach((suggestion, index) => {
            const suggestionEl = document.createElement('a');
            suggestionEl.className = 'suggestion-item' + (index === selectedSuggestionIndex ? ' selected' : '');
            suggestionEl.href = suggestion.url;
            // Add data-index for easier retrieval later
            suggestionEl.setAttribute('data-index', index);
            suggestionEl.innerHTML = `
                <span class="suggestion-icon"><i class="fa-solid ${suggestion.icon}"></i></span>
                <span class="suggestion-text">${suggestion.text}</span>
            `;
            
            // Click event to navigate to the suggestion URL
            suggestionEl.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = suggestion.url;
                toggleSearch(); // Close search after selecting
            });
            
            // Mouse enter to select this suggestion
            suggestionEl.addEventListener('mouseenter', function() {
                selectedSuggestionIndex = index;
                highlightSelectedSuggestion();
            });
            
            suggestionsContainer.appendChild(suggestionEl);
        });
    }
    
    // Highlight the selected suggestion and scroll into view
    function highlightSelectedSuggestion() {
        const suggestionItems = suggestionsContainer.querySelectorAll('.suggestion-item');
        
        suggestionItems.forEach((item, index) => {
            if (index === selectedSuggestionIndex) {
                item.classList.add('selected');
                item.style.backgroundColor = 'var(--palenight-lighter)';
                
                // Critical fix: Ensure the selected item is visible in the scrollable container
                // This uses scrollIntoView with behavior: 'smooth' for a nice scrolling effect
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest' // Will scroll just enough to make the element visible
                    });
                }, 10); // Small timeout to ensure DOM updates before scrolling
                
            } else {
                item.classList.remove('selected');
                item.style.backgroundColor = '';
            }
        });
    }
    
    // Filter suggestions based on input
    function filterSuggestions(query) {
        if (!query) return suggestions; // Show all if empty
        
        query = query.toLowerCase();
        return suggestions.filter(suggestion => {
            return suggestion.text.toLowerCase().includes(query);
        });
    }
    
    // Open search with button click
    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleSearch();
        });
    }
    
    // Toggle search with keyboard shortcut (Cmd+K or Ctrl+K)
    document.addEventListener('keydown', function(event) {
        // Check if Cmd+K (Mac) or Ctrl+K (Windows/Linux) is pressed
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault(); // Prevent default browser behavior
            toggleSearch();
        }
        
        // Handle keyboard navigation within suggestions
        if (searchOpen) {
            const suggestionItems = suggestionsContainer.querySelectorAll('.suggestion-item');
            
            switch (event.key) {
                case 'Escape':
                    toggleSearch(); // Close search
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (selectedSuggestionIndex < suggestionItems.length - 1) {
                        selectedSuggestionIndex++;
                        highlightSelectedSuggestion();
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (selectedSuggestionIndex > 0) {
                        selectedSuggestionIndex--;
                        highlightSelectedSuggestion();
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestionItems.length) {
                        suggestionItems[selectedSuggestionIndex].click();
                    }
                    break;
            }
        }
    });
    
    // Handle search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim();
            const filteredSuggestions = filterSuggestions(query);
            renderSuggestions(filteredSuggestions);
            selectedSuggestionIndex = -1; // Reset selection when input changes
        });
    }
    
    // Click outside to close
    document.addEventListener('click', function(event) {
        if (searchOpen && 
            !searchModal.contains(event.target) && 
            !searchButton.contains(event.target)) {
            toggleSearch();
        }
    });
    
    // Prevent clicks inside the modal from closing it
    searchModal.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});