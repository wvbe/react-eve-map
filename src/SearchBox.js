import React, { useState, useMemo, useCallback } from 'react';
import SolarSystemSearchResult from './solarSystem/SolarSystemSearchResult';

function PageNumbers ({ pageNumbers, onClick }) {
	console.log('P', pageNumbers.length, pageNumbers);
	return pageNumbers.map((i) => <span key={i}>
		<a href="#" onClick={() => onClick(i)}>{i + 1}</a>
		{' '}
	</span>);
}




export default function SearchBox({ solarSystems, onSolarSystemClick, placeholder = '(Solar system search)', itemsPerPage = 25 }) {
	const [ searchInput, setSearchInput ] = useState('');
	const [pageNumber, setPageNumber] = useState(0);

	const results = useMemo(
		() => {
			setPageNumber(0);
			return searchInput
				? solarSystems.filter(
						(solarSystem) =>
							typeof solarSystem.SOLARSYSTEMNAME === 'string' &&
							solarSystem.SOLARSYSTEMNAME.includes(searchInput)
					)
				: [];
		},
		[ searchInput ]
	);
	const totalPages = Math.ceil(results.length/itemsPerPage);

	const pageNumbers = Array.from(new Array(totalPages)).map((x, i) => i);
	const setPage = useCallback((n) => setPageNumber(Math.max(0, Math.min(totalPages - 1, n))), [totalPages, itemsPerPage]);
	return (
		<div>
			<h1 className='read-safety'>STARMAP SEARCH ({results.length})</h1>
			<input className='read-safety' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} placeholder={placeholder} />
			<p>
				<span className='read-safety'>Pages:</span>
				{
					totalPages < 16 ?
						<PageNumbers pageNumbers={pageNumbers} onClick={setPage} /> :
						<>
							<PageNumbers pageNumbers={pageNumbers.slice(0, 8)} onClick={setPage} />
							{'...'}
							<PageNumbers pageNumbers={pageNumbers.slice(totalPages - 8)} onClick={setPage} />
						</>
				}
			</p>
			{results
				.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
				.map((result, i) => <SolarSystemSearchResult key={result.SOLARSYSTEMID} result={result} onClick={onSolarSystemClick} />)}
		</div>
	);
}
