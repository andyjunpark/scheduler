import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[])

  const getSpots = (state, appointments) => {
    const getDays = state.days.filter(day => day.name === state.day);
    const getAppointments = getDays[0].appointments;
    const availableSpots = getAppointments.filter(spot => !appointments[spot].interview).length;
    console.log(availableSpots);
    return availableSpots;
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [
      ...state.days
    ];

    const dayIndex = state.days.findIndex((day) =>
          day.appointments.includes(id)
        )

    const spots = getSpots(state, appointments);

    const newDay = {
      ...days[dayIndex], spots
    };

    days[dayIndex] = newDay;

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({ ...state, appointments, days });
      })
  }

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = [
          ...state.days,
        ];

        const dayIndex = state.days.findIndex((day) =>
          day.appointments.includes(id)
        )

        const spots = getSpots(state, appointments);

        const newDay = {
          ...days[dayIndex], spots
        };

        days[dayIndex] = newDay;

        setState({ ...state, appointments, days });
      });
  };

  return { state, setDay, bookInterview, cancelInterview }
}