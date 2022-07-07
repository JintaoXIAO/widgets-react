import React, { useState, useEffect } from 'react'
import { interval, Subject, throttle } from 'rxjs'
import axios from 'axios'

const Search = () => {

	const [term, setTerm] = useState('')
	const [result, setResult] = useState([])

	const subj = new Subject()
	subj.pipe(throttle(() => interval(500)))
	.subscribe({
		next: (v) => {
			const search = async () => {
				const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
					params: {
						action: 'query',
						list: 'search',
						origin: '*',
						format: 'json',
						srsearch: v,
					}
				})
				setResult(data.query.search)
			}
			search()
		}
	})

	/*
	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				}
			})
			setResult(data.query.search)
		}

		const timeoutId = setTimeout(() => {
			if (term) {
				search()
			}
		}, 500)

		return () => {
			clearTimeout(timeoutId)
		}

	}, [term])
	*/

	const renderedResults = result.map((e) => {
		return (
			<div key={e.pageid} className="item">
				<div className="right floated content">
					<a className="ui button"
						href={`https://en.wikipedia.org?curid=${e.pageid}`}
					>Go</a>
				</div>
				<div className="content">
					<div className="header">
						{e.title}
					</div>
					<span dangerouslySetInnerHTML={{ __html: e.snippet }} ></span>
				</div>
			</div>
		)
	})


	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label>Enter Search Term</label>
					<input type='text'
						className='input' value={term}
						onChange={ e => { 
							setTerm(e.target.value)
							subj.next(e.target.value) 
						}} 
						/>
				</div>
			</div>
			<div className="ui celled list">
				{renderedResults}
			</div>
		</div>
	)
}

export default Search