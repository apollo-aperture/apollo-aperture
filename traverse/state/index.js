/*
 * State example
 * {
 *  hierarchy: {
 *    component: 'App',
 *    children: [
 *      {
 *        component: 'Foo',
 *         children: [
 *           {
 *             component: 'Bar',
 *             children: []
 *           }
 *         ]
 *       }
 *     ]
 *   }
 *   queries: [
 *     {
 *       query: 'getUser',
 *       children: [
 *         {
 *           component: 'Woo',
 *           children: [
 *             {
 *               component: 'Boo',
 *               children: []
 *             }
 *           ]
 *         }
 *       ],
 *     }
 *   ]
 * }
 * */

class BaseComponent {
  constructor() {
    this.children = [];
  }

  addChildComponent(name) {
    this.children.push(new Component(name));
  }
}

class Component extends BaseComponent {
  constructor(componentName) {
    super();
    this.componentName = componentName;
  }

  getComponent() {
    return this;
  }
}

class Query extends BaseComponent {
  constructor(queryName) {
    super();
    this.query = queryName;
  }
}

const initialState = {
  parentComponent: null,
  currentQuery: null,
  hierarchy: [],
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
      case 'setParent': {
        return {
          ...prevState,
          parentComponent: action.payload,
        }
      }
      case 'setQuery': {
        return {
          ...prevState,
          currentQuery: action.payload,
        }
      }
      case 'addComponent': {
        const newComponent = new Component(action.payload);
        const { hierarchy } = { ...prevState };
        hierarchy.push(newComponent);

        return {
          ...prevState,
          hierarchy,
        };
      }
      case 'addComponentChild': {
        const newComponent = new Component(action.payload);
        const { hierarchy } = { ...prevState };
        hierarchy[hierarchy.length - 1].children.push(newComponent);
        return {
          ...prevState,
          hierarchy,
        };
      }
      // if (prevState.hierarchy.length < 1) {
      //   const newStateHierarchy = {...prevState}.hierarchy;
      //   newStateHierarchy.push(newComponent);
      //   return {
      //     ...prevState,
      //     hierarchy: newStateHierarchy
      //   };
      // }
      default:
        return prevState;
    }
  }
  return prevState;
};

const appState = store(reducer);

module.exports = appState;
