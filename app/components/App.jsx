import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = NoteStore.getState();

    //bind the "this" context to the function so "this" works in the function
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  
  storeChanged = (state) => {
    //must initialize the state so that it points to the right context.
    this.setState(state);
  }

  render() {
    const notes = this.state.notes;
    return (
        <div>
          <button className="add-note" onClick={this.addNote}>+</button>
          <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} /> 
        </div>
      );
  }
  //addNote = () => { //uncomment this line and remove the binding event above to use the new syntax.
  addNote() {
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
