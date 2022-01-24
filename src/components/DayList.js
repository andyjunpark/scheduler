import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
   const days = props.days
   const daysList = days.map(propDay => {
    return  (<DayListItem 
            key= {propDay.id}
            name={propDay.name} 
            spots={propDay.spots}
            selected= {propDay.name === props.value}
            setDay= {props.onChange}
            > 
            </DayListItem>);
            });
  return (
    <ul>
      {daysList}
    </ul>
  );
}