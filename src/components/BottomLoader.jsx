/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import Loader from "react-loader-spinner";

class BottomLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    return (
      <div className = "loader2" >
        <Loader
          type="TailSpin"
          color="#fc0254"
          height={50}
          width={50}
          visible={this.props.loading}
          timeout={300000} //3 secs
        />
      </div>
    );
  }
}

export default BottomLoader;
