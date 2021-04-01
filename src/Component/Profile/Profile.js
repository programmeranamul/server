import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { userContext } from '../../App';
import LogInUserDetails from '../LogInUserDetails/LogInUserDetails';
import './Profile.css'

const Profile = () => {
    const[logedInUser, setLogedInUser] = useContext(userContext)
 
const handelLogOut = () => {
    
}

    return (
        <section className="container profile-section">
            <div>
                <LogInUserDetails />
                <Button className="d-block mx-auto mt-4" variant="success" onClick={handelLogOut}>Log Out</Button>
            </div>
        </section>
    );
};

export default Profile;