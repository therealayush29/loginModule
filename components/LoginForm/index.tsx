import { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/button';
import SocialLoginButton from '@/components/socialLoginBtn';
import TokenDisplay from '@/components/TokenDisplay';
import { useRouter, NextRouter  } from 'next/router';
import IconEye from '@/public/Icons/icoEye';
import IconEyeClose from '@/public/Icons/icoEyeClose';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router:NextRouter  = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      router.push('/');
    } else {
      alert("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="md:w-1/2 px-8">
      <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
      <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <div className="relative">
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <i
            className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer`}
            onClick={togglePasswordVisibility}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IconEyeClose /> : <IconEye />}
          </i>
        </div>
        <Button className='bg-[#002D74] text-white hover:border-[#002D74] cstAyu' type="submit">Log In</Button>
      </form>
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>
      <SocialLoginButton />
      {token && <TokenDisplay token={token} />}
      <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="#">Forgot your password?</a>
      </div>

      <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Don't have an account?</p>
        <Button type='button' className="py-2 px-5 bg-white border rounded-xl hover:scale-105">Register</Button>
      </div>
    </div>
  );
};

export default LoginForm;
