import React, { PropTypes, Component } from 'react'
import { fire } from '../events'
import { search } from '../api'
import './SearchBox.css'

class SearchBox extends Component {
	
	static propTypes = {
		parentCallback: PropTypes.func
	}

	state = {
		query: this.props.query || '',
		checked: this.props.initialChecked
	}

	componentDidUpdate(prevProps) {
		/*if (prevProps.query !== this.props.query) {
			console.log('prevProps')
			this.doSearch()
		}*/
	}

	doSearch = () => {
		if (this.state.query) {
			fire('searchStart')
			search({
				city: this.state.query
			}).then(result => {
				fire('searchEnd')
				this.setState({ result })
			}).catch(err => {
				fire('searchEnd')
				console.error(err)
			})	
		}
	}
	
	onSearch = () => {
		let value = this.state.query
		this.setState({
			query: this.input.value.trim()
		})
		this.props.parentCallback(value)
	}

	onKeyDown = (e) => {
		if (e.keyCode === 13) this.onSearch()
	}

	onChange = () => {
		this.setState({
			query: this.input.value.trim()
		})
	}

	onClear = () => {
		this.setState({
			query: ''
		}, () => {
			this.input.focus()
		})
	}

	render() {

		let clearButton
		if (this.state.query !== '') {
			clearButton = (
				<span className="searchClear e-icon e-icon-closethin" onClick={this.onClear}></span>
			)
		}

		let searchButton
		if (this.props.searching) {
			searchButton = (
				<button>
					<img className="e-loading" src="http://static.eniro.com/img/loading.gif" width="16" height="16" alt="" />
				</button>
			)
		} else {
			searchButton = (
				<button onClick={this.onSearch} className="searchButton e-icon e-icon-search">
				
				</button>
			)
		}
		
		return (
			<div className="SearchBox">
				<header>
					<h2>How is the weather in...</h2>
				</header>
				<div className="searchFormContainer">
					<label className="searchLabel">Location:</label>
					<span className="searchInput">
						<input
							className="searchInputField"
							type="text"
							ref={input => {this.input = input}}
							placeholder="City"
							value={this.state.query}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown} />
						{clearButton}
								
					</span>
					{searchButton}
				</div>
			</div>
			
		)
	}
}

/*
<div class="search__form-inner">
	<label class="search__label">Location:</label>
	<span class="search__input-span"><input class="search__input-field" data-js="search-city" type="text" autofocus=""></span>
	<span class="triangle-topright"></span>

	<button class="search__submit-button" data-js="search-button"><i>+</i></button>
</div>
*/




export default SearchBox