interface TokenDisplayProps {
  token: string;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ token }) => {
  return (
    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
      <h3 className="font-semibold">Generated Token:</h3>
      <p className="text-xs break-words">{token}</p>
    </div>
  );
};

export default TokenDisplay;
