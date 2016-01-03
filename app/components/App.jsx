import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  
  render() {
    return (
        <div>
          <button className="add-note" onClick={this.addNote}>+</button>
          <AltContainer stores={[NoteStore]}
                        inject={{
                          notes: () => NoteStore.getState().notes
                        }}
                        >
            <Notes onEdit={this.editNote} onDelete={this.deleteNote} /> 
          </AltContainer>
        </div>
      );
  }
  addNote = () => { //uncomment this line and remove the binding event above to use the new syntax.
  // addNote() {
    NoteActions.create({task: 'New task'});
    
    console.log('add note');
  }
  editNote = (id, task) => {
    NoteActions.update({id, task});

  }
  deleteNote = (id) => {
    NoteActions.delete(id);
    console.log("deleting node:",id);
  }
}
