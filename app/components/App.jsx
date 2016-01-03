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
  }

  render() {
    const notes = this.state.notes;
    return (
        <div>
          <Notes notes={notes} /> 
        </div>
      );
  }

}
