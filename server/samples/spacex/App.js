import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: ["Blog Post #1", "Blog Post #2"], input: "" };
  }
  add = () => {
    const copy = this.state.todos.slice();
    copy.push(this.state.input);
    this.setState({ todos: copy, input: "" });
  };

  change = e => {
    this.setState({
      input: e.target.value
    });
  };

  remove = e => {
    const copy = this.state.todos.slice();
    copy.splice(e.target.id, 1);
    this.setState({ todos: copy });
  };

  render() {
    let items = this.state.todos.map((ele, i) => {
      return (
        <ul id={i}>
          {ele}
          <button id={i} onClick={this.remove}>
            X
          </button>
        </ul>
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <p>SpaceX Query blog</p>
        </header>
        <input
          placeholder="Space X Query"
          onChange={this.change}
          value={this.state.input}
        />
        <input
          className="addTodo"
          id="form-submit"
          type="submit"
          value="post"
          onClick={this.add}
        />
        <br />
        {items}
        Space GraphQL Query for last 3 launches
        <PostsContainer />
      </div>
    );
  }
}

//Main container for all query results
const PostsContainer = props => {
  return (
    <div>
      <GetXShips />
    </div>
  );
};


//outer components
const InnerPost = props => {
  const { name, home_port } = props;
  return (
    <div style={{ backgroundColor: "orange", width: "400px", height: "100px" }}>
      <p>
        Ship's Name
        <br />
        <b>{name}</b>
      </p>
      {/* <p>
        Home Port
        <br></br>
        <b>{home_port}</b>
      </p> */}
      <div>
        <ChildPost home={home_port} />
      </div>
    </div>
  );
};

//inner components
const ChildPost = props => {
  const { home } = props;
  return (
    <p style={{ backgroundColor: "white", width: "400px", height: "60px" }}>
    Home Port
    <br></br>
      {home}
    </p>
  );
};

//Apollo Client query
const GetXShips = () => (
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
          <InnerPost
            name={data.launchesPast[2].ships[i].name}
            home_port={data.launchesPast[2].ships[i].home_port}
          />
        );
      }
      return <div>{arrayOfships}</div>;
    }}
  </Query>
);

export default App;
