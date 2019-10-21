import React from "react";

class PageButtons extends React.Component {
  nextPage = () => {
    const { sub, limit, after } = this.props.state;
    let nextPageQuery = `after=${after}&count=${limit}`;
    this.props.fetch(sub, limit, nextPageQuery);
    window.scrollTo(0, 0);
  };

  prevPage = () => {
    const { sub, limit, before } = this.props.state;
    let prevPageQuery = `before=${before}&count=${limit}`;
    this.props.fetch(sub, limit, prevPageQuery);
    window.scrollTo(0, 0);
  };

  renderButtonNext() {
    return (
      <button className="ui icon right labeled button" onClick={this.nextPage}>
        <i className="right arrow icon"></i>
        Next
      </button>
    );
  }

  renderButtonPrev() {
    return (
      <button className="ui icon left labeled button" onClick={this.prevPage}>
        <i className="left arrow icon"></i>
        Previous
      </button>
    );
  }

  render() {
    return (
      <div>
        {this.renderButtonPrev()}
        {this.renderButtonNext()}
      </div>
    );
  }
}

export default PageButtons;
