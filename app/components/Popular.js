import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selected, onUpdatedLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  console.log('hit')
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear-nav-link"
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdatedLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selceted: PropTypes.string.isRequired,
  onUpdatedLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null,
    })

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn('Error fetching repos', error)
        this.setState({
          error: 'There was an error fetching the repositories.',
        })
      })
  }

  isLoading() {
    return this.state.repos === null && this.state.error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdatedLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}
