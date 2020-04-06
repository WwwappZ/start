import React, {Component} from 'react';
import config from "../../../package.json"
class Footer extends Component{
  render (){
   return (

      <footer className={this.props.class}>
        <div className="pull-right hidden-xs">
          <strong>Copyright © 2020 <a href="https://wwwappz.com">WwappZ Studio</a>.</strong> All rights
          reserved. <b>Version</b> {config.version}
        </div>
      </footer>
    );
  }
};

export default Footer;
