export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = state.days.filter(days => days.name === day)
  if (appointmentsForDay.length === 0) {
    return [];
  }
return appointmentsForDay[0].appointments.map(appointment => state.appointments[appointment]);
}