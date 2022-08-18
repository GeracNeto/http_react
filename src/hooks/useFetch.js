import { useEffect, useState } from "react"

// 4 - Custom hook

export const useFecth = (url) => {

    const [data, setData] = useState(null)

    // 5 Refatorando POST

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(null)

    // 6 - Loading
    const [loading, setLoading] = useState(false)

    const httpConfig = (data, method) => {

        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setMethod(method)
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            // 6 Loading
            setLoading(true)

            const res = await fetch(url)
            const json = await res.json()

            setData(json)

            // 6 Loading
            setLoading(false)
        }

        fetchData()

    }, [url, callFetch])

    // 5 Refatorando POST
    useEffect(() => {

        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                console.log(fetchOptions)

                const json = await res.json()

                setCallFetch(json)
            }
        }

        httpRequest()

    }, [config, method, url])

    return { data, httpConfig, loading }
}