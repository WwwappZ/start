import React from "react";
import { connect } from "react-redux";
import { get, update } from "./Reducers/actions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
class GeruikersPage extends React.Component {
  state = {
    errors: {},
    deelnemers: 0,
    hulpkrachten: 0,
    recreatieleider: 0,
    stagiaires: 0
  };

  componentWillMount() {
    this.props.get().then(data => {});
  }

  updateuser = (id, update) => {
    this.props.update(id, update).then(data => {
      this.props.get().then();
    });

  }

  render() {
    function getstatus(text, status) {
      if (status) {
        return <small className="label bg-green">{text}</small>;
      } else {
        return <small className="label bg-orange">{text}</small>;
      }
    }

    function status(cell, row) {
      return (
        <div>
          {getstatus("SMS", row.SmsAuth)} {getstatus("E-mail", row.isVerified)} {getstatus("Blocked", row.blocked)}
        </div>
      );
    }

    const columns = [
      {
        dataField: "voornaam",
        text: "Voornaam"
      },
      {
        dataField: "achternaam",
        text: "Achternaam"
      },
      {
        dataField: "email",
        text: "E-mail"
      },
      {
        dataField: "role",
        text: "Role"
      },
      {
        dataField: "isVerified",
        text: "Status",
        formatter: status
      },
      {
        text: "Acties",
        dataField: "_id",
        formatter: (cellContent, row) => {
          return (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Actions
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div onClick={this.updateuser.bind(this, row._id, {"isVerified": true})} className="dropdown-item">E-mail Activeren</div>
                <div onClick={this.updateuser.bind(this, row._id, {"SmsAuth": true})}  className="dropdown-item">SMS Activeren</div>
                <div onClick={this.updateuser.bind(this, row._id, {"blocked": true})}  className="dropdown-item">Blokkeren</div>
                <div onClick={this.updateuser.bind(this, row._id, {"blocked": false})}  className="dropdown-item">Deblokkeren</div>
                <Link
                  className="dropdown-item"
                  to={"/admin/gebruikers/" + row._id}
                >
                  Wijzigen
                </Link>
              </div>
            </div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "150px" };
        }
      }
    ];
    const { gebruikers } = this.props;
    return (
      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title"> Overzicht gebruikers</h3>
          <div className="box-tools pull-right">
            <Link
              type="button"
              className="btn-primary btn btn-box-too btn-sm"
              to="/admin/signup"
            >
              <i className="fa fa-plus"></i>&nbsp; Gebruiker Toevoegen
            </Link>
          </div>
        </div>
        <div className="col-md-12 no-float">
          <div className="box box-primary">
            <div className="box-body box-profile" />
            <BootstrapTable
              keyField="_id"
              data={gebruikers}
              columns={columns}
              pagination={paginationFactory()}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { username: state.auth.user, gebruikers: state.gebruikers.items };
}

export default connect(mapStateToProps, { get, update })(GeruikersPage);
