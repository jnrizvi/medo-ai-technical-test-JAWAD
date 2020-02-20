const React = require('react')

class Upload extends React.Component {
  render() {
    return (
      <div>
        <input type="file" onChange={this.props.handleImageUpload}/>
      </div>
    );
  }
}
module.exports = Upload