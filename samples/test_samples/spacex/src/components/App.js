import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Launches from './Launches';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Query
        query={gql`
          {
            launchesPast(limit: 10) {
              ships {
                name
                home_port
              }
            }
          }
        `}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          let arrayOfships = [];
          for (let i = 0; i < data.launchesPast.length - 7; i++) {
            arrayOfships.push(
              <Launches
                key={[i]}
                name={data.launchesPast[0].ships[i].name}
                home_port={data.launchesPast[0].ships[i].home_port}
              />,
            );
          }
          return <div>{arrayOfships}</div>;
        }}
      </Query>
    );
  }
}

export default App;
