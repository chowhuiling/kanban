import React from 'react';
import Notes from './Notes.jsx';
import uuid from 'node-uuid';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
      {
        id: uuid.v4(),
        task: 'Learn webpack'
      },
      {
        id: uuid.v4(),
        task: 'Learn react'
      },
      {
        id: uuid.v4(),
        task: 'go sleep'
      }
      ]
    };

    //bind the "this" context to the function so "this" works in the function
    this.addNote = this.addNote.bind(this);
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
    this.setState({
      notes: this.state.notes.concat([{
               id: uuid.v4(),
              task: 'New task'
             }])
    });
    console.log('add note');
  }
  editNote = (id, task) => {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        note.task = task;
      }

      return note;
    });
    this.setState({notes});
  }
  deleteNote = (id) => {
    console.log("deleting node:",id);
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)
    });
  }
}
