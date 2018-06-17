import React from 'react';
import { connect } from 'react-reclare';
import { broadcast } from 'reclare';

import './App.css';

import get from 'lodash/get';
import { SEARCH, SEARCH_STOP } from './ducks/gifs.duck';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderGifs = this.renderGifs.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderSearch() {
    return (
      <div className="search">
        <input
          type="text"
          name="query"
          className="search-input"
          disabled={get(this.props, `loading.${SEARCH}`)}
          value={this.state.query}
          onChange={this.handleChange}
        />
        {!get(this.props, `loading.${SEARCH}`) && (
          <input
            type="button"
            value="Search"
            className="search-button"
            onClick={() => broadcast(SEARCH, { query: this.state.query })}
          />
        )}
        {get(this.props, `loading.${SEARCH}`) && (
          <input
            type="button"
            value="Cancel"
            onClick={() => broadcast(SEARCH_STOP)}
          />
        )}
      </div>
    );
  }

  renderGifs() {
    const gifs = get(this.props, 'gifs', []);
    return (
      <div className="gifs">
        {gifs.map(gif => (
          <div
            key={gif.id}
            className="gif"
            style={{
              backgroundImage: `url(https://media.giphy.com/media/${
                gif.id
              }/giphy.gif)`
            }}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSearch()}
        {get(this.props, 'gifs', false) && this.renderGifs()}
      </div>
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => ({
  loading: state.loading,
  gifs: state.gifs
});

export default connect(mapStateToProps)(App);
