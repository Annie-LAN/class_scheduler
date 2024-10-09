export const checkTimeConflict = (courseA, courseB) => {
  if (
    courseA.term !== courseB.term ||
    courseA.meets.length === 0 ||
    courseB.meets.length === 0
  ) {
    return false;
  }

  const [daysA, timeA] = courseA.meets.split(" ");
  const [daysB, timeB] = courseB.meets.split(" ");

  const [startA, endA] = timeA.split("-");
  const [startB, endB] = timeB.split("-");

  const days = ["M", "Tu", "W", "Th", "F"];
  for (const day of days) {
    if (daysA.includes(day) && daysB.includes(day)) {
      if (timeOverlaps(startA, endA, startB, endB)) {
        return true;
      }
    }
  }

  return false;
};

const timeOverlaps = (startA, endA, startB, endB) => {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startMinutesA = toMinutes(startA);
  const endMinutesA = toMinutes(endA);
  const startMinutesB = toMinutes(startB);
  const endMinutesB = toMinutes(endB);

  return startMinutesA < endMinutesB && startMinutesB < endMinutesA;
};
