import { trigger } from 'redial'

export function fetchDataOnEnter(store) {
  return (nextState, replace) => fetchData(store)(nextState)
}

export function fetchDataOnChange(store) {
  return (prevState, nextState, replace) => fetchData(store)(nextState)
}

function fetchData(store) {
  return (nextState) => {
    const { location, params, routes } = nextState
    const components = routes && routes
        .map((route) => route.component)
        .filter((component) => component)
    if (components) {
      const locals = {
        path: location.pathname,
        query: location.query,
        params,
        dispatch: store.dispatch
      }
      // Trigger client-side data
      trigger('defer', components, locals)
    }
  }
}
