import React, { useEffect, useState } from 'react';
import { getUserUrls } from '../service/user';
import { useNavigate } from 'react-router';
import { FaClipboard } from 'react-icons/fa';

const ListUrls = () => {
    
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        getUserUrls().then((response) => {
            setUrls(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function showGraph() {
        navigate('/graph');
    }

    function addUrl() {
        navigate('/addurl');
    }

    const copyToClipboard = (shortUrl) => {
        const fullUrl = `${BackendUrl}/${shortUrl}`;
        navigator.clipboard.writeText(fullUrl).then(() => {
            alert('Copied to clipboard: ' + fullUrl);
        }).catch(err => console.error('Failed to copy:', err));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My URLs</h2>

            <div style={styles.tableContainer}>
                <table className="table table-hover table-bordered shadow">
                    <thead className="thead-dark">
                        <tr style={styles.tableHeader}>
                            <th>S.No.</th>
                            <th>Short URL</th>
                            <th>Long URL</th>
                            <th>Created At</th>
                            <th>Click Count</th>
                            <th>Copy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td>{index + 1}</td>
                                <td>
                                    <a 
                                        href={`${BackendUrl}/${url.shortUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={styles.shortUrl}
                                    >
                                        {BackendUrl}/{url.shortUrl}
                                    </a>
                                </td>
                                <td style={styles.longUrl}>{url.originalUrl}</td>
                                <td>{new Date(url.createdDate).toISOString().split('T')[0]}</td>
                                <td>{url.clickCount}</td>
                                <td>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => copyToClipboard(url.shortUrl)}
                                        title="Copy to Clipboard"
                                    >
                                        <FaClipboard />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={styles.buttonContainer}>
                <button type="button" className="btn btn-info mx-2" onClick={showGraph}>📊 Show Graph</button>
                <button type="button" className="btn btn-success mx-2" onClick={addUrl}>➕ Add URL</button>
            </div>
        </div>
    );
};


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
        textAlign: 'center'
    },
    title: {
        color: '#343a40',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: '10px',
        backgroundColor: '#fff',
        padding: '15px',
    },
    tableHeader: {
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center'
    },
    tableRow: {
        textAlign: 'center'
    },
    shortUrl: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold'
    },
    longUrl: {
        wordBreak: 'break-all',
        maxWidth: '250px',
        overflow: 'hidden'
    },
    buttonContainer: {
        marginTop: '20px'
    }
};

export default ListUrls;
