import React from 'react'
import Header from '../../Header/Header'
import Sidebar from './Sidebar'

const Update = ({ children, activeTab }) => {
    return (
        <>
            <Header />
            <div className="my-24 xl:w-2/3 mx-auto sm:pr-14 sm:pl-8">
                <div className="flex border text-sm rounded w-full bg-white">
                    <Sidebar activeTab={activeTab} />
                    {children}
                </div>
            </div>
        </>
    )
}

export default Update