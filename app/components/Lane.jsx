import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';

export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;
    const id = lane.id;

    return (
        <div {...props}>
          <div className="lane-header">
            <Editable className="lane-name" 
                      value={lane.name}
                      editing={lane.editing}
                      onEdit={this.editName.bind(this,id)}
                      onValueClick={this.activateLaneEdit.bind(this,id)} />
            <div className="lane-add-note">
              <button onClick={this.addNote.bind(this,id)}>+</button>
            </div>
          </div>
          <AltContainer stores={[NoteStore]}
                        inject={{
                          notes: () => NoteStore.get(lane.notes)
                        }}
                        >
            <Notes onValueClick={this.activateNoteEdit}
                   onEdit={this.editNote} 
                   onDelete={this.deleteNote.bind(this, id)} />
            </AltContainer>
          </div>
        );
  }

  editName(id, name) {
    console.log('edited lane name', id, name);
  }
  activateLaneEdit(id) {
    console.log('edit lane name', id);
  }
  activateNoteEdit(id) {
    console.log('edit note task', id);
  }

  addNote(laneId) {
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
    console.log('add note');
  }
  editNote(id, task) {
    NoteActions.update({id, task});

  }
  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});

    NoteActions.delete(id);
    console.log("deleting node:",id);
  }
} 
