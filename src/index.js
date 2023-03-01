import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* ReactDOM.render(
  <div>
    Приложеение работает!<button>Кнопка</button>
  </div>,
  document.getElementById("root")
); */

/* ReactDOM.render(React.createElement("button", { disabled: true }, "Нажми на меня!"), document.getElementById("root"));
 */

/* ReactDOM.render(React.createElement("button", { onClick: () => console.log("click") }, "Нажми на меня!"), document.getElementById("root"));
 */

ReactDOM.render(<App />, document.getElementById("root"));
