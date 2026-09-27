import React, { useState, useEffect } from 'react';

const roles = {
    Fighter: ["Aatrox"],
  };
export default function ChampionTeamGenerator() {
  const [blueTeam, setBlueTeam] = React.useState([]);
  const [redTeam, setRedTeam] = React.useState([]);
  const [usedChampions, setUsedChampions] = React.useState({ Fighter: new Set(), Mage: new Set(), Tank: new Set(), Marksman: new Set(), Assassin: new Set(), Support: new Set() });

  const generateTeams = () => {
    const newUsedChampions = { ...usedChampions };
    let newBlueTeam = [];
    let newRedTeam = [];

    const selectFromRole = (roleChampions, team, roleName) => {
      const available = roleChampions.filter(champ => !newUsedChampions[roleName].has(champ));
      if (available.length < 3) {
        console.warn(`Not enough ${roleName} champions available. Resetting ${roleName} used champions.`);
        newUsedChampions[roleName].clear();
        return selectFromRole(roleChampions, team, roleName); // Retry after reset
      }

      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      selected.forEach(champ => {
        newUsedChampions[roleName].add(champ);
        team.push(champ);
      });
    };

    Object.keys(roles).forEach(role => {
      selectFromRole(roles[role], newBlueTeam, role);
    });

    Object.keys(roles).forEach(role => {
      selectFromRole(roles[role], newRedTeam, role);
    });

    setBlueTeam(newBlueTeam);
    setRedTeam(newRedTeam);
    setUsedChampions(newUsedChampions);
  };

  const renderTeam = (team, teamName) => (
    <div style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', width: '600px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '16px', textAlign: 'center', textTransform: 'uppercase' }}>{teamName}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
        {team.map((champion, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${champion}.png`}
              alt={champion}
              style={{ width: '48px', height: '48px', borderRadius: '4px' }}
            />
            <span style={{ fontSize: '14px', textAlign: 'center' }}>{champion}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A202C', color: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>ARAM Champion Generator</h1>
      <button
        style={{ backgroundColor: '#4A5568', padding: '8px 16px', borderRadius: '4px', marginBottom: '24px', cursor: 'pointer', border: 'none', color: '#FFFFFF' }}
        onClick={generateTeams}
        onMouseOver={(e) => e.target.style.backgroundColor = '#718096'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4A5568'}
      >
        Generate Champions
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
        {renderTeam(blueTeam, "Blue Team")}
        {renderTeam(redTeam, "Red Team")}
      </div>
    </div>
  );
}
