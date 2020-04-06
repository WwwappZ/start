import React, {Component} from 'react';
class NoMatch extends Component{

  render() {
    return (

          <div className="login-box-body">
        <h2 className="headline text-yellow"> 404</h2>
        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow" /> Oops! Page not found.</h3>
          <p>
            We could not find the page you were looking for.
            Meanwhile, you may <a href="/">return to dashboard</a> or try using the search form.
          </p>

        </div>
        {/* /.error-content */}

        </div> 
    );
  }
};

export default NoMatch;
