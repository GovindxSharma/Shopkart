import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;

//   @media (max-width: 600px) {
//     input {
//       width: 150px;
//     }
//   }

//   input {
//     display: flex;
//     width: 450px;
//     height: 40px;
//     border-radius: 4px;
//     padding: 2px 13px;
//     align-items: center;
//     font-size: 12px;
//     font-weight: 600;
//     outline: none;
//     border: none;
//     padding: 5px;
//     cursor: pointer;
//     margin: 10px;

//     &:focus {
//       border: 2px solid grey;
//     }
//   }
// `;


const Search = () => {
    const navigate = useNavigate(); // Use useNavigate hook to access the navigate function
  const [keyword, setKeyword] = useState("");

//   const {isAuthenticated}=useSelector(state=>state.user)

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
         
       <form onSubmit={searchSubmitHandler}>
       <input type="search" placeholder='Search here...' onChange={(e)=>setKeyword(e.target.value)} />
       <input type="submit" value="Search" style={{visibility:'hidden'}} />
       </form>
        
    </>
  )
}

export default Search