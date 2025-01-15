import React from 'react';
import CANCELIMAGE from '../assest/credit-card.gif';
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className="bg-slate-100 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3">
      <img src={CANCELIMAGE} alt="Success" className="w-80 h-80 mb-4 mix-blend-multiply" />
      <p className="text-xl font-bold text-red-600">Payment UnSuccessfull!</p>
      <Link to={"/cart"} className='p-2 mt-5 border-2 border-red-600 px-3 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go Back To Cart</Link>
    </div>
  );
};

export default Success;
