import React, { useEffect, useState } from 'react'
import { fetchLedgerData, generateDescription, formatDate, formatCurrency } from '../utils/helperFunctions'

function Ledger() {
  const [ledgerData, setLedgerData] = useState([])
  const [selectedTab, setSelectedTab] = useState('simple');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const data = fetchLedgerData(selectedTab)
    setLedgerData(data)
    setIsLoading(false)
  }, [selectedTab])

  return (
    <>
      {
        isLoading && (
        <div className="container mx-auto flex justify-center mt-4">
          <div className="border-t-4 border-b-4 border-gray-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>
       )
      }
    {
      !isLoading && (
        <>
          <h1 className="text-2xl font-light text-center mb-4">
              Your investing account (<span className="text-red-500">{ledgerData.length > 0 ? formatCurrency(ledgerData[0].balance) : 0}</span> available)
              <div className="text-xs text-gray-500">08/19/2014 - 10/15/2014</div>
          </h1>

          <div className="container mx-auto my-4">
            <ul className="flex border-b">
              <li className="-mb-px mr-1">
                <button
                  className={`bg-white inline-block border border-gray-300 rounded-t py-2 px-4 font-semibold ${selectedTab === 'simple' ? 'text-green-700' : 'text-blue-700'}`}
                  onClick={() => setSelectedTab('simple')}
                >
                  Simple
                </button>
              </li>
              <li className="-mb-px mr-1">
                <button
                  className={`bg-white inline-block border border-gray-300 rounded-t py-2 px-4 font-semibold  ${selectedTab === 'duplicate' ? 'text-green-700' : 'text-blue-700'}`}
                  onClick={() => setSelectedTab('duplicate')}
                >
                  Duplicate
                </button>
              </li>
              <li className="-mb-px mr-1">
                <button
                  className={`bg-white inline-block border border-gray-300 rounded-t py-2 px-4 font-semibold  ${selectedTab === 'complicated' ? 'text-green-700' : 'text-blue-700'}`}
                  onClick={() => setSelectedTab('complicated')}
                >
                  Complicated
                </button>
              </li>
            </ul>
          </div>


          <div className="container mx-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Balance</th>
                </tr>
              </thead>

              <tbody>
                {ledgerData?.map((transaction) => (
                  <tr key={transaction.activity_id}>
                    <td className="p-3">{formatDate(transaction.date)}</td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3">{generateDescription(transaction)}</td>
                    <td className="p-3">{formatCurrency(transaction.amount)}</td>
                    <td className="p-3">{formatCurrency(transaction.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    }
    </>
  )

}

export default Ledger