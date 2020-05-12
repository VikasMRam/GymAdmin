# Partial Hydration

## What is it?

All of our pages are rendered multiple times, first they get rendered on the
server and then when the client receives the HTML it needs to render/hydrate
the react tree again in order for React to handle all of the state changes
and intractability.

Usually this makes total sense, react is typically chosen for web pages that
are highly interactive.

In our case though, some of our core pages are mainly static and the
interactive sections are less important than the data being conveyed to the
user. The community detail page is a good example of this.

Hydrating this page in the client take a long time because the DOM tree is
very large, the user sees this as the page being un-responsive and Google
sees this unresponsiveness very negatively and marks all of these pages down
in their rankings.
h

Hence for these mainly static pages it makes sense to only hydrate the sections
of the page which are actually going to be interactive, or _partially hydrate_
the page.

## API

### `withHydration()`

```javascript
withHydration(Component);
```

A higher-order component what needs to be used for all components that need
hydrating in the client.

####Example

```javascript
const Component = withHydration(props => {
  // interactive component stuff
});
```

### `<HydrationData />`

A component that needs to be rendered **after** all hydrated components in the
react tree.

#### Example

```javascript
function Page() {
  return (
    <>
      <HydratedHeader />
      <MainBody />
      <HydratedSideBar />
      <HydratedFooter />
      <HydrationData />
    </>
  );
}
```

### `hydrateComponents()`

```javascript
hydrateComponents(components, container, Wrapper);
```

A function used to hydrate components in the client.

#### Example

Given the following was rendered on the server:

```javascript
import FoobarContainer from 'sly/web/containers/Foobar';

const HydratedFoobarContainer = withHydration(FoobarContainer);

export default Page() {
  return (
    <FoobarContainer />
  );
}
```

We can hydrate the `FoobarContainer` on the client by:

```javascript
import FoobarContainer from 'sly/web/containers/Foobar';

function Wrapper() {
  // Providers required to run the hydrated components need to go here
}

hydrateComponents([FoobarContainer], document.body, Wrapper);
```
