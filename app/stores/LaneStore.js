import uuid from 'node-uuid';
import assign from 'object-assign';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';
import update from 'react-addons-update';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create (lane) {
    const lanes = this.lanes;

    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    this.setState({
      lanes: lanes.concat(lane)
    });
  }
  
  update(updatedLane) {
    const lanes = this.lanes.map((lane) => {
      if (lane.id === updatedLane.id) {
        lane = assign({}, lane, updatedLane);
      }
      return lane;
    });
    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter((lane) => lane.id !== id)
    });
    //TODO: delete the associated notes from NoteStore
  }

  attachToLane({laneId, noteId}) {
    if (!noteId) {
      //waitFor tells the dispatcher to wait before going on. (for async data dependency)
      this.waitFor(NoteStore);
      noteId = NoteStore.getState().notes.slice(-1)[0].id;
    }
    const lanes = this.lanes.map((lane) => {
      if (lane.id === laneId) {
        if (lane.notes.indexOf(noteId) === -1) {
          lane.notes.push(noteId);
        } else {
          console.warn('Already attached note to lane', lanes);
        }
      }
      return lane;
    });

    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter((nid) => nid !== noteId);
      }
      return lane;
    });
    this.setState({lanes});
  }

  move({sourceNoteId, targetNoteId}) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceNoteId) >= 0;
    })[0];
    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetNoteId) >= 0;
    })[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceNoteId);
    const targetNoteIndex = targetLane.notes.indexOf(targetNoteId);

    if (sourceLane === targetLane) {
      //move at once to avoid complications
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceNoteId]
        ]
      });
    }
   
    else {
      //get rid of source
      sourceLane.notes.splice(sourceNoteIndex, 1);

      //and move it to target
      targetLane.notes.splice(targetNoteIndex, 0, sourceNoteId);
    }
    
    this.setState({lanes});
  }
}

export default alt.createStore(LaneStore, 'LaneStore');
