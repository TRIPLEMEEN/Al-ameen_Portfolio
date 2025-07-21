const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin [animation-direction:reverse]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
