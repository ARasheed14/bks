import { useState } from 'react';
import './loginComponent.css';

interface ContainerProps {
  setToken: any
}

const LoginComponent: React.FC<ContainerProps> = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = 'test';
    setToken(token);
  };

  return (
    <div className="container">
        <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e:any) => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e:any) => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;