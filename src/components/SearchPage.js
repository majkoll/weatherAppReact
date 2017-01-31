import React, { Component } from 'react'
import SearchBox from './SearchBox'
import events from '../events'
import SearchResultPage from './SearchResultPage'
import './SearchPage.css'

class SearchPage extends Component {
	constructor() {
		super()
		this.onChildChange = this.onChildChange.bind(this)
	}
	state = {
		menuVisible: false,
		searching: false,
		checked: false,
		city: null
	}
	
	toogleMenu = () => {
		this.setState({
			menuVisible: !this.state.menuVisible
		})
	}

	componentDidMount() {
		events.on('searchStart', this.onSearchStart)
		events.on('searchEnd', this.onSearchEnd)
	}

	componentWillunmount() {
		events.off('searchStart', this.onSearchStart)
		events.off('searchEnd', this.onSearchEnd)
	}

	onSearchStart = () => {
		this.setState({ searching: true })
	}

	onSearchEnd = () => {
		this.setState({ searching: false })
	}

	onChildChange = (city) => {
		this.setState({
			city: city
		})
	}

	render () {
		return (
			<div className="SearchPage">
				<SearchBox
					searching={this.state.searching}
					parentCallback={this.onChildChange} />
				<SearchResultPage 
					city={this.state.city} />
			</div>
		)
	}
}

/*
	<SearchResultPage initialChecked={this.state.checked} />
*/
export default SearchPage