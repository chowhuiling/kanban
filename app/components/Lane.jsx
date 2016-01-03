import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;
    const id = lane.id;

    return (
        <div {...props}>
          <div className="lane-header">
            <div className="lane-name">{lane.name}</div>
            <div className="lane-add-note">
              <button onClick={this.addNote.bind(this,id)}>+</button>
            </div>
          </div>
          <AltContainer stores={[NoteStore]}
                        inject={{
                          notes: () => NoteStore.get(lane.notes)
                        }}
                        >
            <Notes onEdit={this.editNote} onDelete={this.deleteNote.bind(this, id)} />
            </AltContainer>
          </div>
        );
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
