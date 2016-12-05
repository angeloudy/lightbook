import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import People from './People';
import PeopleEdit from './PeopleEdit';

import PeopleModel from '../../model/PeopleModel';

import ListView from '../../components/ListView';

class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peoplelist: []
    };

    if(this.props.params.id !== undefined) {
      PeopleModel.getList(this, this.props.params.id, function(that, response) {
        if(response.data.peoples !== undefined) {
          that.setState({
            peoplelist: response.data.peoples
          });
        }
      });
    } else {
      this.state = {
        peoplelist: this.props.list
      };
    }

    this.onRowSubmit = this.handleNewRowSubmit.bind(this);
    this.onPeopleRemove = this.handlePeopleRemove.bind(this);
    this.onPeopleEdits = this.handlePeopleEdit.bind(this);
  }

  handleNewRowSubmit(newPeople) {
    let _total = this.block.state.peoplelist.length;
    newPeople['id'] = ++_total;
    this.block.setState({ peoplelist: this.block.state.peoplelist.concat([newPeople]) });
  }

  handlePeopleRemove(people) {
    if(!confirm('Are you sure you want to delete this people?'))
      return false;

    let index = -1;
    const clength = this.block.state.peoplelist.length;
    for (let i = 0; i < clength; i++) {
      if (this.block.state.peoplelist[i].name === people.name) {
      index = i;
      break;
      }
    }
    this.block.state.peoplelist.splice(index, 1);
    this.block.setState({ peoplelist: this.block.state.peoplelist });
  }

  handlePeopleEdit(people) {
    const clength = this.block.state.peoplelist.length;
    for (let i = 0; i < clength; i++) {
      if (this.block.state.peoplelist[i].id === people.id) {
        this.block.state.peoplelist[i] = people;
        break;
      }
    }
    this.block.setState({ peoplelist: this.block.state.peoplelist });
  }

  close() {
    this.setState({ showModal: false });
  }

  handlePeopleEditOpen(item) {
    PeopleModel.getPeople(this, item.id, function(that, response) {
      ReactDOM.render(
        <PeopleEdit people={response.data.output.people} block={that} onPeopleEditSubmit={that.handlePeopleEdit} />,
        document.getElementById('react-modal')
      );
    });
  }

  renderPeople(block, item) {
    return <People people={item} onPeopleDelete={block.handleRemove.bind(block)} onPeopleEdit={block.handleEditOpen.bind(block)} />;
  }

  render() {
    const _plist = this.state.peoplelist;
    const _hide_peoples = (_plist.length === 0 ? {display: 'none'} : null);

    return (
      <div className="people-list col-lg-24" style={_hide_peoples}>
        <ListView list={_plist} onRemove={this.handlePeopleRemove} onEdits={this.handlePeopleEditOpen.bind(this)} block={this} item={this.renderPeople} />
      </div>
    );
  }
};

export default PeopleList;