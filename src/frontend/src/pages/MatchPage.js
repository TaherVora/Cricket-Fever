import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';

import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {


    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();
    useEffect(
        () => {
         const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);

         };
         fetchMatches();
            


        }, [teamName, year]
    );

    // if (matches.length === 0) {
    //     return <div>No matches found</div>;
    //   }
    return (
        
        <div className="MatchPage">
            <div className="year-selector">
                <h3> Select Year </h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
                {matches.length === 0 ? (
                    <div className="no-matches-found">No matches found for selected year</div>) :<p></p> }
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {   
                    matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                }
            </div>
        </div>
    );
}