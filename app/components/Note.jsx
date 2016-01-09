import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  //beginDrag handler. set the initial state for dragging here.
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  //perform custom check so that the "isDragging" prop remains when the node is unmounted.
  //node is unmounted when the item is dragged into another lane.
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};
const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
       targetProps.onMove({sourceNoteId: sourceId, targetNoteId: targetId});
    }
  }
};


@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging() //map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
//use Note as a wrapper component for Editable..
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, id, onMove, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0.3 : 1
      }} {...this.props}>{this.props.children}</li>
    ));
  }

}

