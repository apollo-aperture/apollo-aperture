const appState = require('../traverse/state');

it('returns the default state', () => {
  expect(appState.getState()).toEqual({
    hierarchy: null,
    queries: [],
  });
});

describe('update the hierarchy', () => {
  const newHierarchy = {
    reactComponent: 'Foo',
    children: [],
  };
  it('adds a top level component', () => {
    const action = {
      type: 'updateHierarchy',
      payload: newHierarchy,
    };
    appState.dispatch(action);
    expect(appState.getState()).toEqual({
      hierarchy: newHierarchy,
      queries: [],
    });
  });
  it('adds another component', () => {
    const secondHierarchy = { ...newHierarchy };
    secondHierarchy.children.push({
      reactComponent: 'Bar',
      children: [],
    });
    console.log('secondHierarchy: ', secondHierarchy);
    const action = {
      type: 'updateHierarchy',
      payload: secondHierarchy,
    };
    appState.dispatch(action);
    expect(appState.getState()).toEqual({
      hierarchy: secondHierarchy,
      queries: [],
    });
  });
});

it('sets the current query', () => {
  appState.dispatch({
    type: 'setQuery',
    payload: 'foo',
  });
  expect(appState.getState()).toEqual({
    parentComponent: null,
    currentQuery: 'foo',
    componentQueue: [],
    hierarchy: [],
    queries: [],
  });
});

describe('add parent and child components', () => {
  it('adds a component', () => {
    const action = {
      type: 'addComponent',
      payload: 'parent',
    };
    appState.dispatch(action);
    expect(appState.getState()).toEqual({
      parentComponent: null,
      currentQuery: null,
      hierarchy: [
        {
          componentName: 'parent',
          children: [],
        },
      ],
      queries: [],
    });
  });
  it('adds a child component', () => {
    const action = {
      type: 'addComponentChild',
      payload: 'child',
    };
    appState.dispatch(action);
    expect(appState.getState()).toEqual({
      parentComponent: null,
      currentQuery: null,
      hierarchy: [
        {
          componentName: 'parent',
          children: [
            {
              componentName: 'child',
              children: [],
            },
          ],
        },
      ],
      queries: [],
    });
  });
  it('adds a second child component', () => {
    const action = {
      type: 'addComponentChild',
      payload: 'child 2',
    };
    appState.dispatch(action);
    expect(appState.getState()).toEqual({
      parentComponent: null,
      currentQuery: null,
      hierarchy: [
        {
          componentName: 'parent',
          children: [
            {
              componentName: 'child',
              children: [],
            },
            {
              componentName: 'child 2',
              children: [],
            },
          ],
        },
      ],
      queries: [],
    });
  });
});
