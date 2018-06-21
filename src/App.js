import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./list";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasksArray: [],
      idGenerator: 1,
      input: ""
    };
    this.addToDo = this.addToDo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.editTask = this.editTask.bind(this);
  }
  handleChange(e) {
    this.setState({ input: e.target.value.trim() });
  }
  addToDo(e) {
    e.preventDefault();
    // console.log('Submitted')
    const task = e.target.task.value;
    if (task.trim() === "") return;
    this.setState({ idGenerator: this.state.idGenerator + 1 });

    let taskItem = {
      completed: false,
      id: this.state.idGenerator,
      task: task
    };
    const currentTasks = this.state.tasksArray;
    currentTasks.push(taskItem);
    this.setState({ tasksArray: currentTasks });
    //clear the input after submit
    e.target.task.value = "";
    this.setState({ input: "" });
  }

  removeToDo(id) {
    const currentTasks = this.state.tasksArray.filter(todo => {
      if (todo.id !== Number(id)) return todo;
    });
    this.setState({ tasksArray: currentTasks });
  }
  editTask(id, modifiedText) {
    let i = this.state.tasksArray.findIndex(task => task.id === id);
    let currentTasks = this.state.tasksArray;
    currentTasks[i].task = modifiedText;
    this.setState({ tasksArray: currentTasks });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <header className="App-header">
              <img src={logo} style={{ height: 70 }} alt="logo" />
              <h1 className="App-title">TO-DO</h1>
              <h3 className="header">
                {" "}
                You have{" "}
                <b>
                  {this.state.tasksArray.length
                    ? this.state.tasksArray.length
                    : "no"}
                </b>{" "}
                {this.state.tasksArray.length === 1 ? "task" : "tasks"}.
              </h3>
            </header>
            <div className="row">
              <div className="col s12 m6">
                <form onSubmit={this.addToDo}>
                  Add a task
                  <input name="task" onChange={this.handleChange} />
                  <button
                    type="submit"
                    className="waves-effect waves-light btn"
                    disabled={!this.state.input}
                  >
                    Add
                  </button>
                </form>
              </div>
              <div
                className="col s12 m6"
                style={{
                  display: this.state.tasksArray.length ? "block" : "none"
                }}
              >
                <ul className="collection">
                  {this.state.tasksArray.map(item => (
                    <List
                      id={item.id}
                      task={item.task}
                      checked={this.props.completed}
                      onClickOption={this.removeToDo}
                      editTask={this.editTask}
                      key={item.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
