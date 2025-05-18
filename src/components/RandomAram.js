import React, { useState, useEffect } from 'react';

const roles = {
    Fighter: ["Aatrox", "Camille", "Darius", "Diana", "Fiora", "Gangplank", "Gnar", "Gwen", "Illaoi", "Irelia", "JarvanIV", "Jax", "Jayce", "Kled", "LeeSin", "Mordekaiser", "Pantheon", "Renekton", "Riven", "Sett", "Trundle", "Urgot", "Vi", "Viego", "Yasuo", "Yone", "Yorick", "Ambessa", "XinZhao", "MonkeyKing", "Nasus","RekSai", "Warwick", "Olaf","Garen", "Tryndamere"],
    Mage: ["Ahri", "Anivia", "Annie", "AurelionSol", "Azir", "Brand", "Cassiopeia", "Fiddlesticks", "Heimerdinger", "Karthus", "Lissandra", "Malzahar", "Morgana", "Orianna", "Ryze", "Syndra", "Taliyah", "TwistedFate", "Velkoz", "Viktor", "Vladimir", "Xerath", "Ziggs", "Zoe", "Kennen", "Lillia", "Mel", "Neeko", "Hwei", "Rumble"],
    Tank: ["Alistar", "Amumu", "Blitzcrank", "Braum", "Chogath", "Leona", "Malphite", "Maokai", "Nautilus", "Nunu", "Ornn", "Poppy", "Rammus", "Rell", "Sejuani", "Shen", "Singed", "Skarner", "TahmKench", "Zac", "KSante", "Rakan", "Taric", "Thresh", "Sion", "DrMundo", "Volibear", "Gragas", "Galio", "Hecarim"],
    Marksman: ["Akshan", "Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa", "Kalista", "Kindred", "Lucian", "MissFortune", "Quinn", "Samira", "Senna", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Zeri", "Nilah", "Graves", "Kayle", "KogMaw","Jinx" ],
    Assassin: ["Belveth", "Briar", "Ekko", "Elise", "Fizz", "Katarina", "Kayn", "Khazix", "Naafiri", "Nidalee", "Pyke", "Qiyana", "Rengar", "Shaco", "Talon", "Zed", "MasterYi", "Kassadin", "Leblanc", "Evelynn", "Akali", "Kayn", "Sylas", "Nocturne"],
    Support: ["Sona", "Bard", "Ivern", "Janna", "Karma", "Lulu", "Nami", "Renata", "Seraphine", "Soraka", "Teemo", "Yuumi", "Zyra", "Swain", "Zilean", "Milio", "Veigar", "Lux", "Vex", "Shyvana", "Udyr", "Zilean", "Yuumi", "Teemo"]
  };
export default function ChampionTeamGenerator() {
  const [blueTeam, setBlueTeam] = React.useState([]);
  const [redTeam, setRedTeam] = React.useState([]);
  const [usedChampions, setUsedChampions] = React.useState({ Fighter: new Set(), Mage: new Set(), Tank: new Set(), Marksman: new Set(), Assassin: new Set(), Support: new Set() });
  const [roleSelection, setRoleSelection] = React.useState({ blue: [], red: [] });

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

  const generateRoleSelection = (role) => {
    const roleChampions = roles[role];
    const shuffled = [...roleChampions].sort(() => 0.5 - Math.random());
    const selectedBlue = shuffled.slice(0, 10);
    const remaining = shuffled.filter(champ => !selectedBlue.includes(champ));
    const selectedRed = remaining.length >= 10 ? remaining.slice(0, 10) : [...remaining, ...shuffled.slice(0, 10 - remaining.length)];

    setRoleSelection({ blue: selectedBlue, red: selectedRed });
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

      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Select 10 Champions by Role</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.keys(roles).map(role => (
              <button
                  key={role}
                  style={{ backgroundColor: '#4A5568', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: 'none', color: '#FFFFFF' }}
                  onClick={() => generateRoleSelection(role)}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#718096'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4A5568'}
              >
                {role}
              </button>
          ))}
        </div>
      </div>

      {(roleSelection.blue.length > 0 || roleSelection.red.length > 0) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            {renderTeam(roleSelection.blue, "Blue Role Selection")}
            {renderTeam(roleSelection.red, "Red Role Selection")}
          </div>
      )}
    </div>
  );
}
