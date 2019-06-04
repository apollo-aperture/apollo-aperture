import React from 'react';
import {Query} from 'react-apollo';
import qql from 'graphql-tag';
import {CSVLink} from 'react-csv';

import Header from './Header';
import UserList from './UserList';
import UserForm from './UserForm';

//get user query
export const GET_USERS = qql`
{
  users @client {
    id
    completed
    text
    name
    userName
    department
    access
  }
  visibilityFilter @client
}`;



//state for userID
class App extends React.Component{
  constructor() {
    super();
    this.state = {
      userId: null,
    };
    this.handelEditCard = this.handelEditCard.bind(this);
  }


handelEditCard(userId){
  this.setState({ userId });
  console.log(this.state);
};

render() {
  return (
    <div>
      <div className="container section">
        <Query query={GET_USERS}>
          {({ data: { users, visibilityFilter } }) => (
            <div className="columns is-centered">
              <div className=" box column is-half">
                <Header />
                <hr />
                <UserList
                  users={users}
                  visibilityFilter={visibilityFilter}
                  handelEditCard={this.handelEditCard}
                />
                <br />
                <a
                  className="button"
                  onClick={() => this.handelEditCard(null)}
                >
                  Add User
                </a>
                <CSVLink className="button" data={users}>
                  Download Users Data
                </CSVLink>
              </div>
              <div className="box column is-half">
                <UserForm
                  userId={this.state.userId}
                  users={users}
                  handelEditCard={this.handelEditCard}
                />
              </div>
            </div>
          )}
        </Query>
      </div>
    </div>
  );
}
}


export default App;