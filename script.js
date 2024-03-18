const getContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twiiterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes= [];
//import localQuotes from './quotes.js';
//show loading
function loading()
{
   loader.hidden =false;
   getContainer.hidden=true;

}
//hide loading
function complete()
{
  getContainer.hidden=false;
  loader.hidden =true;
}
function newQuote()
{
    loading();
  // to pick a random quote from API quotes array
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //const quote=localQuotes[Math.floor(Math.random()*localQuotes.length)];
    //check if author field with quote unknown
    if(!quote.author)
    {
       authorText.textContent='Unknown';
    }
    else{
    authorText.textContent=quote.author;
    }
    //check the quote lenth
    if(quote.text.length>50)
    {
      quoteText.classList.add('long-quote');
    }
    else
    {
      quoteText.classList.remove('long-quote');
    }
    //set Quote,Hide Loader
    quoteText.textContent=quote.text;
    complete();
    
}
async function getQuotes(){
  loading();
 const apiURL='https://jacintodesign.github.io/quotes-api/data/quotes.json';
 try{
   const response=await fetch(apiURL);
   apiQuotes=await response.json();
   console.log(apiQuotes);
   newQuote();
 }
 catch (error){

 }
}
function tweetQuote(){
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,  '_blank');
}
//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twiiterBtn.addEventListener('click', tweetQuote);
getQuotes();

