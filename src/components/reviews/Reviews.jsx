import React, { useState } from 'react';
import "./Reviews.scss";
import Review from '../review/Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { serverUrl } from '../../utils/serverUrl';
import Loader from '../loader/Loader';


const Reviews = ({gigId}) => {
  const queryClient = useQueryClient();
  const [review, setReview] = useState({
    desc:"",
    star:1,
    gigId:gigId
  });


  const { data, isLoading, error } = useQuery({
    queryKey:[`gigReview${gigId}`],
    queryFn: ()=>
    axios.get(`${serverUrl}/api/reviews/${gigId}`).then((res)=>{
      return res.data;
    })
  });

  const handleChange = (e) =>{
       const{ name , value} = e.target;
       setReview((prev)=>{
        return {
          ...prev,
          [name]:value
        }
       })
  }
  const token = localStorage.getItem("token");
  
  const mutation = useMutation({
    mutationFn:async(review)=>{
      return await axios.post(`${serverUrl}/api/reviews`,review,{
        headers:{
         ' Authorization':token 
        }
      });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`gigReview${gigId}`])
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message)
    }
  })
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    mutation.mutate(review)
    if(mutation.error){
      toast.error(mutation.error?.response?.data?.message);
    }
    setReview({
      desc:"",
      star:1,
      gigId
    })

  }


  return (
    <div className="reviews">
            <h2>Reviews</h2>
            { isLoading? <Loader/> :error?"something went wrong..." : (data==="empty")?"no review here" : data.map((item)=>{
              return <Review key={item._id} item={item} />
            }) }

            <div className="addReview">
            <h3>Add a Review</h3>
              <form action="" className='reviewForm' onSubmit={handleSubmit}>
                <input type="text" value={review.desc} name='desc' placeholder='Enter Your Review here' onChange={handleChange}/>
                <select name="star" value={review.star} id="" onChange={handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  </select>
                  <button>Add Review</button>
              </form>
            </div>
          
          </div>
  )
}

export default Reviews