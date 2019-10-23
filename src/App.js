import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Second from "./pages/Second/Second";
function App() {
  return (
    <div>
      <Route exact path="/" render={props => <HomePage {...props} />} />
      <Route path="/v1" render={props => <Second {...props} />} />
    </div>
  );
}

export default App;
