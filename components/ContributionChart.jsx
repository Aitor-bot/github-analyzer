import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_CONTRIBUTIONS = gql`
  query GetUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const ContributionsChart = ({ username }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    useEffect(() => {
        const fromDate = new Date(selectedYear, 0, 1).toISOString();
        const toDate = new Date(selectedYear + 1, 0, 1).toISOString();
        setDateRange({ from: fromDate, to: toDate });
    }, [selectedYear]);

    const { loading, error, data } = useQuery(GET_CONTRIBUTIONS, {
        variables: { username, ...dateRange },
    });

    const [contributionData, setContributionData] = useState(null);

    useEffect(() => {
        if (data) {
            setContributionData(data.user.contributionsCollection.contributionCalendar);
        }
    }, [data]);

    const years = [2018, 2019, 2020, 2021, 2022, 2023];

    if (loading || !contributionData) return <p>Cargando gráfico de contribuciones...</p>;
    if (error) return <p>Error al cargar el gráfico de contribuciones</p>;

    return (
        <div>
            <div className="year-menu">
                {years.map((year) => (
                    <span
                        key={year}
                        className={year === selectedYear ? 'selected' : ''}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </span>
                ))}
            </div>
            <h3>Contribuciones en {selectedYear}: {contributionData.totalContributions}</h3>
            <div>
                {contributionData.weeks.map((week, index) => (
                    <div key={index} style={{ display: 'inline-block' }}>
                        {week.contributionDays.map((day, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: day.color,
                                    width: '10px',
                                    height: '10px',
                                    margin: '1px',
                                }}
                                title={`Fecha: ${day.date}\nContribuciones: ${day.contributionCount}`}
                            />

                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContributionsChart;