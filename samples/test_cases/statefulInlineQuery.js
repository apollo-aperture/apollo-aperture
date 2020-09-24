import React, { Component } from 'react';

class Stateful extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Header 1</h1>
        <Query
          query={gql`
            {
              user {
                name
                email
              }
            }
          `}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <div>
                <UserInfo name={data.name} email={data.email} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const Foo = () => (
  <div>
    <h2>Yay!</h2>
  </div>
);

const InnerComponent = () => (
  <div>
    <h1>Title</h1>
  </div>
);

export default Stateful;
