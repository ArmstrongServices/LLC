/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const searchButton=document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
const items = dropdown.querySelectorAll('.item');

// Show/hide & filter items
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();

  searchInput.addEventListener('focus', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      items.forEach(item => item.style.display = 'block');
      dropdown.style.display = 'block';
    }
  });

  let anyVisible = false;
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    const match = text.includes(query);
    item.style.display = match ? 'block' : 'none';
    if (match) anyVisible = true;
  });

  dropdown.style.display = anyVisible ? 'block' : 'none';
});

// Set selected value and hide dropdown
items.forEach(item => {
  item.addEventListener('click', () => {
    searchInput.value = item.textContent.trim();
    dropdown.style.display = 'none';
  });
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

document.getElementById('searchButton').addEventListener('click', () => {
  const inputVal = searchInput.value.trim().toLowerCase();
  const allSections = document.querySelectorAll('section');

  function scrollToMatchingSection() {
    const inputVal = searchInput.value.trim().toLowerCase();

    for (const section of allSections) {
      if (section.id.toLowerCase() === inputVal) {
        section.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }

    alert("No matching section found for: " + inputVal);
  }

// Click on search icon
  searchButton.addEventListener('click', scrollToMatchingSection);

// Press Enter inside input field
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      scrollToMatchingSection();
    }
  });
});