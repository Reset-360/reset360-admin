'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import api from '@/src/lib/axios';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Image from 'next/image';
import useAppStore from '@/src/store/AuthState';
import { loginUser } from '@/src/lib/auth';
import { Alert, AlertDescription } from '@/src/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setUser = useAppStore((state) => state.setUser);
  const setToken = useAppStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // login request
      const loginRes = await api.post('/auth/login', { email, password });
      const { accessToken } = loginRes.data;

      // save token
      loginUser(accessToken);
      setToken(accessToken);

      // fetch user info
      const meRes = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      setUser(meRes.data);
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ooops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="container relative grid flex-col items-center justify-center sm:max-w-none lg:grid-cols-2 lg:px-0 ">
        <div className="relative hidden h-full flex-col bg-mute p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center gap-1 text-lg font-medium text-purple-200">
            <Image
              src={'/logo/logo_32.png'}
              alt={'Reset360 Logo'}
              width={32}
              height={32}
            />
            Reset 360
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Welcome to Reset 360 Admin — where powerful tools meet
                rapid innovation. Our admin kit empowers you to build, adapt,
                and scale faster than ever, turning months of development into
                moments of progress.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center items-center">
              <Image
                src={'/logo/logo_250.png'}
                alt={'Reset360 Logo'}
                width={100}
                height={100}
              />
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-0 space-y-4"
            >
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error ? (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              ) : null}

              <Button
                type="submit"
                className="cursor-pointer w-full bg-violet-900 text-white"
                disabled={loading}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
