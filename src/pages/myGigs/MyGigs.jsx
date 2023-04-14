import React from 'react';
import "./MyGigs.scss";

import deletee from "../../img/delete.png";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import { serverUrl } from '../../utils/serverUrl';

const MyGigs = () => {
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["allusergigs"],
    queryFn:() =>
     axios.get(`${serverUrl}/api/gigs/myGigs`, {
        headers: {
          'Authorization': token
        }
      }).then((res) => {
        return res.data;
      })
    }
  )
  return (
    <>
      <div className="mygigs">
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to='/add'><button>Add NeW Gig</button></Link>
          </div>
          {isLoading ? <Loader/>: error ? error.response?.data?.message :
          data.map((gig)=>{
            return <table key={gig._id}>
              <tr>
                <th>image</th>
                <th>title</th>
                <th>price</th>
                <th>Orders</th>
                <th>Action</th>
              </tr><tr>
                <td>
                  <img
                    className="image"
                    src={gig?.cover}
                    alt=""
                  />
                </td>
                <td>{gig?.title}</td>
                <td>{gig?.price}</td>
                <td>13</td>
                <td>
                  <img className="delete" src={deletee} alt="" />
                </td>
              </tr>

            </table>
        })
          }
          
        
        </div>
      </div>
    </>
  )
};

export default MyGigs