const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if (!quote.author) {
  //   authorText.textContent = 'Unknown';
  // } else {
  //   authorText.textContent = quote.author;
  // }
  authorText.textContent = quote.En_Sanad
  if (quote.En_Text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.En_Text;
  complete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://ahadith-api.herokuapp.com/api/ahadith/all/en';
  try {
    const response = await fetch(apiUrl);
    jsonedRes = await response.json();
    apiQuotes = jsonedRes.AllChapters;
    newQuote();
  } catch (error) {
    
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${authorText.textContent} ${quoteText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();