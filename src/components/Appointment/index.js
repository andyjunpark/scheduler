import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {time, interview, interviewers} = props;
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    if (!interviewer) {
      return;
    }
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  
  function cancelInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  
  function confirm() {
    transition(CONFIRM);
  }
  
  function edit(){
    transition(EDIT);
  }
  
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onEdit={edit} onDelete={confirm} />}
      {mode === EDIT && <Form student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Please wait" />}
      {mode === CONFIRM && <Confirm message="Are you sure?" onCancel={back} onConfirm={cancelInterview} />}
      {mode === ERROR_SAVE && <Error onClose={() => back()} message="Could not save appointment." />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} message="Could not cancel appointment." />}
    </article>
  );
}