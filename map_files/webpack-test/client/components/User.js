import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

//mutation to the query

const TOGGLE_USER = gql`
  mutation ToggleUser($id: Int!) {
    toggleUser(id: $id) @client
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) @client {
      id
    }
  }
`;

//mutations render
const User = ({
  id,
  completed,
  name,
  userName,
  department,
  access,
  handelEditCard,
}) => (
  <Mutation mutation={TOGGLE_USER} variables={{ id }}>
    {toggleUser => (
      <div
        className="card"
        style={{
          opacity: completed ? '0.5' : '1',
        }}
      >
        <header className="card-header">
          <p className="card-header-title">
            {name}
            (@
            {userName})
          </p>
        </header>
        <div className="card-content">
          <h1>
            {' '}
            <strong>Departement-</strong> {department}
          </h1>
          <h1>
            {' '}
            <strong>Access-</strong> {access}
          </h1>
        </div>
        <footer className="card-footer">
          <a onClick={toggleUser} className="card-footer-item">
            {completed ? 'Activate' : 'Deactivate'}
          </a>
          <a className="card-footer-item" onClick={() => handelEditCard(id)}>
            Edit
          </a>
          <Mutation mutation={DELETE_USER} variables={{ id }}>
            {deleteUser => (
              <a onClick={() => deleteUser()} className="card-footer-item">
                Delete
              </a>
            )}
          </Mutation>
        </footer>
      </div>
    )}
  </Mutation>
);

export default User;
