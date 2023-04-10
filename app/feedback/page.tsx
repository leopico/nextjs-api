'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

interface UserInputType {
    name: string
    email: string
    message: string
}

const initState = {
    name: '',
    email: '',
    message: '',
}


const Feedback = () => {
    const [data, setData] = useState<UserInputType>(initState);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, message } = data;

        //send data to api route
        const res = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, message
            })
        })
        const result = await res.json();
        router.push('/thankyou');
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-50 max-w-lg flex flex-col items-center space-y-12">
            <input type="text" onChange={e => setData({ ...data, name: e.target.value })} className=" border border-1" />
            <input type="text" onChange={e => setData({ ...data, email: e.target.value })} className=" border border-1" />
            <textarea className="border border-1" onChange={e => setData({ ...data, message: e.target.value })} ></textarea>
            <button type="submit" className=" bg-slate-600 rounded-lg p-3">Submit</button>
        </form>
    )
}

export default Feedback
