import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getUserUrls } from '../service/user';

function HomePage() {

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserUrls();
        console.log(response);

        const newCategories = response.data.map(item => item.clickCount);
        const newValues = response.data.map(item => item.shortUrl);

        setCategories(newCategories);
        setValues(newValues);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 URL Click Statistics</h2>
      <div style={styles.chartContainer}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: values, label: 'Short URL' }]}
          yAxis={[{ label: 'Number of Clicks' }]}
          series={[{ data: categories, label: 'Clicks', color: '#007bff' }]}
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}



// I hate CSS
// Inline styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  heading: {
    color: '#343a40',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
};

export default HomePage;
