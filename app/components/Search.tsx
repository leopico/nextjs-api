'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormEvent } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch('');
        router.push(`/${search}/`);

    }
    return (
        <form onSubmit={handleSubmit} className='w-50 flex justify-center md:justify-between'>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className='bg-white p-2 w-80 text-xl rounded-xl' placeholder='search'
            />
            <button type='submit' className='p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold'>
                🌍
            </button>
        </form>
    );
}

export default Search;