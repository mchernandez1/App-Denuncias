import React, {Component} from "react";

class Home extends Component {

  render() {
    return (
      <div className="container-head header">

        <div className="header-overlay">

          <div className="row">
            <div className=" col-md-12 header-text">
              <div className="row row-centered">
                <div className="col-md-8 col-xs-12">

                  <div className="header-text">

                    <h1>Denuncias App</h1>
                    <h4 className="head-text">Sitio para denunciar robos en la ciudad de Bogotá</h4>
                  </div>

                </div>

                <div className="col-md-4 col-xs-12">

                  <div className="header-photo text-center">

                    <img className="main-photo" src="/img/ladron.png" alt="Logo de la pagina"/>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>       
      </div>

    );
  }
}

export default Home;
