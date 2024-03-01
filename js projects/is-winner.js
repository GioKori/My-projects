// Create a function named isWinner which accepts a string representing the name of a country. It should use the winners "API" to return a resolved Promise with an appropriate string.

// The strings which can be returned are listed below. You'll need to replace "Country" with the country named which is passed to isWinner:

// "Country never was a winner": The country has never won a FIFA world cup.

// "Country is not what we are looking for because of the continent": The country is not from the european continent.

// "Country is not what we are looking for because of the number of times it was champion": The country won the FIFA world cup fewer than 3 times.

// "Country won the FIFA World Cup in <years> winning by <results>": with the following format:

// <years>: "1000, 1004, 1008"
// <results>: "4-3, 5-2, 1-0"

async function isWinner(country) {
  try {
    country = await db.getWinner(country);
    if (country === Error("Country Not Found")) {
      return `${country.name} never was a winner`;
    }
    if (country.continent !== "Europe") {
      return `${country.name} is not what we are looking for because of the continent`;
    }
    let results = await db.getResults(country.id);
    if (results === Error("Result Not Found")) {
      return `${country.name} never was a winner`;
    }
    if (results.length < 3) {
      return `${country.name} is not what we are looking for because of the number of times it was champion`;
    }
    return (
      `${country.name} won the FIFA World Cup in ` +
      results.map((result) => result.year).join(", ") +
      " winning by " +
      results.map((result) => result.score).join(", ")
    );
  } catch (e) {
    if (e.message === "Country Not Found") {
      return `${country} never was a winner`;
    }
  }
}
