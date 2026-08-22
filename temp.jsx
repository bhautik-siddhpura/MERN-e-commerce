import React , {useState , useEffect , useContext} from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

        const {user} = useContext(AuthContext)
        const navigate = useNavigate()
        const [state , setState] = useState(null)

        useEffect( () => {
            if( !user || user.role !== 'admin' ) {
                navigate('/')
                return
            }   
        })
        
        const fetchState = async() => {
            try {
                const res = await fetch ( './api/analytics' , {
                    headers: {Authorization : `Bearer ${user.token}` }
                })

                const data = await res.json()
                if(res.ok) {
                    setState(data)
                }
                else {
                    if(res.status === 401){
                        navigate('/login')
                    }
                    setState( {
                        totalUsers: 0,
                        totalProducts: 0,
                        totalOrders: 0,
                        totalRevenue: 0,
                    })

                }
            } catch (error) {
                console.error(error);
            }
            
        }



    return(

    )
}