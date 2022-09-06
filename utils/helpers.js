export function convertTime(time) {
  const hr = Math.floor(time / 60);
  const min = time % 60;
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
