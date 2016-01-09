import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import LaneActions from '../actions/LaneActions';

// export default class Notes extends React.Component {
export default ({notes, onValueClick, onEdit, onDelete}) => {

  // render() {
  //   const notes = this.props.notes;
  //   console.log(notes);
    return (
      <ul className="notes">{notes.map((note) => {
        return (
          <Note className="note" key={note.id} id={note.id}
            onMove={({sourceId, targetId}) => 

              console.log('source', sourceId, 'target', targetId)}
          >

            <Editable value={note.task} 
                  editing={note.editing}
                  onValueClick={onValueClick.bind(null, note.id)}
                  onEdit={onEdit.bind(null, note.id)}
                  onDelete={onDelete.bind(null, note.id)}/>
          </Note>
        );
      })}
      </ul>
    );
  // }
}
