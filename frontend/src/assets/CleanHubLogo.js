import { FiLeaf } from 'react-icons/fi';

const CleanHubLogo = ({ theme, text }) => {
  return (
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-green-900 text-green-400' : 
      'bg-green-100 text-green-600'}`}>
        <FiLeaf size={24} />
      </div>
      {text && (
        <span className={`ml-3 text-xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
          CleanHub Admin
        </span>
      )}
    </div>
  );
};

export default CleanHubLogo;