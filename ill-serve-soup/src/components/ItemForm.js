import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addItem, updateItem } from "../actions";

class ItemForm extends React.Component {
  constructor() {
    super();
    this.state = {
      itemname: '',
      itemquantity: '',
      itemunit: '',
      itemthreshold: '',
      itemcategory: ''
    };
  }
  
  render() {
    return (
      <div> 
        <Link to='/itemList'>Back to inventory</Link>
        <form className="item-form" onSubmit={this.submitHandler}>
          <div>
            <input
              type='text'
              placeholder="Item Name"
              name="itemname"
              value={this.state.itemname}
              onChange={this.handleChanges}
              required
            />
          </div>
          <div>
            <select name='itemcategory' value={this.state.itemcategory} onChange={this.handleChanges} required>
              <option value='' disabled>Item Category</option>
              <option value='produce'>Produce</option>
              <option value='meat'>Meat</option>
              <option value='fish'>Fish</option>
              <option value='dairy'>Dairy</option>
              <option value='spices'>Spices</option>
              <option value='bar'>Bar</option>
              <option value='canned_goods'>Canned Goods</option>
              <option value='dry_goods'>Dry Goods</option>
              <option value='supplies'>Supplies</option>
              <option value='miscellaneous'>Miscellaneous</option>
            </select>
          </div>
          <div>
            <input
              type='number'
              min='0'
              placeholder="Item Quantity"
              name="itemquantity"
              value={this.state.itemquantity}
              onChange={this.handleChanges}
              required
            />
          </div>
          <div>
            <input
              type='text'
              placeholder="Item Unit"
              name="itemunit"
              value={this.state.itemunit}
              onChange={this.handleChanges}
              required
            />
          </div>
          <div>
            <input
              type='number'
              min='0'
              placeholder="Low Stock Threshold"
              name="itemthreshold"
              value={this.state.itemthreshold}
              onChange={this.handleChanges}
              required
            />
          </div>
          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.activeItem) {
      this.setState({
        ...this.props.activeItem
      })
    }
  }

  handleChanges = e => {
    let value = e.target.value
    if (e.target.name === "itemquantity" || e.target.name === "itemthreshold") {
      value = parseInt(value)
    }
    this.setState({
      [e.target.name]: value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const newItem = {...this.state}
    console.log("newItem", newItem)
    if (this.props.activeItem) {
      this.props.updateItem(newItem)
    } else {
      this.props.addItem(newItem);
    }
    this.setState({
      itemname: '',
      itemquantity: '',
      itemunit: '',
      itemthreshold: '',
      itemcategory: ''
    })
  };
}

const mapStateToProps = state => ({
  items: state.items,
  addingItem: state.addingItem,
  updatingItem: state.updatingItem,
  activeItem: state.activeItem
});

export default connect(
  mapStateToProps,
  {
    addItem, updateItem
  }
)(ItemForm);
