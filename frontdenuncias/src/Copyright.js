import React, {Component} from "react";

class Copyright extends Component {
  render() {
    return (
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">Made with <i className="fa fa-heart" aria-hidden="true"> </i> by Juan S. Diaz & Juan D. Vega — Copyright ©
                            2018 <a href="/">Denuncias App</a>. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Copyright;
