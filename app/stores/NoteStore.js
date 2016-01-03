import uuid from 'node-uuid';
import assign from 'object-assign';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    //use bindActions to map each action in NoteActions to a method by name.
    this.bindActions(NoteActions);
    this.notes = [{id: uuid.v4(), task:'test'}];

    //Alt uses this to access the public interface of the store.
    this.exportPublicMethods({
      get: this.get.bind(this)
    });
  }

  get(ids) {
    return (ids || []).map((id) => this.notes.filter((note) => note.id === id))
      .filter((a) => a).map((a) => a[0]);
    //TODO: figure out what the 2nd filter and map does
  }
  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();
    
    this.setState({
      notes: notes.concat(note)
    });
    return note;
  }

  update(updatedNote) {
    const notes = this.notes.map((note) => {
      if (updatedNote.id === note.id) {
        note = assign({}, note, updatedNote);
      }
      return note;
    });
    this.setState({notes});

  }

  delete(noteId) {
    this.setState({
      notes: this.notes.filter((note) => note.id !== noteId)
    });
  }
}

/* Connect the store with Alt using alt.createStore.
 * note that assigning the "NoteStore" label is not required, 
 * but it protects code against minification and possible collisions.
 * the label is esp important when we persist the data.
 */
export default alt.createStore(NoteStore, 'NoteStore');
