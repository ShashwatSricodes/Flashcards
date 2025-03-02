// Corrected export syntax
export const ExtractTitleFromLink = (url) => {
    // Use a regular expression to match the problem title from the URL
    const regex = /https:\/\/leetcode\.com\/problems\/([a-zA-Z0-9-]+)/;
    const match = url.match(regex);
  
    if (match) {
      // Extracted title is stored in match[1] and converted to a readable format
      const title = match[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');  // Capitalize each word and join with space
      return title;
    } else {
      return null; // Return null if the URL format is incorrect
    }
  };
  
  // Example usage
  const url = "https://leetcode.com/problems/find-peak-element/description/";
  const problemTitle = ExtractTitleFromLink(url);
  console.log(problemTitle);  // Output: "Find Peak Element"
  