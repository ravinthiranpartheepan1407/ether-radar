import React from 'react';

function Header(){
    return(
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <h1 className="font-semibold text-xl tracking-tight"> ETHER RADAR </h1>
        </div>
        <div className="block">
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" href="#">Max request / Limit: 5</a>
            <p className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4"> Developed By Ravinthiran Partheepan </p>
          </div>
        </div>
      </nav>
    )
}

export default Header;
