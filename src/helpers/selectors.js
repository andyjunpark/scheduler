export function getAppointmentsForDay(state, day) {
  let appointments = [];

  for (const eachDay of state.days) {
    if (eachDay.name === day) {
      eachDay.appointments.forEach(appointment => {
        appointments.push(state.appointments[appointment]);
      })
      return appointments;
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];

  for (const eachDay of state.days) {
    if (eachDay.name === day) {  
      eachDay.interviewers.forEach(interview => {
        interviewers.push(state.interviewers[interview]);
      })
      return interviewers;
    }
  }
  return interviewers;
}