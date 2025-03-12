import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    workoutSessions: [],
    loading: true,
    error: null,
    username: '',
    password: '',
    isLoggedIn: false,
  };

  // Handle login
  handleLogin = async () => {
    const { username, password } = this.state;

    try {
      const res = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });

      const { access, refresh } = res.data;  // Extract both tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      this.setState({ isLoggedIn: true });
      this.fetchWorkoutSessions();
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      this.setState({ error: errorMsg });
    }
  };

  // Logout
  handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.setState({
        isLoggedIn: false,
        workoutSessions: [],
        username: '',
        password: '',
    });
};

  // Refresh token
  refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      this.handleLogout();  // Force logout if no refresh token exists
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });

      localStorage.setItem('access_token', res.data.access);
    } catch (err) {
      this.handleLogout();  // Force logout if refresh fails
    }
  };

  // Fetch workout sessions
  fetchWorkoutSessions = async () => {
    let token = localStorage.getItem('access_token');

    try {
      const res = await axios.get('http://localhost:8000/workout-sessions/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      this.setState({
        workoutSessions: res.data,
        loading: false,
      });
    } catch (err) {
      // Check if token expired and refresh it
      if (err.response && err.response.status === 401) {
        await this.refreshToken();
        return this.fetchWorkoutSessions();  // Retry fetching after refreshing the token
      }

      const errorMsg = err.response?.data?.detail || 'Failed to fetch workout sessions.';
      this.setState({ error: errorMsg, loading: false });
    }
  };

  // Handle input changes
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true });
      this.fetchWorkoutSessions();
    }
  }

  render() {
    const { workoutSessions, loading, error, isLoggedIn, username, password } = this.state;

    if (!isLoggedIn) {
      return (
        <div>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleLogin}>Login</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <header>
          <h1>Workout Sessions</h1>
          <button onClick={this.handleLogout}>Logout</button>
        </header>
        <hr />
        {workoutSessions.length > 0 ? (
          workoutSessions.map((session) => (
            <div key={session.id}>
              <h2>Workout Session: {session.name}</h2>
              <h3>Date: {session.date} - Time: {session.time}</h3>
              <h4>Workouts:</h4>
              {session.workouts.length > 0 ? (
                <ul>
                  {session.workouts.map((workout, index) => (
                    <li key={index}>
                      {workout.body_part} - {workout.sets} sets, {workout.reps} reps, {workout.weight_carried} kg
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No workouts available for this session.</p>
              )}
            </div>
          ))
        ) : (
          <div>No workout sessions available.</div>
        )}
      </div>
    );
  }
}

export default App;
