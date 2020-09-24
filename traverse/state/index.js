/*{
  currentParent: 'Pets',
  hierarchy: {
    reactComponent: 'React',
      children: [{
      reactComponent: 'Pets',
      children: [
        {
          reactComponent: 'Cats',
          children: [],
        },
        {
          reactComponent: 'Dogs',
          children: [
            {
              reactComponent: 'Spot',
              children: [
                {
                  reactComponent: 'Henry',
                  children: [],
                }
              ]
            }
          ]
        }
      ],
    }],
  },
  queries: [
    {
      queryName: 'findDogs',
      components: [
        {
          reactComponent: 'DogsDisplay',
          children: [
            {
              reactComponent: 'Dog',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};*/

// class ReactComponent {
//   constructor(componentName) {
//     this.reactComponent = componentName;
//     this.children = [];
//   }
//   addChildComponent(componentName) {
//     const newComponentName = new ReactComponent(componentName);
//     this.children.push(newComponentName);
//   }
// }
//
// class Query {
//   constructor(queryName) {
//     this.queryName = queryName;
//     this.components = [];
//   }
//   addReactComponent(componentName) {
//     const newComponentName = new ReactComponent(componentName);
//     this.components.push(newComponentName);
//   }
// }

const initialState = {
  hierarchy: null,
  queries: [],
};

const store = reducer => {
  let state;
  const getState = () => {
    if (typeof state !== 'undefined') return state;
    else {
      state = reducer();
      return state;
    }
  };

  const dispatch = action => {
    state = reducer(state, action);
  };
  return {
    getState,
    dispatch,
  };
};

const reducer = (prevState = initialState, action) => {
  if (action) {
    switch (action.type) {
      case 'updateHierarchy': {
        return {
          ...prevState,
          hierarchy: action.payload
        }
      }
      case 'setQuery': {
        return {
          ...prevState,
          currentQuery: action.payload
        };
      }
      default:
        return prevState;
    }
  }
  return prevState;
};

const appState = store(reducer);

module.exports = appState;
