import React from 'react';

//UserForm Component
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'text, hardcoded',
      name: '',
      userName: '',
      department: '',
      access: '',
    };
    this.handelChange = this.handelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //onchange to get varibales from form
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(e){
 
    e.preventDefault();
    this.props.handleSubmit({ variables: { ...this.state } });
  };

  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">UserName</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="userName"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Department</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="department"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Access</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="access"
              onChange={this.handelChange}
            />
          </div>
        </div>
        <button
          className="button is-primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default UserForm;
