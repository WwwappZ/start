import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

class AdressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {},
      address: ""
    }
    this.onChange = (address) => this.setState({address})
    this.handleSelect = this.handleSelect.bind(this)
  }
  getAddressParts(object) {
      let address = {};
      const address_components = object.address_components;
      address_components.forEach(element => {
          address[element.types[0]] = element.short_name;
      });
      return address;
  }

  handleSelect(addressresult) {
    geocodeByAddress(addressresult).then(results => {
      const address = {
              formatted_address: results[0].formatted_address,
              address_parts: this.getAddressParts(results[0])
          };
          this.setState({
            value: {
              "city": address.address_parts.locality,
              "zipcode": address.address_parts.postal_code,
              "label": addressresult,
              "locationid": results[0].place_id,
              "lon": null,
              lat: null,
              "country": address.address_parts.country,
              "housenr": address.address_parts.street_number,
              "street": address.address_parts.route,
            }
          });
      getLatLng(results[0]).then(latLng => {
        const Value = Object.assign({}, this.state.value, {
          lon: latLng.lng,
          lat: latLng.lat
        });
        this.setState({value: Value});
          this.props.input.onChange(this.state.value);
      })
this.setState({address: addressresult});
    }).catch((e) => {
    console.log(e);
    });
  }
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    return (<div>
      <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect}/>
    </div>)
  }
}

export default AdressForm
