import React from 'react';
import Editable from './Editable.jsx';

// export default class Notes extends React.Component {
export default ({notes, onValueClick, onEdit, onDelete}) => {

  // render() {
  //   const notes = this.props.notes;
  //   console.log(notes);
    return (
      <ul className="notes">{notes.map((note) => {
        return (
          <li className="note" key={note.id}>
            <Editable value={note.task} 
                  editing={note.editing}
                  onValueClick={onValueClick.bind(null, note.id)}
                  onEdit={onEdit.bind(null, note.id)}
                  onDelete={onDelete.bind(null, note.id)}/>
          </li>
        );
      })}
      </ul>
    );
  // }
}
