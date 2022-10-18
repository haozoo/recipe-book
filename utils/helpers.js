export function convertTime(time) {
  const hr = Math.floor(time / 60);
  const min = time % 60;
  var timeString = "";

  switch (hr) {
    case 0:
      break;
    case 1:
      timeString += `${hr}h `;
      break;
    default:
      timeString += `${hr}h `;
  }

  switch (min) {
    case 0:
      break;
    case 1:
      timeString += `${min}m `;
      break;
    default:
      timeString += `${min}m `;
  }

  return timeString;
}
