  import React, {Component} from 'react';
  class Main extends Component{
    render (){
     return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
        </section>
        {/* Main content */}
        <section className="content">
  {this.props.children}
        </section>
        {/* /.content */}
      </div>
    );
  }
};

export default Main;
