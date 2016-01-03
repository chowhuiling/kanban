import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {
  
  render() {
    return (
        <div>
          <button className="add-lane" onClick={this.addLane}>+</button>
          <AltContainer stores={[LaneStore]}
                        inject={{
                          lanes: () => LaneStore.getState().lanes || []
                        }}
                        >
                        { /*
                          <Notes onEdit={this.editNote} onDelete={this.deleteNote} /> */} 
            <Lanes />
          </AltContainer>
        </div>
      );
  }
  addLane() {
    LaneActions.create({name: 'New Lane'});
  }

  // addNote = () => { //uncomment this line and remove the binding event above to use the new syntax.
  // // addNote() {
  //   NoteActions.create({task: 'New task'});
  //   
  //   console.log('add note');
  // }
  // editNote = (id, task) => {
  //   NoteActions.update({id, task});
  //
  // }
  // deleteNote = (id) => {
  //   NoteActions.delete(id);
  //   console.log("deleting node:",id);
  // }
}
