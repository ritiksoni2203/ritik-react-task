const NotFound = () => {
  return (
    <div className="not-found" style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <img src="/path/to/error-image.png" alt="Error" style={styles.image} />
      <button style={styles.button} onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '20vh',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  image: {
    width: '300px',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NotFound;
