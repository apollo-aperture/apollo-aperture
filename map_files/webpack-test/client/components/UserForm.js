import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import Form from './Form';
import UserUpdateForm from './UserUpdateForm';

//component to mutate (add and delete users) to the left side of screen.

//Scehma for the mutation 
const ADD_USER = gql`
  mutation addUser(
    $text: String!
    $name: String
    $userName: String
    $department: String
    $access: String
  ) {
    addUser(
      text: $text
      name: $name
      userName: $userName
      department: $department
      access: $access
    ) @client {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $text: String!
    $name: String
    $userName: String
    $department: String
    $access: String
  ) {
    updateUser(
      id: $id
      text: $text
      name: $name
      userName: $userName
      department: $department
      access: $access
    ) @client {
      id
    }
  }
`;


const UserForm = ({ userId, users, handelEditCard }) => {
    const user = find(users, user => user.id === userId);
    if (userId === null) {
      return (
        <Mutation mutation={ADD_USER}>
          {addUser => (
            <div>
              <h1 className="title">Add User</h1>
              <Form handleSubmit={addUser} />
            </div>
          )}
        </Mutation>
      );
    }
    return (
      <Mutation mutation={UPDATE_USER}>
        {updateUser => (
          <div>
            <h1 className="title">Update User</h1>
            <UserUpdateForm
              handleSubmit={updateUser}
              user={user}
              handelEditCard={handelEditCard}
            />
          </div>
        )}
      </Mutation>
    );
  };
  
  export default UserForm;