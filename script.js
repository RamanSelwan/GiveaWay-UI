// Array of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array of days
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Correct selectors based on the HTML structure
const text = document.querySelector(".giveaway"); // Ensure your HTML has an element with the class "giveaway"
const deadline = document.querySelectorAll(".countdown span"); // Ensure countdown spans exist in your HTML

// Setting the future date (December 12, 2023, at 12:30 PM)
const futureDate = new Date(2024, 11, 14, 12, 30, 0); // Month is 0-based (December is 11)

const day = futureDate.getDay();
const date = futureDate.getDate();
const month = futureDate.getMonth();
const year = futureDate.getFullYear();

const hr = futureDate.getHours();
const min = futureDate.getMinutes();

// Convert day and month index to names
const dayName = days[day];
const monthName = months[month];

// Set the content for the giveaway
text.textContent = `Giveaway Ends On ${dayName}, ${date} ${monthName} ${year} ${hr}:${min}`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date();
  const todayTime = today.getTime();

  // Calculate time difference
  let t = futureTime - todayTime;

  // Handle expiration case
  if (t <= 0) {
    clearInterval(interval);
    text.textContent = "Sorry, the deal has ended!";
    deadline.forEach((item) => (item.textContent = "00")); // Reset countdown
    return;
  }

  // Time constants
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Calculate remaining time
  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / 1000);

  // Update countdown
  const values = [days, hours, minutes, seconds];
  deadline.forEach((item, index) => {
    item.textContent = values[index].toString().padStart(2, "0"); // Add leading zeros
  });
}

// Start interval to update countdown every second
const interval = setInterval(getRemainingTime, 100);

// Initial call to set countdown immediately
getRemainingTime();
