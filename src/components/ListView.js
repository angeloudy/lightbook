import React, { Component } from 'react';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleRemove(item) {
    this.props.onRemove(item);
  }

  handleOnEditSubmit(newRow) {
    this.block.props.onEdits(newRow);
  }

  handleEditOpen(item) {
    this.props.onEdits(item);
  }

  static renderContent(block, item) {
    return block.props.item(block, item);
  }

  render() {
    const lists = [];
    const that = this;
    this.props.list.forEach(function(list) {
      lists.push([ListView.renderContent(that, list)]);
    });

    return (
      <div className="col-xs-24 list-rows">
        {lists}
      </div>
    );
  }
}

export default ListView;