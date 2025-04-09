async function checkFact() {
  const query = document.getElementById("queryInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a claim to check.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://fact-checker-googleapi.onrender.com/api/fact-check?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    if (!data.claims || data.claims.length === 0) {
      resultsDiv.innerHTML = "<p>No fact-check results found.</p>";
      return;
    }

    resultsDiv.innerHTML = "";
    data.claims.forEach((claim) => {
      const card = document.createElement("div");
      card.className = "claim-card";
      card.innerHTML = `
          <strong>Claim:</strong> ${claim.text || "N/A"} <br>
          <strong>Rating:</strong> ${
            claim.claimReview?.[0]?.textualRating || "Unknown"
          } <br>
          <strong>Publisher:</strong> ${
            claim.claimReview?.[0]?.publisher?.name || "N/A"
          } <br>
          <a href="${
            claim.claimReview?.[0]?.url
          }" target="_blank">Read full review</a>
        `;
      resultsDiv.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching data.</p>";
  }
}
