import {
    useState,
    useEffect
} from 'react'

export const useDeviceScreen = () => {
    const match = window.matchMedia("(max-width: 768px)").matches
    const [isMobile, setIsMobile] = useState<boolean>(match)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { isMobile }
}