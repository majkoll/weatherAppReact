import React, { PropTypes, Component } from 'react'
import { search } from '../api'
import { fire } from '../events'
import ResultListItem from './ResultListItem'
import './SearchResultPage.css'

class SearchResultPage extends Component {
	
	static propTypes = {
		city: PropTypes.string
	}
	
	state = {
		result: [], 
		selectedItem: null,
	}

	componentDidMount() {
		if (!this.props.city || this.props.city === '') {
			return null
		} else {
			this.doSearch()			
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.city !== prevProps.city) {
			this.doSearch()
		}
	}

	doSearch = () => {
		if (this.props.city) {
			fire('searchStart')
			search({
				city: this.props.city
			}).then(result => {
				fire('searchEnd')
				if (this.state.result.length > 0) {
					let currentState = this.state.result
					currentState.push(result)
					this.setState({result: currentState })
				} else {
					this.setState({ result: [result] })
				}
			}).catch(err => {
				fire('searchEnd')
				console.error(err)
			})	
		}
	}

	render() {
		let resultListItem
		
		resultListItem = this.state.result.map(item => {
			return (
				<ResultListItem item={item} key={item.id} />
			)
		})

		return (
			<div className="SearchResultPage">
				{resultListItem}
			</div>
		)
	}
}

/*
<article className="ResultListItem" key={item.id}>
					<h3>{item.name}</h3>
					<p>{item.main.temp}&#x2103;</p>
				</article>
*/

export default SearchResultPage