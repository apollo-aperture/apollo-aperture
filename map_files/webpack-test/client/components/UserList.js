import React from 'react';

import User from './User';

const getVisibleUsers = (users, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return users;
    case 'SHOW_COMPLETED':
      return users.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return users.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const UserList = ({ users, visibilityFilter, handelEditCard }) => (
  <ul>
    {/* {console.log(users)} */}
    {getVisibleUsers(users, visibilityFilter).map(user => (
      <User key={user.id} {...user} handelEditCard={handelEditCard} />
    ))}
  </ul>
);

export default UserList;