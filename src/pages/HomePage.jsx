import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./MyStyles.css";


function HomePage() {

    const [fetching, setFetching] = useState(true)
    const [countries, setCountries] = useState([])
    const{countryId} = useParams()

    useEffect(()=>{
        axios.get('https://ih-countries-api.herokuapp.com/countries').then((response) => {
            setCountries(response.data);
            setFetching(false)
            console.log(response.data)
        })
    }, [])

    return(
        <div className="row" style={{paddingLeft:'7.5%', paddingRight: '7.5%'}}>
            <h2 className="mb-4 mt-4">WikiCountries: Your Guide to the World</h2>
            {countries.map((country) => (
                <div key={country._id} className="col-md-2 mb-4">
                    <Link to={`/${country.alpha3Code}`} className="text-dark text-decoration-none">
                        <div className="country-card">
                            <img
                                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                                alt="flag"
                                className="img-fluid"
                            />
                            <h5 className="mt-2">{country.name.common}</h5>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default HomePage;
