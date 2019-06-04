import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // blogTitle: 'My Blog',
      posts: [
        {
          title: "Post 1",
          text: "First text thing, hi"
        },
        {
          title: "Post 2",
          text: "Second one, here we go"
        },
        {
          title: "Post 3",
          text: "Third text box is here, wow"
        }
      ],
      selectedPost: "None"
    };
    this.highlightSelectedPost = this.highlightSelectedPost.bind(this);
  }

  highlightSelectedPost(e) {
    const selectedPost = e.currentTarget.id;
    this.setState({
      selectedPost: selectedPost
    });
  }

  render() {
    return (
      <div>
        <TitleDiv />
        <div>
          <h3>Selected Post: {this.state.selectedPost}</h3>
          <TitleDiv />
        </div>
        <PostsContainer
          posts={this.state.posts}
          highlightSelectedPost={this.highlightSelectedPost}
          selectedPost={this.state.selectedPost}
        />
      </div>
    );
  }
}

const ExchangeRates = () => (
  <Query
    query={gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let arrayOfCurrencies = [];
      data.rates.map(({ currency, rate }) => {
          arrayOfCurrencies.push(<InnerPost currency={currency} rate={rate} />)
        }
      )
      return /*data.rates.map(({ currency, rate }) =>*/ (
        <div>
          <button style={{ "height": "50px", "width": "100px" }} onClick={() => refetch()}>Refetch!</button>
          {arrayOfCurrencies}
        </div>
      );
    }}
  </Query>
);


const TitleDiv = () => {
  // console.log(props);
  return (
    <div>
      <h1>Blog Title</h1>
    </div>
  );
};

const PostsContainer = props => {
  const innerPosts = props.posts;
  return (
    <div>
      {innerPosts.map((post, index) => (
        <Post
          key={index}
          id={post.title}
          title={post.title}
          text={post.text}
          highlightSelectedPost={props.highlightSelectedPost}
          selectedPost={props.selectedPost}

        />
      ))}
      <ExchangeRates />
    </div>
  );
};


const Post = props => {
  const handleClick = e => {
    props.highlightSelectedPost(e);
  };
  let style;
  if (props.id === props.selectedPost) {
    style = { backgroundColor: "lightBlue" };
  } else {
    style = { backgroundColor: "yellow" };
  }
  return (
    <div id={props.id} className="outline" onClick={handleClick} style={style}>
      <p>{props.title}</p>
      <p>{props.text}</p>
      <InnerPost />
    </div>
  );
};

const InnerPost = props => {
  const { currency, rate } = props;
  return (
    <div style={{ backgroundColor: "orange", width: "100px", height: "100px" }}>
      <p><b>{currency}</b></p>
      <p><b>{rate}</b></p>
    </div>
  );
};


export default App;