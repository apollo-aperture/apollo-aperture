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
          let arrayOfShips = [];
          for (let i = 0; i < data.launchesPast.length; i++) {
            if (data.launchesPast[i].ships.length > 0) {
              arrayOfShips.push(
                <Launches
                  key={[i]}
                  name={data.launchesPast[i].ships[0].name}
                  home_port={data.launchesPast[i].ships[0].home_port}
                />
              );
            }
          }
          return <div>{arrayOfShips}</div>;
        }}
      </Query>
    );
  }
}

export default App;
