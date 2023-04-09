import getWikIResults from '@/lib/getWikIResults'
import React from 'react'
import Item from './components/Item';

type Props = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikIResults(searchTerm);
    const data = await wikiData;
    const displayTerm = searchTerm.replaceAll('%20', ' '); //for metadata

    return {
        title: displayTerm,
        description: `Search result for ${displayTerm}`,
    }
}

export default async function SeachResults({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikIResults(searchTerm);
    const data = await wikiData;
    const results: Result[] | undefined = data?.query?.pages

    const content = (
        <main className='bg-slate-200 mx-auto max-w-lg py-1 min-h-screen'>
            {results ? Object.values(results).map(result => {
                return <Item key={result.pageid} result={result} />
            })
                : <h2 className='p-2 text-xl text-red-400 text-center font-bold'>{`${searchTerm} Not Found !`}</h2>}
        </main>
    )

    return content
}