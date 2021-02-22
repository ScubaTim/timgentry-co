---
title: 'Basic Hooks'
author: 'Tim Gentry'
shortDesc: "Init post"
date: "Feb 21"
---

React hooks took front end development by storm in 2019, and has rapidly been gaining popularity ever since. Billed as a way of using state and other React features inside of functional components, hooks offer several other advantages over their class-based predecessors, including:

- Significantly less boilerplate
- Better code reusability and composition
- Better separation of logic
- Increased code readability
- The ability to create custom hooks
- No “this” or bindings

So without further ado, let’s take a look at the 3 most basic (and by far the most commonly used) React hooks!

## useState()
As the most basic hook in React, `useState()` gives us the ability to add state to functional components. (Prior to hooks, state could only be used inside of class based components with `this.setState()`). 

`useState()` returns both a state value and a function to set (update) the state, using array destructuring. Naming convention best-practices dictate the format `[state, setState]`.

For example:

`const [darkMode, setDarkMode] = useState(false)`

Notice in this example that the state value `darkMode` as well as a function for updating the state `setDarkMode` are returned from `useState()` via array destructuring. You may also notice that an argument has been passed to `useState()` (in this case, the boolean `false`, but it can be almost anything) - this argument represents the initial state value.

`useState()` is best for storing simple, component-specific data such as user inputs, and can be called multiple times inside of each component. In fact, it is best practice to keep `useState()` calls as simple as possible; representing only one ‘slice’ of state. This is because unlike when using `this.setState()` the old state will not be automatically merged into the new state - the `useState()` hook simply returns the new state. A workaround is using the `spread` operator, but it is not advised.

```js
function App() {
    // darkMode is the state value, and setDarkMode is the function for updating it
    // useState is passed in an initial state of 'false', which will be darkMode's initial value
    const [darkMode, setDarkMode] = useState(false);

    // A generic click handler that uses the setDarkMode function to update the state value
    const handleClick = () => setDarkMode(!darkMode)

    return (
        // Ternary where if the darkMode state value is true, className will be set to an imaginary class named 'dark-mode.'
        // Else, className will be set to an equally imaginary 'light-mode' class.
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <h1>This is how setState works!</h1>
            {/* Another ternary, where the button's text is set based on the state value of darkMode*/}
            <button onClick={handleClick}>{darkMode ? 'Light' : 'Dark'}</button>
        </div>
    )
}
```

## useEffect()
By utilizing the `useEffect()` hook, we are able to execute effectual code such as an API call or timer inside of functional components. Similarly to the lifecycle methods of class based components, `useEffect()` does not run until the component has mounted. Unlike with classes, multiple `useEffect()` calls can be made inside of each functional component, allowing code to be separated more logically and by concern.

`useEffect()` will run each time the component is re-rendered, unless values are added to its dependency array. If the array is empty, `useEffect()` will run only once on component mount. If values are added to the dependency array, `useEffect()` will watch for changes to those values and will run when any changes occur.

```js
function App() {
    // Here we set the initial state value of 'apiData' to an empty array
    const [apiData, setApiData] = useState([])

    // In this example, useEffect would be used to wrap the logic for getting our data

    useEffect(() => {
        // Do something asynchronous. Maybe an API call? Choose your own adventure
        const data = //retrieved data
            // Here the data variable containing our retrieved data is being passed to 'setApiData,' to populate 'apiData,'
            setApiData(data)
    }, []) // The empty array shown here as useEffect's second parameter will ensure that useEffect only runs once on component mount

    // If the dependancy list contains dependancies, useEffect will run whenever the value of any of those dependancies changes

    return (
        <div>
            <h1>This is how useEffect works!</h1>
            {/* Do something with your retrieved data here */}
            {apiData && apiData.map((el, i) => <li key={i}>{el}</li>)}
        </div>
    )
}
```
 
## useContext()
Context allows for more complex data sharing and management without the need for prop drilling. The `useContext()` hook significantly improves the developer experience of using React’s Context API by simplifying the boilerplate - no need to  set up a contextType,  `<Consumer>`, or use the render props method!

```js
// THE OLD WAY
function SomeComponent() {
    return (
        <SomeContext.Consumer>
            {value => <div>This is the old way of getting the {value} from context, using a consumer.</div>}
        </SomeContext.Consumer>
    );
}
```

The same example with useContext:

```js
// The New Way
function SomeComponent() {
    const value = useContext(SomeContext);
    return <div>With the useContext hook, retrieving the {value} looks much cleaner.</div>;
}
```
The `useContext()` hook accepts a context object (the value returned from `React.createContext()`)  and returns the current context for that object. As you can see, it is a much cleaner syntax than the old method, and requires less code.

That's everything for the 3 most basic React Hooks! There are plenty more to learn, but these three hooks will allow you to build out the majority of the functionality of your app. Stay tuned for more where we will be covering useReducer, useRef, useCallback, useMemo, and custom hooks!
