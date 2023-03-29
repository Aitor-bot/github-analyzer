import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_CONTRIBUTIONS = gql`
  query GetUserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
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
    const { loading, error, data } = useQuery(GET_CONTRIBUTIONS, {
        variables: { username },
    });
    const [contributionData, setContributionData] = useState(null);

    useEffect(() => {
        if (data) {
            setContributionData(data.user.contributionsCollection.contributionCalendar);
        }
    }, [data]);

    if (loading || !contributionData) return <p>Cargando gráfico de contribuciones...</p>;
    if (error) return <p>Error al cargar el gráfico de contribuciones</p>;

    return (
        <div>
            <h3>Contribuciones: {contributionData.totalContributions}</h3>
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
