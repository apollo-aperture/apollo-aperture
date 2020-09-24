import { React, Component } from 'react';
import Query from 'react-apollo';
import gql from 'graphql';
import ImportedComponent from './newStatefulImport';

const GET_PETS = gql`
  query Pets {
    cats {
      id
      name
      breed
    }
  }
`;

class Stateful extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    function functionalComponent() {
      return (
        <React.Fragment>
          <Query query={QUERY0} />
        </React.Fragment>
      )
    }
    const InnerComponentOne = () => <div><Query query={QUERY1} /></div>;
    const InnerComponentTwo = () => {
      return (
        <div>
          <Query query={GET_PETS}>
            {({ loading, error, data }) => {
              const { cats } = data;
              if (loading) return 'Loading';
              if (error) return 'Error';
                {cats.map(cat => (
                    <ImportedComponent
                      key={cat.id}
                      name={cat.name}
                      breed={cat.breed}
                    />
                  ));
                }
            }}
          </Query>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Query query={QUERY3} />
      </div>
    );
  }
}

const Stateless = () => {
  return (
    <div>
      <Query query={QUERY4} />
    </div>
  );
}

export default Stateful;