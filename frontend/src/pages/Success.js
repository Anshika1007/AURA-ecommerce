import React from 'react';
import SUCCESSIMAGE from '../assest/approved.gif';
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className="bg-slate-100 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3">
      <img src={SUCCESSIMAGE} alt="Success" className="w-80 h-80 mb-4 mix-blend-multiply" />
      <p className="text-xl font-bold text-green-600">Payment Successfull!</p>
      <Link to={"/order"} className='p-2 mt-5 border-2 border-green-600 px-3 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See My Orders</Link>
    </div>
  );
};

export default Success;
