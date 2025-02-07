const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-lg rounded-2xl p-4 h-[300px] flex flex-col flex-wrap items-center justify-center ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;
  