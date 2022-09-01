export function convertTime(time) {
  const { hr, min } = time;
  var timeString = "";

  switch (hr) {
    case 0:
      break;
    case 1:
      timeString += `${hr} Hour `;
      break;
    default:
      timeString += `${hr} Hours `;
  }

  switch (min) {
    case 0:
      break;
    case 1:
      timeString += `${min} Minute `;
      break;
    default:
      timeString += `${min} Minutes `;
  }

  return timeString;
}
