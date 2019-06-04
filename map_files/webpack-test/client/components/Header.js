import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {({ client }) => (
      <Link
        onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
        // active={data.visibilityFilter === filter}
      >
        {children}
      </Link>
    )}
  </Query>
);

const Header = () => (
  <div className="columns is-centered">
    <FilterLink filter="SHOW_ALL">All User</FilterLink>
    <FilterLink filter="SHOW_ACTIVE">Active User</FilterLink>
    <FilterLink filter="SHOW_COMPLETED">Deactive User</FilterLink>
  </div>
);

export default Header;