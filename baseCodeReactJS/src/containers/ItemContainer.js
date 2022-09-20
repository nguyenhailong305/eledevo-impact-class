import * as actions from "../actions/ItemAction";
import { connect } from "react-redux";
import Items from "../components/Items";
import React, { Component } from "react";

class ItemContainer extends Component {
  componentDidMount() {
    this.props.paginateItems(1);
  
  }

  componentWillUpdate() {
    window.addEventListener("beforeunload", (ev) => {
        return (ev.returnValue = "Are you sure you want to close?");
      });   
  }

  render() {
    return (
      <div>
        <Items {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.listItem,
    totalPage: state.items.totalPage,
    activePage: state.items.activePage,
    textSearch: state.items.textSearch,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItems: (data) => {
      dispatch(actions.addRequest(data));
    },
    deleteItems: (data) => {
      dispatch(actions.deleteRequest(data));
    },
    updateItems: (data) => {
      dispatch(actions.updateRequest(data));
    },
    paginateItems: (data) => {
      dispatch(actions.paginateRequest(data));
    },
    searchItems: (data) => {
      dispatch(actions.searchRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
