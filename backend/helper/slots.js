// helper function to generate slots for a specific date
export const generateDaySlots = (startTime, endTime, slotDuration, date) => {
  const slots = [];
  let currentTime = new Date(date);
  currentTime.setHours(startTime.split(":")[0], startTime.split(":")[1], 0);

  const endDateTime = new Date(date);
  endDateTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);

  while (currentTime < endDateTime) {
    slots.push(currentTime.toTimeString().slice(0, 5));
    currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
  }

  return slots;
};
