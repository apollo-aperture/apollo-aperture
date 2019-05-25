import React from 'react';

//component to add user, right of the screen

class UserUpdateForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.user.id,
        text: 'text hardcoded',
        name: props.user.name,
        userName: props.user.userName,
        department: props.user.department,
        access: props.user.access,
      };
      this.handelChange = this.handelChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handelChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    handleSubmit(e) {
      e.preventDefault();
      this.props.handleSubmit({ variables: { ...this.state } });
      this.props.handelEditCard(null);
    };
  
    render() {
      const { name, userName, department, access } = this.state;
      return (
        <div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
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
                value={userName}
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
                value={department}
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
                value={access}
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
            Update
          </button>
        </div>
      );
    }
  }
  
  export default UserUpdateForm;
  