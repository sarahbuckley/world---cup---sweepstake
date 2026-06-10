export const TEAMS_2026 = [
  { id: "usa", name: "USA", flag: "🇺🇸", group: "A" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", group: "A" },
  { id: "canada", name: "Canada", flag: "🇨🇦", group: "A" },
  { id: "argentina", name: "Argentina", flag: "🇦🇷", group: "B" },
  { id: "chile", name: "Chile", flag: "🇨🇱", group: "B" },
  { id: "peru", name: "Peru", flag: "🇵🇪", group: "B" },
  { id: "brazil", name: "Brazil", flag: "🇧🇷", group: "C" },
  { id: "colombia", name: "Colombia", flag: "🇨🇴", group: "C" },
  { id: "paraguay", name: "Paraguay", flag: "🇵🇾", group: "C" },
  { id: "england", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "D" },
  { id: "france", name: "France", flag: "🇫🇷", group: "D" },
  { id: "belgium", name: "Belgium", flag: "🇧🇪", group: "D" },
  { id: "germany", name: "Germany", flag: "🇩🇪", group: "E" },
  { id: "spain", name: "Spain", flag: "🇪🇸", group: "E" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹", group: "E" },
  { id: "netherlands", name: "Netherlands", flag: "🇳🇱", group: "F" },
  { id: "austria", name: "Austria", flag: "🇦🇹", group: "F" },
  { id: "switzerland", name: "Switzerland", flag: "🇨🇭", group: "F" },
  { id: "morocco", name: "Morocco", flag: "🇲🇦", group: "G" },
  { id: "senegal", name: "Senegal", flag: "🇸🇳", group: "G" },
  { id: "south-africa", name: "South Africa", flag: "🇿🇦", group: "G" },
  { id: "japan", name: "Japan", flag: "🇯🇵", group: "H" },
  { id: "south-korea", name: "South Korea", flag: "🇰🇷", group: "H" },
  { id: "australia", name: "Australia", flag: "🇦🇺", group: "H" },
  { id: "iran", name: "Iran", flag: "🇮🇷", group: "I" },
  { id: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", group: "I" },
  { id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿", group: "I" },
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬", group: "J" },
  { id: "egypt", name: "Egypt", flag: "🇪🇬", group: "J" },
  { id: "cameroon", name: "Cameroon", flag: "🇨🇲", group: "J" },
  { id: "croatia", name: "Croatia", flag: "🇭🇷", group: "K" },
  { id: "serbia", name: "Serbia", flag: "🇷🇸", group: "K" },
  { id: "ukraine", name: "Ukraine", flag: "🇺🇦", group: "K" },
  { id: "ecuador", name: "Ecuador", flag: "🇪🇨", group: "L" },
  { id: "uruguay", name: "Uruguay", flag: "🇺🇾", group: "L" },
  { id: "venezuela", name: "Venezuela", flag: "🇻🇪", group: "L" },
];

export const POINTS_SYSTEM = {
  groupWin: 3,
  groupDraw: 1,
  groupLoss: 0,
  roundOf32: 1,
  roundOf16: 2,
  quarterFinal: 3,
  semiFinal: 5,
  runnerUp: 7,
  winner: 10,
  award: 3,
};

export const TOURNAMENT_AWARDS = [
  { id: "goldenBoot", label: "Golden Boot", emoji: "👟", description: "Top scorer" },
  { id: "goldenBall", label: "Golden Ball", emoji: "🥇", description: "Best player" },
  { id: "goldenGlove", label: "Golden Glove", emoji: "🧤", description: "Best goalkeeper" },
  { id: "youngPlayer", label: "Young Player", emoji: "⭐", description: "Best young player" },
  { id: "fairPlay", label: "Fair Play", emoji: "🤝", description: "Fair play award" },
];

export const FIXTURES = [
  // ── GROUP A ──
  { id: "f1",  date: "2026-06-11", time: "19:00", teamA: "mexico",       teamB: "usa",          stage: "Group A", venue: "Estadio Azteca, Mexico City" },
  { id: "f2",  date: "2026-06-12", time: "16:00", teamA: "canada",       teamB: "mexico",       stage: "Group A", venue: "BMO Field, Toronto" },
  { id: "f3",  date: "2026-06-15", time: "19:00", teamA: "usa",          teamB: "canada",       stage: "Group A", venue: "MetLife Stadium, New York" },
  // ── GROUP B ──
  { id: "f4",  date: "2026-06-12", time: "13:00", teamA: "argentina",    teamB: "chile",        stage: "Group B", venue: "Hard Rock Stadium, Miami" },
  { id: "f5",  date: "2026-06-13", time: "16:00", teamA: "peru",         teamB: "argentina",    stage: "Group B", venue: "Levi's Stadium, San Francisco" },
  { id: "f6",  date: "2026-06-16", time: "13:00", teamA: "chile",        teamB: "peru",         stage: "Group B", venue: "Rose Bowl, Los Angeles" },
  // ── GROUP C ──
  { id: "f7",  date: "2026-06-13", time: "13:00", teamA: "brazil",       teamB: "colombia",     stage: "Group C", venue: "SoFi Stadium, Los Angeles" },
  { id: "f8",  date: "2026-06-14", time: "16:00", teamA: "paraguay",     teamB: "brazil",       stage: "Group C", venue: "AT&T Stadium, Dallas" },
  { id: "f9",  date: "2026-06-17", time: "13:00", teamA: "colombia",     teamB: "paraguay",     stage: "Group C", venue: "NRG Stadium, Houston" },
  // ── GROUP D ──
  { id: "f10", date: "2026-06-14", time: "19:00", teamA: "england",      teamB: "france",       stage: "Group D", venue: "Gillette Stadium, Boston" },
  { id: "f11", date: "2026-06-15", time: "16:00", teamA: "belgium",      teamB: "england",      stage: "Group D", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "f12", date: "2026-06-18", time: "13:00", teamA: "france",       teamB: "belgium",      stage: "Group D", venue: "MetLife Stadium, New York" },
  // ── GROUP E ──
  { id: "f13", date: "2026-06-15", time: "19:00", teamA: "germany",      teamB: "spain",        stage: "Group E", venue: "Levi's Stadium, San Francisco" },
  { id: "f14", date: "2026-06-16", time: "16:00", teamA: "portugal",     teamB: "germany",      stage: "Group E", venue: "Rose Bowl, Los Angeles" },
  { id: "f15", date: "2026-06-19", time: "13:00", tea