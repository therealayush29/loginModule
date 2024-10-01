import React from 'react';
import LoginForm from '@/components/LoginForm';
import cookie from "cookie";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context: { req: any; }) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};


const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-right sm:bg-center h-screen" style={{ backgroundImage: 'url("/images/bglogin.jpg")' }}>
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl px-5 py-10 md:p-5 items-center">
        <LoginForm
        />
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Login Background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
