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
    const { username, password, error } = this.state;
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          this.handleLogin();
        }}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleInputChange}
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Login</button> {/* Change from onClick to type="submit" */}
        </form>
  
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  }
  
}

export default App;
