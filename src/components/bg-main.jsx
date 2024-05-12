import React, { useState } from 'react';
// import mainImg from './assets/main-img.jpg';
import '../styles/bg-main.css';


export default function BgMain() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formMode, setFormMode] = useState('signup'); // Initial form mode

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formMode === 'signup' && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // console.log('Form data submitted:', formData);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const handleFormModeChange = () => {
        setFormMode(formMode === 'signup' ? 'signin' : 'signup');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className='main-body'>
            <div>
                <img src="images/main-img.png" className="main-img" alt="Main Background" />
            </div>
            <div className="SignUpForm">
                <h2>{formMode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-el'>
                        <label htmlFor="name">Enter your name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-el'>
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-el'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {formMode === 'signup' && (
                        <div className='form-el'>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}
                    <div className="btn-container">
                        <div className='btn'>
                            <button type="submit">{formMode === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                        </div>
                        <button onClick={handleFormModeChange}>
                            {formMode === 'signup' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}




// import { useState } from 'react'
// import mainImg from './assets/main-img.jpg'
// import './bg-main.css'

// export default function BgMain() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const [formMode, setFormMode] = useState('signup');

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: value,
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (formData.password !== formData.confirmPassword) {
//           alert("Passwords do not match. Please try again.");
//           return;
//         }

//         // console.log('Form data submitted:', formData);
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         });
//       };



//     return(
//         <div className="main-body">
//             <div className="img-holder">
//                 <img src={mainImg} className="main-img" />
//             </div>
//             <div className="SignUpForm">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//             <div className='form-el'>
//                 <label htmlFor="name">Enter your name:</label>
//                 <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 />
//             </div>
//             <div className='form-el'>
//                 <label htmlFor="email">Email Address:</label>
//                 <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 />
//             </div>
//             <div className='form-el'>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//                 />
//             </div>
//             <div className='form-el'>
//                 <label htmlFor="confirmPassword">Confirm Password:</label>
//                 <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 required
//                 />
//             </div>
//             <div className="btn-container">
//                 <div className='btn'>
//                 <button type="submit">Sign Up</button>
//                 </div>
//                 <button>Sign In</button>
//             </div>
//             </form>
//             </div>
//         </div>
//     )
// }

{/* <form onSubmit={handleSubmit}>
                <div className='form-el'>
                    <label htmlFor="name">Enter your name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className='form-el'>
                    <label htmlFor="email">Email Address:</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className='form-el'>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className="btn-container">
                    <div className='btn'>
                        <button type="submit">Sign Up</button>
                    </div>
                    <button>Sign In</button>
                </div>
                </form> */}

// const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform form submission logic here, e.g., send data to a server
//     // console.log('Form data submitted:', formData);
//     // Reset the form after submission
//     setFormData({
//       name: '',
//       email: '',
//       password: '',
//     });
// };