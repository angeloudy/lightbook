import React, { Component } from 'react';
import TextInputEdited from '../../components/TextInputEdited';
import Util from '../../components/Util';
import PeopleModel from '../../model/PeopleModel';

class EditPeople extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: {}
    };

    if(this.props.params.id !== undefined) {
      PeopleModel.getPeople(this, this.props.params.id, function(that, response) {
        that.setState({
          people: response.data.output.people
        });
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const phone = Util.numberList(this.refs.phone.item.value);
    const mobile = Util.numberList(this.refs.mobile.item.value);

    const newrow = {
      id: this.state.people.id,
      name: this.refs.name.item.value,
      username: this.refs.username.item.value,
      company: this.refs.company.item.value,
      company_role: this.refs.company_role.item.value,
      phone: phone,
      notes: this.refs.notes.item.value,
      mobile: mobile
    };

    PeopleModel.edit(this, newrow, function(that, response) {
      alert("People updated successfully");
    });

    return false;
  }

  handleRemovePeople() {
    if(confirm('Are you sure you want to delete this people?')) {
      PeopleModel.delete(this, this.state.people.id, function(that, response) {
        if(response.data.output.message !== undefined) {
          alert(response.data.output.message);
          that.hideAddForm();
        }
      });
    }
  }

  hideAddForm() {
    this.props.router.goBack();
  }

  render() {

    return (
      <div className="well">
        {this.state.people.name !== undefined ?
          <form onSubmit={this.handleSubmit.bind(this)} className="ContactForm edit-people" noValidate="true">
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Name" name="name" ref="name" value={this.state.people.name} />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Email" name="email" ref="email" value={this.state.people.email || ''} />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Username" name="username" ref="username" value={this.state.people.username || ''} validate="email" />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Company" name="company" ref="company" value={this.state.people.company || ''}  />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Company Role" name="company_role" ref="company_role" value={this.state.people.company_role || ''} />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Phone" name="phone" ref="phone" value={this.state.people.phone || ''} validate="phone" />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Notes" name="notes" ref="notes" value={this.state.people.notes || ''} />
            <TextInputEdited type="text" className="form-control col-md-8" placeholder="Mobile" name="mobile" ref="mobile" value={this.state.people.mobile || ''} validate="phone" />

            <div className="form-group row">
              <div className="offset-sm-3 col-sm-21">
                <input type="submit" className="btn btn-primary" value="Update"/>&nbsp;
                <input type="button" className="btn btn-secondary" value="Discard changes" onClick={this.hideAddForm.bind(this)} />&nbsp;
                <input type="button" className="btn btn-danger" value="Remove" onClick={this.handleRemovePeople.bind(this)} />
              </div>
            </div>
          </form>
          : '' }
      </div>
    );
  }
}

export default EditPeople;