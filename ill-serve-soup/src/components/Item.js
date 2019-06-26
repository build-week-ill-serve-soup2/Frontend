import React from "react";
import { connect } from "react-redux";

// Needed Action Imports
import { deleteItem, setActive } from "../actions"


class Item extends React.Component {

  render() {
    return (
      <div className="item-card">
        <div className="card-body">
          <h1>{this.props.item.itemname}</h1>
          <p>{this.props.item.itemquantity + ' ' + this.props.item.itemunit} </p>
          <p>Category: {this.props.item.itemcategory}</p>
          <h3>{this.props.item.itemthreshold}</h3> 
        </div>
        <button onClick={(e) => this.deleteItem(e, this.props.item.itemid)}>Delete</button>
        <button onClick={(e) => this.setUpdateForm(e, this.props.item)}>Update</button>
        
      </div>
    );
  }

  deleteItem = (e, itemid) => {
    e.preventDefault();
    this.props.deleteItem(itemid)
  }

  setUpdateForm = (e, item) => {
    e.preventDefault();
    this.props.setActive(item)
    this.props.history.push('/itemForm')
  }
}


const mapStateToProps = state => {
  return {
    error: state.error,
    deletingItem: state.deletingItem
  }
};

export default connect(
mapStateToProps,
{
  deleteItem, setActive
}
)(Item);
