'use client'
import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import Loading from "../Loading/Loading"
interface Name {
    id:number,
    name:string,
    brand:string,
    gender:string
}
export default function ListSearch({query} : {query : string}) {
    const router = useRouter()
    const [data, setData] = useState<Name[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        async function getData(query:string) {
           try {
            setLoading(true)
            const res  = await fetch(`http://localhost:3000/api/query?query=${query}`)
            const data = await res.json()
            setData(data.data)
           } catch(e) {
             console.error('Привет мир')
           } finally {
            setLoading(false)
           }
        }
        getData(query)
    }, [query])
   if(loading) {
    return(
        <div className=" bg-white/90 font-bold text-lg text-black backdrop-blur-sm  min-w-[80%] min-h-[100px] absolute top-10 right-4 p-2 rounded-md">
            <Loading size="50"/>
        </div>
    )
   }
  return (
    <div className=" bg-white/90 font-bold text-lg text-black backdrop-blur-sm  min-w-[80%] min-h-[100px] absolute top-10 right-4 p-2 rounded-md">
        <ul>
            {data?.length === 0 ? <p>Ничего не найдено</p> : data?.map((item) => {
                return <li>
                <p key={item.id} className="cursor-pointer hover:underline" onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/search/query?${item.name}`)
                }}>
                    {item.name} {item.brand}
                </p>
             </li>
            })}
        </ul>
    </div>
  )
}
