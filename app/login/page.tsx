"use client";
import useLogin from '@/hooks/useLogin'
import Link from 'next/link'
import React from 'react'

function page() {
  const { handlerSubmit, form, handlerChangeValue } = useLogin();

  return (
    <section className='flex flex-col justify-center h-screen'>
      <h1 className='text-2xl text-center mb-10'>Login</h1>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handlerChangeValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password"
            id="password" name="password"
            placeholder="Email"
            value={form.password}
            onChange={handlerChangeValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" onClick={handlerSubmit} className="mr-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <Link className='hover:underline' href="/">Back Home</Link>
      </form>
    </section>
  )
}

export default page