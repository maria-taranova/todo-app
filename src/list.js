import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      editMode: false,
      editValue: "",
      editError: false
    };
    this.onTaskDone = this.onTaskDone.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onTaskDone(e) {
    if (e.target.checked) e.target.checked = false;
    this.setState({ checked: false });
    //setTimeOut is used to delay the function until the css animation on checkbox is finished
    setTimeout(
      function() {
        this.props.onClickOption(this.props.id);
      }.bind(this),
      230
    );
  }
  onEdit(e) {
    e.preventDefault();

    this.setState({ editValue: this.props.task });

    this.setState({ editMode: true });
  }
  onChange(e) {
    this.setState({ editValue: e.target.value });
  }

  onSave(e) {
    e.preventDefault();

    //    console.log(this.state.editValue)
    if (this.state.editValue === "") {
      return;
    }

    this.setState({ editMode: false });
    this.props.editTask(this.props.id, this.state.editValue);
  }

  onCancel() {
    //    console.log(this.state.editValue)

    this.setState({ editMode: false });
    this.setState({ editValue: this.props.task });
  }
  render() {
    let isEditError;
    if (!this.state.editValue) {
      isEditError = "Input is required";
    }

    if (true === this.state.editMode) {
      return (
        <li className="collection-item">
        <form>
        <div className="row">
        <div className="input-field col s12">
        <input
        type="text"
        onChange={this.onChange}
        value={this.state.editValue}
        autoFocus
        />
        </div>
        <div className="col s4">
        <button
        type="submit"
        onClick={this.onSave}
        className="waves-effect waves-teal btn-flat"
        >
        <i className="material-icons left">done</i>Save
        </button>
        </div>
        <div className="col s4 push-s4">
        <a
        className="grey-text lighten-4 btn-flat"
        onClick={this.onCancel}
        >
        <i className="material-icons left">clear</i>Cancel
        </a>
        </div>
        </div>

        {isEditError}
        </form>
        </li>
      );
    }
    return (
      <li className="collection-item">
      <div className="row">
      <div className="col s10 m10 l11">
      <label htmlFor={this.props.id}>
      <input
      className="indeterminate-checkbox"
      type="checkbox"
      value={this.props.id}
      id={this.props.id}
      onChange={this.onTaskDone}
      checked={this.state.checked}
      name="completed"
      />
      <span> {this.props.task}</span>
      </label>
      </div>
      <div className="col s2 m2 l1">
      <a className="lighten-5 blue-grey-text" onClick={this.onEdit}>
      <i className="material-icons left">edit</i>
      </a>
      </div>
      </div>
      </li>
    );
  }
}

export default List;
