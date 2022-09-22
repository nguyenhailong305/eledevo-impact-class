import React, { Component } from "react";

class Items extends Component {
  state = {
    id: "",
    name: "",
    idUpdate: "",
    nameUpdate: "",
    textSearch: "",
  };

  isChange = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  getTextSearch = (e) => {
    const textSearch = e.target.value;
    this.props.searchItems({
      textSearch,
      activePage: 1,
    });
    this.setState({
      textSearch,
    });
  };

  
  render() {
    var ketqua = [];
    this.props.items.forEach((item, i) => {
      if (item.name.indexOf(this.state.textSearch) !== -1) {
        ketqua.push(item);
      }
    });

    console.log(ketqua);
    let listData = [];
    if (this.props.items) {
      listData = this.props.items.map((item) => {
        return (
          <tr key={item._id}>
            <th>{item._id}</th>
            <th>{item.name}</th>
            <th>
              <button
                onClick={() =>
                  this.setState({ nameUpdate: item.name, idUpdate: item._id })
                }
              >
                EDIT
              </button>
              <button onClick={() => this.props.deleteItems({ id: item._id })}>
                DELETE
              </button>
            </th>
          </tr>
        );
      });
    }
    let paginate = [];
    let totalPage = this.props.totalPage;
    let activePage = this.props.activePage;
    Array.from({ length: totalPage }).forEach((item, index) => {
      const i = index + 1;
      let button = (
        <button
          key={i}
          onClick={() => {
            this.props.textSearch
              ? this.props.searchItems({
                  activePage: i,
                  textSearch: this.props.textSearch,
                })
              : this.props.paginateItems(i);
          }}
          style={{ backgroundColor: activePage === i ? "blue" : "white" }}
        >
          {i}
        </button>
      );
      paginate.push(button);
    });
    // for (let i = 1; i <= totalPage; i++) {
    //   let button = (
    //     <button
    //       key={i}
    //       onClick={() => {
    //         this.props.textSearch
    //           ? this.props.searchItems({
    //               activePage: i,
    //               textSearch: this.props.textSearch,
    //             })
    //           : this.props.paginateItems(i);
    //       }}
    //       style={{ backgroundColor: activePage === i ? "blue" : "white" }}
    //     >
    //       {i}
    //     </button>
    //   );
    //   paginate.push(button);
    // }
    return (
      <div>

        <input
          onChange={(e) => this.isChange(e, "name")}
          value={this.state.name}
        />
        <button
          onClick={() => {
            this.state.name
              ? this.props.addItems({
                  name: this.state.name,
                })
              : alert("Vui lòng nhập tên ");
          }}
        >
          ADD
        </button>
        <input
          onChange={(e) => this.isChange(e, "nameUpdate")}
          value={this.state.nameUpdate}
        />
        <button
          onClick={() => {
            this.state.nameUpdate
              ? this.props.updateItems({
                  name: this.state.nameUpdate,
                  id: this.state.idUpdate,
                })
              : alert("Vui lòng nhập tên cần Update");
          }}
        >
          UPDATE
        </button>
        <input onChange={(e) => this.getTextSearch(e)} />
        <button
          onClick={() => {
            this.state.textSearch
              ? this.props.searchItems({
                  textSearch: this.state.textSearch,
                  activePage: 1,
                })
              : alert("Vui lòng nhập tên cần Search");
          }}
        >
          SEARCH
        </button>

        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>STT</th>
              <th>Ten</th>
              <th>Hanh dong</th>
            </tr>
          </thead>
          <tbody>{listData}</tbody>
        </table>
        {paginate}
      </div>
    );
  }
}

export default Items;
