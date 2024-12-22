import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  from-teal-200 to-teal-500">
     { isLogin ? (<Card className="w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg rounded-lg border border-white/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
           Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="p-0"
            >
              Sign Up
            </Button>
          </p>
        </CardContent>
      </Card>) :
    (  <Card className="w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg rounded-lg border border-white/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
           Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
           Sign Up
            </Button>
          </form>
          <p className="text-center mt-4">
            Already have an account? 
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="p-0"
            >
             Login
            </Button>
          </p>
        </CardContent>
      </Card>)}
    </div>
  );
}

export default AuthPage;

