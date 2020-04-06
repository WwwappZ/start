import React from "react";
import { connect } from "react-redux";
import { fetchbedrijven } from "./Reducers/actions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
class LogboekPage extends React.Component {
  state = {
    errors: {},
    deelnemers: 0,
    hulpkrachten: 0,
    recreatieleider: 0,
    stagiaires: 0
  };

  componentWillMount() {
    this.props.fetchbedrijven().then(data => {});
  
  }


  handleItem(item) {}

  render() {
    const columns = [
      {
        dataField: "naam",
        text: "Naam"
      },
      {
        dataField: "group",
        text: "Groep"
      },
      {
        text: "Acties",
        dataField: "_id",
        formatter: (cellContent, row) => {
          return (
          <span>
            <Link className="btn btn-warning" to={"/admin/bedrijven/edit/"+row._id }>Wijzigen</Link>

            </span>
          )
        },
        headerStyle: (colum, colIndex) => {
         return { width: '250px' };
       }
      }
    ];
    const { bedrijven } = this.props;
    return (
      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title"> Overzicht bedrijven</h3>
          <div className="box-tools pull-right">
            <Link
              type="button"
              className="btn-primary btn btn-box-too btn-sm"
              to="/admin/bedrijven/insert"
            >
              <i className="fa fa-plus"></i>&nbsp; Bedrijven Toevoegen
            </Link>
          </div>
        </div>
        <div className="col-md-12 no-float">
          <div className="box box-primary">
            <div className="box-body box-profile" />
            <BootstrapTable
              keyField="_id"
              data={bedrijven}
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
  return { username: state.auth.user, bedrijven: state.bedrijven.items };
}

export default connect(mapStateToProps, { fetchbedrijven })(LogboekPage);
